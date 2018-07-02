import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import localForage from "localforage";

import api from "@/api.js";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: localForage
});

export default new Vuex.Store({
  state: {
    creatures: [],
    page: 1,
    page_size: 48,
    hasNext: false,
    hasPrev: false,
    filters: {},
    sortKey: "name",
    sortDirection: "", // '' or '-'
    loading: false,
    direction: null // 'next' or 'prev' to indicate what is loading
  },
  //plugins: [vuexLocal.plugin],
  mutations: {
    addCreature(state, { creature }) {
      state.creatures = {
        ...state.creatures,
        [creature.id]: creature
      };
    },
    addCreatures(state, { creatures }) {
      state.creatures = creatures;
    },
    setPage(state, { page }) {
      state.page = page;
    },
    setPageSize(state, { page_size }) {
      state.page_size = page_size;
    },
    hasNext(state, value) {
      state.hasNext = value;
    },
    hasPrev(state, value) {
      state.hasPrev = value;
    },
    loading(state, value) {
      state.loading = value;

      if (value === false) {
        state.direction = null;
      }
    },
    direction(state, value) {
      state.direction = value;
    }
  },
  actions: {
    async populateCreatures({ state, commit }) {
      commit("loading", true);

      try {
        const {
          data: { next, previous, results }
        } = await api.get("creatures/", {
          params: {
            ...state.filters,
            ordering: `${state.sortDirection}${state.sortKey}`,
            page_size: state.page_size,
            page: state.page
          }
        });

        commit("addCreatures", { creatures: results });
        commit("hasNext", next !== null);
        commit("hasPrev", previous !== null);
        commit("loading", false);
      } catch (e) {
        console.log(e);
        commit("loading", false);
      }
    },
    nextPage({ state, commit, dispatch }) {
      if (state.hasNext) {
        commit("setPage", { page: state.page + 1 });
        commit("direction", "next");
        dispatch("populateCreatures");
      }
    },
    prevPage({ state, commit, dispatch }) {
      if (state.hasPrev) {
        commit("setPage", { page: state.page - 1 });
        commit("direction", "prev");
        dispatch("populateCreatures");
      }
    }
  },
  getters: {
    creatureList: state => state.creatures,
    page: state => state.page,
    hasNext: state => state.hasNext,
    hasPrev: state => state.hasPrev,
    loading: state => state.loading,
    direction: state => state.direction
  }
});
