import Vue from "vue";
import Router from "vue-router";

import Creatures from "@/ui/views/menagerie/Creatures";
import CreatureDetail from "@/ui/views/menagerie/CreatureDetail";

import Dungeons from "@/ui/views/dungeons/Dungeons";
import DungeonSummary from "@/ui/views/dungeons/DungeonSummary";
import DungeonFloorDetail from "@/ui/views/dungeons/DungeonFloorDetail";

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
      name: "dungeons",
      component: Dungeons,
      children: [
        {
          path: ":id-:slug/:level/",
          component: DungeonFloorDetail,
          props: ({ params: { id, slug, level } }) => ({
            id: Number(id),
            slug,
            level: Number(level)
          })
        },
        {
          path: ":id-:slug/",
          component: DungeonSummary,
          props: ({ params: { id, slug } }) => ({
            id: Number(id),
            slug
          })
        }
      ]
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
