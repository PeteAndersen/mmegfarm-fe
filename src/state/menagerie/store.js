import { normalize, denormalize } from "normalizr";
import Vue from "vue";

import api from "./api";
import schema from "./schema";

const state = {
  entities: {
    creatures: {},
    spells: {}
  },
  loading: false,
  error: false,

  // Menagerie view
  creatures: [],
  creaturesCount: 0,
  totalCreatures: 0,
  page: 1,
  pageSize: 48,
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

  // Detailed creature view
  creatureDetail: null,
  creatureDetailFamily: []
};

// Mutation Types
export const types = {
  UPDATE_ENTITIES: "UPDATE_ENTITIES",
  LOADING: "LOADING",
  ERROR: "ERROR",
  SET_PAGE: "SET_PAGE",
  SET_PAGE_SIZE: "SET_PAGE_SIZE",
  SET_ORDERING_DIR: "SET_ORDERING_DIR",
  SET_ORDERING_KEY: "SET_ORDERING_KEY",
  SET_CREATURE_LIST: "SET_CREATURE_LIST",
  SET_CREATURE_COUNT: "SET_CREATURE_COUNT",
  SET_TOTAL_CREATURES: "SET_TOTAL_CREATURES",
  SET_CREATURE: "SET_CREATURE",
  SET_CREATURE_FAMILY: "SET_CREATURE_FAMILY"
};

const mutations = {
  [types.LOADING](state, { value }) {
    state.loading = value;
  },
  [types.ERROR](state, { value }) {
    state.error = value;
  },
  [types.SET_PAGE](state, { page }) {
    state.page = page;
  },
  [types.SET_ORDERING_DIR](state, { dir }) {
    state.sortDirection = dir;
  },
  [types.SET_ORDERING_KEY](state, { key }) {
    state.sortKey = key;
  },
  [types.SET_PAGE_SIZE](state, { size }) {
    state.pageSize = size;
  },
  [types.SET_CREATURE_LIST](state, { ids }) {
    Vue.set(state, "creatures", ids);
  },
  [types.SET_CREATURE_COUNT](state, { count }) {
    state.creaturesCount = count;
  },
  [types.SET_TOTAL_CREATURES](state, { count }) {
    state.totalCreatures = count;
  },
  [types.SET_CREATURE](state, { id }) {
    state.creatureDetail = id;
  },
  [types.SET_CREATURE_FAMILY](state, { family }) {
    Vue.set(state, "creatureDetailFamily", family);
  },
  [types.UPDATE_ENTITIES](state, { entities }) {
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
    // Retrieves all details of a creature including related creatures and sets as active

    commit(types.LOADING, { value: true });
    commit(types.SET_CREATURE, { id }); // Immediately set id to display if previously loaded

    try {
      // Creature
      const creatureData = await dispatch("getCreature", id);
      const creature = creatureData.entities.creatures[creatureData.result];

      // Evolves to/from
      creature.evolvesTo.forEach(toId => dispatch("getCreature", toId));
      if (creature.evolvesFrom) {
        dispatch("getCreature", creature.evolvesFrom);
      }

      // Family
      const familyData = await dispatch("getFamily", creature.creatureType);
      commit(types.SET_CREATURE_FAMILY, { family: familyData.result });
    } catch (e) {
      console.log(e);
      commit(types.ERROR, { value: true });
    }

    commit(types.LOADING, { value: false });
  },
  async getFamily({ commit }, familyId) {
    // Retrieve a list of related creatures based on creatureType field
    const {
      data: { results }
    } = await api.fetchCreatures({
      creatureType: familyId,
      ordering: "element"
    });
    const normalizedFamily = normalize(results, schema.creatureList);
    commit(types.UPDATE_ENTITIES, { entities: normalizedFamily.entities });
    return normalizedFamily;
  },
  async getCreature({ commit }, id) {
    // Retrieves a single creature and puts it in the store
    commit(types.LOADING, { value: true });

    try {
      const { data } = await api.fetchCreature(id);
      const normalized = normalize(data, schema.creature);
      commit(types.UPDATE_ENTITIES, { entities: normalized.entities });
      return normalized;
    } catch (e) {
      console.log(e);
      commit(types.ERROR, { value: true });
    }
    commit(types.LOADING, { value: false });
  },
  async getCreatureList({ state, commit, dispatch }) {
    // Retrieves list of creatures from the current page, filtered and sorted
    commit(types.LOADING, { value: true });

    try {
      const {
        data: { count, results }
      } = await api.fetchCreatures({
        ...api.filters_to_query(state.filters),
        ordering: `${state.sortDirection}${state.sortKey}`,
        page_size: state.pageSize,
        page: state.page
      });
      const normalized = normalize(results, schema.creatureList);
      commit(types.SET_CREATURE_LIST, { ids: normalized.result });
      commit(types.SET_CREATURE_COUNT, { count: count });
      commit(types.UPDATE_ENTITIES, { entities: normalized.entities });

      if (state.totalCreatures === 0) {
        dispatch("getTotalCreatures");
      }
    } catch (e) {
      commit(types.ERROR, { value: true });
    }

    commit(types.LOADING, { value: false });
  },
  async getTotalCreatures({ commit }) {
    try {
      const {
        data: { count }
      } = await api.fetchCreatures();
      commit(types.SET_TOTAL_CREATURES, { count });
    } catch (e) {
      console.log(e);
    }
  },
  changeCreatureListOrderKey({ commit, dispatch }, key) {
    commit(types.SET_ORDERING_KEY, { key });
    dispatch("getCreatureList");
  },
  changeCreatureListOrderDir({ commit, dispatch }, dir) {
    commit(types.SET_ORDERING_DIR, { dir });
    dispatch("getCreatureList");
  },
  changeCreatureListPage({ commit, dispatch }, page) {
    commit(types.SET_PAGE, { page });
    dispatch("getCreatureList");
  }
};

const getters = {
  loading: state => state.loading,
  creatureList: state =>
    denormalize(state.creatures, schema.creatureList, state.entities),
  creature: state =>
    denormalize(state.creatureDetail, schema.creature, state.entities),
  family: state =>
    denormalize(state.creatureDetailFamily, schema.creatureList, state.entities)
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
