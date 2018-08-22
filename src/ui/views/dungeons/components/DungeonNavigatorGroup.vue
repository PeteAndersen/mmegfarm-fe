<template>
  <v-list-group v-if="dungeons.length">
    <v-list-tile slot="activator">
      <v-list-tile-title>{{ name }}</v-list-tile-title>
    </v-list-tile>
    <DungeonNavigatorLink v-for="d in dungeons" :key="d.id" :dungeon="d" />
  </v-list-group>
</template>

<script>
import DungeonNavigatorLink from "./DungeonNavigatorLink";

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    dungeons: {
      type: Array,
      required: true
    }
  },
  components: {
    DungeonNavigatorLink
  }
};
</script>

<style scoped>
</style>
