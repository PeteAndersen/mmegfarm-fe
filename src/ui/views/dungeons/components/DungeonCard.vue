<template>
  <v-flex xs12 lg4>
  <v-card :to="dungeonUrl(dungeon)">
    <v-card-title><h2>{{dungeon.name}}</h2></v-card-title>
  </v-card>
  </v-flex>
</template>

<script>
import { dungeonUrl } from "@/services/dungeons";
export default {
  props: {
    dungeon: {
      type: Object,
      required: true
    }
  },
  methods: {
    dungeonUrl
  }
};
</script>

<style scoped>
</style>
