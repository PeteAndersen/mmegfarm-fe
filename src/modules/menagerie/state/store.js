import { normalize, denormalize } from "normalizr";
import Vue from "vue";

import api from "../api";
import schema from "./schema";

// Mutation Types
const SET_PAGE = "menagerie/SET_PAGE";
const SET_PAGE_SIZE = "menagerie/SET_PAGE_SIZE";
const LOADING = "menagerie/LOADING";
const ERROR = "menagerie/ERROR";
const UPDATE_ENTITIES = "menagerie/UPDATE_ENTITIES";
const SET_CREATURE = "menagerie/SET_CREATURE";
const SET_CREATURE_FAMILY = "menagerie/SET_CREATURE_FAMILY";

const state = {
  entities: {
    creatures: {},
    spells: {}
  },
  page: 1,
  page_size: 48,
  num_pages: 0,
  filters: {
    name: "",
    element: [],
    nat_stars: [1, 4],
    type: [],
    evolved: null,
    target: [],
    scalesWith: [],
    buffs: [],
    debuffs: [],
    skill_filter_logic: "all"
  },
  filterDrawer: true,
  sortKey: "name",
  sortDirection: "",
  loading: false,
  error: false,
  creature: null,
  creatureFamily: [],
  creatures: []
};

const mutations = {
  [LOADING](state, { value }) {
    state.loading = value;
  },
  [ERROR](state, { value }) {
    state.error = value;
  },
  [SET_PAGE](state, { page }) {
    state.page = page;
  },
  [SET_PAGE_SIZE](state, { size }) {
    state.page_size = size;
  },
  [SET_CREATURE](state, { id }) {
    state.creature = id;
  },
  [SET_CREATURE_FAMILY](state, { family }) {
    Vue.set(state, "family", family);
  },
  [UPDATE_ENTITIES](state, { entities }) {
    // Loop over all kinds of entities we received
    for (let type in entities) {
      for (let entity in entities[type]) {
        Vue.set(state.entities[type], entity, entities[type][entity]);
      }
    }
  }
};

const actions = {
  async getCreature({ commit }, id) {
    commit(LOADING, { value: true });
    commit(SET_CREATURE, { id }); // Immediately update if available in store

    try {
      const { data } = await api.fetchCreature(id);
      const normalized = normalize(data, schema.creature);
      commit(UPDATE_ENTITIES, { entities: normalized.entities });
    } catch (e) {
      console.log(e);
      commit(ERROR, { value: true });
    }
    commit(LOADING, { value: false });
  },
  async getCreatureList({ state, commit }) {
    commit(LOADING, { value: true });

    try {
      const creatures = await api.fetchCreatures({
        ...api.filters_to_query(state.filters),
        ordering: `${state.sortDirection}${state.sortKey}`,
        page_size: state.page_size,
        page: state.page
      });
      const normalized = normalize(creatures, schema.creatureList);
      commit(UPDATE_ENTITIES, { entities: normalized.entities });
    } catch (e) {
      commit(ERROR, { value: true });
    }
    commit(LOADING, { value: false });
  },
  async getEvolvesTo({ state, dispatch }, id) {
    const creature = state.entities.creatures[id];
    creature.evolvesTo.forEach(toId => dispatch("getCreature", toId));
  },
  async getEvolvesFrom({ state, dispatch }, id) {
    const creature = state.entities.creatures[id];
    debugger;
    dispatch("getCreature", creature.evolvesFrom);
  },
  async getFamily({ commit }, familyId) {
    const {
      data: { results }
    } = await api.fetchCreatures({
      creatureType: familyId,
      ordering: "element"
    });
    const normalized = normalize(results, schema.creatureList);
    commit(UPDATE_ENTITIES, { entities: normalized.entities });
    commit(SET_CREATURE_FAMILY, { family: normalized.result });
  }
};

const getters = {
  loading: state => state.loading,
  creature: state =>
    denormalize(state.creature, schema.creature, state.entities),
  family: state =>
    denormalize(state.family, schema.creatureList, state.entities)
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
