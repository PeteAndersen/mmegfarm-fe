import Vue from "vue";
import Router from "vue-router";
import Creatures from "@/ui/views/menagerie/Creatures.vue";
import CreatureDetail from "@/ui/views/menagerie/CreatureDetail.vue";
import Changelist from "@/ui/views/Changelist.vue";

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
      path: "/creature/:id-:slug/",
      name: "creatureDetail",
      component: CreatureDetail,
      props: true
    },
    {
      path: "/changelist/",
      name: "changelist",
      component: Changelist
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
