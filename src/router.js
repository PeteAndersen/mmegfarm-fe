import Vue from "vue";
import Router from "vue-router";
import Creatures from "./views/Creatures.vue";
import CreatureDetail from "./views/CreatureDetail.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "creatureList",
      component: Creatures
    },
    {
      path: "/creature/:slug/",
      name: "creatureDetail",
      component: CreatureDetail,
      props: true
    },
    {
      path: "/:page/",
      name: "creatureListPage",
      component: Creatures,
      props: route => ({
        page: Number(route.params.page)
      })
    }
  ]
});
