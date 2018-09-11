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
  navDrawer: true
};

// Mutation Types
export const types = {
  UPDATE_ENTITIES: "UPDATE_ENTITIES",
  DUNGEON_LIST: "DUNGEON_LIST"
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
    } catch (e) {
      console.log(e);
      commit("ERROR", { value: true }, { root: true });
    }

    commit("LOADING", { value: false }, { root: true });
  },
  async getDungeonDetail({ commit, dispatch }, id) {
    commit("LOADING", { value: true }, { root: true });
    commit("ERROR", { value: false }, { root: true });

    try {
      dispatch("getDungeon", id);
    } catch (e) {
      console.log(e);
      commit("ERROR", { value: true }, { root: true });
    }

    commit("LOADING", { value: false }, { root: true });
  },
  async getLevelDetail({ commit, dispatch }, { dungeonId, levelIdx }) {
    commit("LOADING", { value: true }, { root: true });
    commit("ERROR", { value: false }, { root: true });

    // Get the level ID from dungeon data
    if (!Object.keys(state.entities.dungeons).includes(dungeonId)) {
      await dispatch("getDungeon", dungeonId);
    }

    const dungeon = state.entities.dungeons[dungeonId];
    const id = dungeon.levels[levelIdx];
    const level = await dispatch("getLevel", id);

    // Waves
    const wavePromises = level.waves.map(waveId => dispatch("getWave", waveId));
    await Promise.all(wavePromises);

    commit("LOADING", { value: false }, { root: true });
  },
  // Basic fetch and put in store actions
  async getDungeon({ commit }, id) {
    // Retrieves a single dungeon and puts it in the store
    try {
      const { data } = await api.fetchDungeon(id);
      const normalized = normalize(data, schema.dungeon);
      commit(types.UPDATE_ENTITIES, { entities: normalized.entities });
      return normalized.entities.dungeons[normalized.result];
    } catch (e) {
      console.log(e);
      commit("ERROR", { value: true }, { root: true });
    }
  },
  async getLevel({ commit }, id) {
    // Retrieves a single level and puts it in the store
    try {
      const { data } = await api.fetchLevel(id);
      const normalized = normalize(data, schema.level);
      commit(types.UPDATE_ENTITIES, { entities: normalized.entities });
      return normalized.entities.levels[normalized.result];
    } catch (e) {
      console.log(e);
      commit("ERROR", { value: true }, { root: true });
    }
  },
  async getWave({ commit }, id) {
    // Retrieves a single level and puts it in the store
    try {
      const { data } = await api.fetchWave(id);
      const normalized = normalize(data, schema.wave);
      commit(types.UPDATE_ENTITIES, { entities: normalized.entities });
      return normalized.entities.waves[normalized.result];
    } catch (e) {
      console.log(e);
      commit("ERROR", { value: true }, { root: true });
    }
  }
};

const getters = {
  dungeons: state => {
    const dungeonIds = Object.keys(state.entities.dungeons);
    return denormalize(dungeonIds, [schema.dungeon], state.entities);
  },
  dungeon: state => id => denormalize(id, schema.dungeon, state.entities),
  level: state => (dungeonId, levelIdx) => {
    const dungeon = denormalize(dungeonId, schema.dungeon, state.entities);
    return dungeon.levels[levelIdx];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
