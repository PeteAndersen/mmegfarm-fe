<template>
  <v-flex xs12 md6 lg3>
    <v-card height="100%">
      <v-card-title><h2>{{ title }}</h2></v-card-title>
      <v-list>
        <v-list-tile
          v-for="d in dungeons"
          :key="d.id"
          :to="`/dungeons/${d.slug}/`"
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
  }
};
</script>

<style scoped>
</style>
