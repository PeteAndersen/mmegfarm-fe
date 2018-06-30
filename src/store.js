import Vue from "vue";
import Vuex from "vuex";
import { api_root } from "@/api.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    creatures: {}
  },
  mutations: {
    addCreature(state, { creature }) {
      state.creatures = {
        ...state.creatures,
        [creature.id]: creature
      };
    }
  },
  actions: {
    async populateCreatures({ commit }) {
      let next = `${api_root}/creatures.json`;
      let results;

      while (next) {
        const res = await fetch(next);
        ({ results, next } = await res.json());

        results.forEach(creature => {
          commit("addCreature", { creature });
        });
      }
    }
  }
});
