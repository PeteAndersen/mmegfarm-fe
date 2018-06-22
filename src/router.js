import Vue from "vue";
import Router from "vue-router";
import List from "./views/List.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "monsterList",
      component: List
    }
  ]
});
