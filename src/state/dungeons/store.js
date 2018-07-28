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
  navDrawer: true,
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
    commit(types.SET_DUNGEON, { id });

    try {
      dispatch("getDungeon", id);
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
  async getLevelDetail({ commit, dispatch }, { dungeonId, level }) {
    commit("LOADING", { value: true }, { root: true });
    commit("ERROR", { value: false }, { root: true });
    console.log("getting levels");
    console.log(dungeonId, level);

    // Get the level ID from dungeon data
    const dungeon = await dispatch("getDungeon", dungeonId);
    const id = dungeon.entities.dungeons[dungeon.result].levels[level - 1];
    commit(types.SET_LEVEL, { id });

    // Finish with the detailed level data
    try {
      const { data } = await api.fetchLevel(id);
      const normalized = normalize(data, schema.level);
      commit(types.UPDATE_ENTITIES, { entities: normalized.entities });
      return normalized;
    } catch (e) {
      console.log(e);
      commit("ERROR", { value: true }, { root: true });
    }

    commit("LOADING", { value: false }, { root: true });
  }
};

const getters = {
  dungeons: state =>
    Object.values(state.entities.dungeons).reduce(
      (accum, d) => {
        switch (d.group) {
          case "ScenarioDungeon":
            accum.scenario.push(d);
            break;
          case "GroupGlyphs":
            accum.glyph.push(d);
            break;
          case "GroupElements":
            accum.elemental.push(d);
            break;
          case "GroupTwinTowers":
            accum.tower.push(d);
            break;
          default:
            accum.other.push(d);
            break;
        }
        return accum;
      },
      {
        scenario: [],
        glyph: [],
        elemental: [],
        tower: [],
        other: []
      }
    ),
  dungeon: state => id =>
    denormalize(id, schema.dungeonSummary, state.entities),
  dungeonDetail: state =>
    denormalize(state.dungeonDetail, schema.dungeon, state.entities),
  levelDetail: state =>
    denormalize(state.levelDetail, schema.level, state.entities)
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
