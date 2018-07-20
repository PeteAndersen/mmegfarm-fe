<template>
  <v-flex xs12 md6 lg3>
    <v-card height="100%">
      <v-card-title><h2>{{ title }}</h2></v-card-title>
      <v-list>
        <v-list-tile
          v-for="d in dungeons"
          :key="d.id"
          :to="`/dungeons/${d.id}-${urlSlug(d.name)}/`"
        >
          <v-list-tile-content>
            {{ d.name }}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import urlSlug from "url-slug";

export default {
  name: "DungeonGroupCard",
  props: {
    title: {
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
