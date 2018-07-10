import Vue from "vue";
import Vuex from "vuex";
/*import VuexPersistence from "vuex-persist";
import localForage from "localforage";*/

import api from "@/api.js";

Vue.use(Vuex);

/*const vuexLocal = new VuexPersistence({
  storage: localForage
});*/

export default new Vuex.Store({
  state: {
    creatures: [],
    total_creatures: 0,
    max_creature_count: 0,
    creature: null,
    family: [],
    page: 1,
    page_size: 48,
    num_pages: 1,
    filters: {},
    filterDrawer: true,
    sortKey: "name",
    sortDirection: "", // '' or '-'
    loading: false
  },
  //plugins: [vuexLocal.plugin],
  mutations: {
    addCreatures(state, { creatures }) {
      state.creatures = creatures;
    },
    setCreature(state, { creature }) {
      state.creature = creature;
    },
    setFamily(state, { family }) {
      state.family = family;
    },
    setPage(state, { page }) {
      state.page = page;
    },
    setPageSize(state, { page_size }) {
      state.page_size = page_size;
    },
    setTotalCreatures(state, value) {
      state.total_creatures = value;
    },
    setMaxCreatureCount(state, value) {
      state.max_creature_count = value;
    },
    setNumPages(state, value) {
      state.num_pages = value;
    },
    loading(state, value) {
      state.loading = value;

      if (value === false) {
        state.direction = null;
      }
    },
    filterDrawer(state, value) {
      state.filterDrawer = value;
    },
    setFilters(state, payload) {
      state.filters = payload;
    },
    setOrderingKey(state, value) {
      state.sortKey = value;
    },
    setOrderingDirection(state, value) {
      state.sortDirection = value;
    }
  },
  actions: {
    async populateCreatures({ state, dispatch, commit }) {
      commit("loading", true);

      try {
        const {
          data: { count, results }
        } = await api.get("creatures/", {
          params: {
            ...state.filters,
            ordering: `${state.sortDirection}${state.sortKey}`,
            page_size: state.page_size,
            page: state.page
          }
        });
        const num_pages = Math.ceil(count / state.page_size);
        commit("addCreatures", { creatures: results });
        commit("setNumPages", num_pages);
        commit("setTotalCreatures", count);
        dispatch("getMaxCreatureCount");
      } catch (e) {
        console.log(e);
      }

      commit("loading", false);
    },
    async getCreature({ dispatch, commit }, slug) {
      commit("loading", true);

      try {
        const {
          data: { results }
        } = await api.get("creatures/", {
          params: { slug }
        });
        const creature = results[0];
        commit("setCreature", { creature });
        dispatch("getFamily", creature.creatureType);
      } catch (e) {
        console.log(e);
      }

      commit("loading", false);
    },
    async getFamily({ commit }, family_id) {
      try {
        const {
          data: { results }
        } = await api.get("creatures/", {
          params: { creatureType: family_id }
        });
        const family = results.sort((a, b) => (a.element > b.element ? 1 : -1));
        commit("setFamily", { family });
      } catch (e) {
        console.log(e);
      }
    },
    async getMaxCreatureCount({ commit }) {
      try {
        const {
          data: { count }
        } = await api.get("creatures/");
        commit("setMaxCreatureCount", count);
      } catch (e) {
        console.log(e);
      }
    },
    setPage({ commit, dispatch }, value) {
      commit("setPage", { page: value });
      dispatch("populateCreatures");
    },
    applyFilters({ commit, dispatch }, payload) {
      commit("setFilters", payload);
      dispatch("populateCreatures");
    },
    orderBy({ commit, dispatch }, value) {
      commit("setOrderingKey", value);
      dispatch("populateCreatures");
    },
    orderDirection({ commit, dispatch }, value) {
      commit("setOrderingDirection", value);
      dispatch("populateCreatures");
    }
  },
  getters: {
    creatureList: state => state.creatures,
    creature: state => state.creature,
    family: state => state.family,
    totalCreatures: state => state.total_creatures,
    maxCreatureCount: state => state.max_creature_count,
    page: state => state.page,
    numPages: state => state.num_pages,
    hasNext: state => state.hasNext,
    hasPrev: state => state.hasPrev,
    loading: state => state.loading,
    sortKey: state => state.sortKey,
    sortDirection: state => state.sortDirection,
    filterDrawer: state => state.filterDrawer
  }
});
