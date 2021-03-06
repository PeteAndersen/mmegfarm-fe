import Vue from "vue";
import Router from "vue-router";

import Creatures from "@/ui/views/menagerie/Creatures";
import CreatureDetail from "@/ui/views/menagerie/CreatureDetail";

import Dungeons from "@/ui/views/dungeons/Dungeons";
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
      name: "dungeons",
      component: Dungeons
    },
    {
      // Scenarios
      path: "/dungeons/:id-:slug/:difficulty/:levelIdx/",
      name: "scenario-dungeon-detail",
      component: DungeonDetail,
      props: ({ params: { id, slug, difficulty, levelIdx } }) => ({
        id: Number(id),
        slug,
        levelIdx: Number(levelIdx),
        difficulty,
        scenario: true
      })
    },
    {
      path: "/dungeons/:id-:slug/:levelIdx/",
      name: "dungeon-detail",
      component: DungeonDetail,
      props: ({ params: { id, slug, levelIdx } }) => ({
        id: Number(id),
        slug,
        levelIdx: Number(levelIdx)
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
