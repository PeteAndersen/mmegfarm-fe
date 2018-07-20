import Vue from "vue";
import Router from "vue-router";

import Creatures from "@/ui/views/menagerie/Creatures";
import CreatureDetail from "@/ui/views/menagerie/CreatureDetail";

import DungeonList from "@/ui/views/dungeons/DungeonList";
import DungeonDetail from "@/ui/views/dungeons/DungeonDetail";

import Changelist from "@/ui/views/Changelist.vue";

import NotFound from "@/ui/components/404.vue";

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
      props: ({ params: { id, slug } }) => ({
        id: Number(id),
        slug
      })
    },
    {
      path: "/dungeons/",
      name: "dungeonList",
      component: DungeonList
    },
    {
      path: "/dungeons/:id-:slug/",
      name: "dungeonDetail",
      component: DungeonDetail,
      props: ({ params: { id, slug } }) => ({
        id: Number(id),
        slug
      })
    },
    {
      path: "/changelist/",
      name: "changelist",
      component: Changelist
    },
    {
      path: "*",
      name: "404",
      component: NotFound
    }
  ]
});
