<template>
  <v-list-group v-if="dungeons.length">
    <v-list-tile slot="activator">
      <v-list-tile-title>{{ name }}</v-list-tile-title>
    </v-list-tile>
    <v-list-tile v-for="d in dungeons" :key="d.id" :to="`/dungeons/${d.id}-${urlSlug(d.name)}/`">
      <v-list-tile-title v-text="d.name"></v-list-tile-title>
    </v-list-tile>
  </v-list-group>
</template>

<script>
import urlSlug from "url-slug";

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
  methods: {
    urlSlug
  }
};
</script>

<style scoped>
</style>
