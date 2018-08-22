<template>
  <v-list-tile :to="dungeonUrl">
      <v-list-tile-title v-text="dungeon.name"></v-list-tile-title>
  </v-list-tile>
</template>

<script>
import urlSlug from "url-slug";
import { scenario_difficulties } from "@/services/dungeons.js";

export default {
  props: {
    dungeon: {
      type: Object,
      required: true
    }
  },
  computed: {
    dungeonUrl() {
      return this.dungeon.group === "ScenarioDungeon"
        ? `/dungeons/${this.dungeon.id}-${urlSlug(this.dungeon.name)}/${
            scenario_difficulties[scenario_difficulties.length - 1]
          }/1/`
        : `/dungeons/${this.dungeon.id}-${urlSlug(this.dungeon.name)}/${
            this.dungeon.levels.length
          }/`;
    }
  }
};
</script>

<style scoped>
</style>
