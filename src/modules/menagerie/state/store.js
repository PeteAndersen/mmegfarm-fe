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
  async getCreatureDetail({ commit, dispatch }, id) {
    commit(LOADING, { value: true });
    commit(SET_CREATURE, { id });
    // Retrieves all details of a creature including related creatures and sets as active
    try {
      // Creature
      const { data } = await api.fetchCreature(id);
      const normalized = normalize(data, schema.creature);
      commit(UPDATE_ENTITIES, { entities: normalized.entities });

      // Evolves to/from
      data.evolvesTo.forEach(toId => dispatch("getCreature", toId));
      if (data.evolvesFrom) {
        dispatch("getCreature", data.evolvesFrom);
      }

      // Family
      const {
        data: { results }
      } = await api.fetchCreatures({
        creatureType: data.creatureType,
        ordering: "element"
      });
      const normalizedFamily = normalize(results, schema.creatureList);
      commit(UPDATE_ENTITIES, { entities: normalizedFamily.entities });
      commit(SET_CREATURE_FAMILY, { family: normalizedFamily.result });
    } catch (e) {
      console.log(e);
      commit(ERROR, { value: true });
    }

    commit(LOADING, { value: false });
  },
  async getCreature({ commit }, id) {
    // Retrieves a single creature and puts it in the store
    commit(LOADING, { value: true });

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
    // Retrieves many creatures and puts them in the store
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
