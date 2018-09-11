import Vue from "vue";
import Vuex from "vuex";

import menagerie from "./menagerie/store";
import dungeons from "./dungeons/store";

Vue.use(Vuex);

const state = {
  loading: false,
  error: false,
  drawer: true
};

const mutations = {
  LOADING(state, { value }) {
    state.loading = value;
  },
  ERROR(state, { value }) {
    state.error = value;
  },
  DRAWER(state, { value }) {
    state.drawer = value;
  },
  TOGGLE_DRAWER(state) {
    state.drawer = !state.drawer;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    menagerie,
    dungeons
  },
  strict: process.env.NODE_ENV !== "production"
});
