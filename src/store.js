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
    }
  },
  actions: {
    async populateCreatures({ state, commit }) {
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
        commit("loading", false);
      } catch (e) {
        console.log(e);
        commit("loading", false);
      }
    },
    setPage({ commit, dispatch }, value) {
      commit("setPage", { page: value });
      dispatch("populateCreatures");
    }
  },
  getters: {
    creatureList: state => state.creatures,
    page: state => state.page,
    numPages: state => state.num_pages,
    hasNext: state => state.hasNext,
    hasPrev: state => state.hasPrev,
    loading: state => state.loading,
    direction: state => state.direction,
    filterDrawer: state => state.filterDrawer
  }
});
