import Vue from "vue";
import Router from "vue-router";
import CreatureList from "./views/CreatureList.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "creatureList",
      component: CreatureList
    },
    {
      path: "/:page/",
      name: "creatureListPage",
      component: CreatureList,
      props: route => ({
        page: Number(route.params.page)
      })
    }
  ]
});
