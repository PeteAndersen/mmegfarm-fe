<template>
  <v-navigation-drawer clipped fixed app v-model="$store.state.dungeons.navDrawer">
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Dungeons
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list>
      <DungeonListGroup name="Glyph Dungeons" :dungeons="dungeons.glyph"/>
      <DungeonListGroup name="Elemental Dungeons" :dungeons="dungeons.elemental"/>
      <DungeonListGroup name="Scenarios" :dungeons="dungeons.scenario"/>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import DungeonListGroup from "./DungeonNavigatorGroup";

export default {
  name: "dungeonNavigator",
  components: {
    DungeonListGroup
  },
  created() {
    this.getDungeons();
  },
  computed: {
    ...mapGetters("dungeons", ["dungeons"])
  },
  methods: {
    ...mapActions("dungeons", ["getDungeons", "getDungeonDetail"])
  }
};
</script>

<style scoped>
</style>
