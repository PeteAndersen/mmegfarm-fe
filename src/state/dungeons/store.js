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
  dungeons: []
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
  [types.DUNGEON_LIST](state, { ids }) {
    Vue.set(state, "dungeons", ids);
  }
};

const actions = {
  async getDungeons({ commit }) {
    try {
      const {
        data: { results }
      } = await api.fetchDungeons();
      const normalized = normalize(results, [schema.dungeon]);
      commit(types.UPDATE_ENTITIES, { entities: normalized.entities });
      commit(types.DUNGEON_LIST, { ids: normalized.result });
    } catch (e) {
      console.log(e);
    }
  }
};

const getters = {
  dungeons: state =>
    denormalize(state.dungeons, [schema.dungeon], state.entities)
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
