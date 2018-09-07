<template>
  <v-flex xs12 md6 lg3>
    <v-card height="100%">
      <v-card-title><h2>{{ name }}</h2></v-card-title>
      <v-list>
        <v-list-tile
          v-for="d in dungeons"
          :key="d.id"
          :to="dungeonUrl(d)"
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
    urlSlug,
    dungeonUrl(d) {
      return d.group === "GroupScenario"
        ? `/dungeons/${d.id}-${urlSlug(d.name)}/1/`
        : `/dungeons/${d.id}-${urlSlug(d.name)}/${d.levels.length}/`;
    }
  }
};
</script>

<style scoped>
</style>
