import Vue from "vue";
import Vuex from "vuex";

import menagerie from "./menagerie/store";
import dungeons from "./dungeons/store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    menagerie,
    dungeons
  }
});
