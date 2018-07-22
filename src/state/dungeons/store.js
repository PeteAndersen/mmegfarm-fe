import { normalize, denormalize } from "normalizr";
import Vue from "vue";

import api from "./api";
import schema from "./schema";

const state = {
  entities: {
    dungeons: {},
    levels: {},
    waves: {},
    enemies: {},
    spells: {}
  },
  dungeons: [],
  dungeonDetail: null,
  levelDetail: null
};

// Mutation Types
export const types = {
  UPDATE_ENTITIES: "UPDATE_ENTITIES",
  DUNGEON_LIST: "DUNGEON_LIST",
  SET_DUNGEON: "SET_DUNGEON",
  SET_LEVEL: "SET_LEVEL"
};

const mutations = {
  [types.UPDATE_ENTITIES](state, { entities }) {
    // Loop over all kinds of entities we received
    for (let type in entities) {
      for (let entity in entities[type]) {
        Vue.set(state.entities[type], entity, entities[type][entity]);
      }
    }
  },
  [types.DUNGEON_LIST](state, { ids }) {
    Vue.set(state, "dungeons", ids);
  },
  [types.SET_DUNGEON](state, { id }) {
    state.dungeonDetail = id;
  },
  [types.SET_LEVEL](state, { id }) {
    state.levelDetail = id;
  }
};

const actions = {
  async getDungeons({ commit }) {
    commit("LOADING", { value: true }, { root: true });
    commit("ERROR", { value: false }, { root: true });

    try {
      const {
        data: { results }
      } = await api.fetchDungeons();
      const normalized = normalize(results, [schema.dungeon]);
      commit(types.UPDATE_ENTITIES, { entities: normalized.entities });
      commit(types.DUNGEON_LIST, { ids: normalized.result });
    } catch (e) {
      console.log(e);
      commit("ERROR", { value: true }, { root: true });
    }

    commit("LOADING", { value: false }, { root: true });
  },
  async getDungeonDetail({ commit, dispatch }, id) {
    commit("LOADING", { value: true }, { root: true });
    commit("ERROR", { value: false }, { root: true });
    commit(types.SET_DUNGEON, { id });

    try {
      const dungeonData = await dispatch("getDungeon", id);
      const dungeon = dungeonData.entities.dungeons[dungeonData.result];

      // Default to the highest level
      const max_level = dungeon.levels.length - 1;
      dispatch("getLevel", dungeon.levels[max_level]);
    } catch (e) {
      console.log(e);
      commit("ERROR", { value: true }, { root: true });
    }
    commit("LOADING", { value: false }, { root: true });
  },
  async getDungeon({ commit }, id) {
    // Retrieves a single dungeon and puts it in the store
    try {
      const { data } = await api.fetchDungeon(id);
      const normalized = normalize(data, schema.dungeon);
      commit(types.UPDATE_ENTITIES, { entities: normalized.entities });
      return normalized;
    } catch (e) {
      console.log(e);
      commit("ERROR", { value: true }, { root: true });
    }
  },
  async getLevel({ commit }, id) {
    // Retrieves a single level and puts it in the store
    // console.log(id);
    try {
      const { data } = await api.fetchLevel(id);
      const normalized = normalize(data, schema.level);
      commit(types.UPDATE_ENTITIES, { entities: normalized.entities });
      return normalized;
    } catch (e) {
      console.log(e);
      commit("ERROR", { value: true }, { root: true });
    }
  }
};

const getters = {
  dungeons: state =>
    denormalize(state.dungeons, [schema.dungeon], state.entities),
  dungeon: state =>
    denormalize(state.dungeonDetail, schema.dungeon, state.entities),
  level: state => denormalize(state.levelDetail, schema.level, state.entities)
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
