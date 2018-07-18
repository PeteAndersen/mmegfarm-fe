import Vue from "vue";
import Vuex from "vuex";

import menagerie from "@/modules/menagerie/state/store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    menagerie
  }
});
