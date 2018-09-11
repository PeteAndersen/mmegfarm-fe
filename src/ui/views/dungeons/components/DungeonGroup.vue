<template>
  <div>
    <h1>
      <v-avatar v-if="avatar">
        <img :src="avatar">
      </v-avatar>
      {{name}}
    </h1>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <DungeonCard v-for="dungeon in dungeons" :key="dungeon.id" :dungeon="dungeon" />
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import DungeonCard from "./DungeonCard";

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    dungeons: {
      type: Array,
      required: true
    },
    avatar: {
      type: String,
      required: false
    }
  },
  components: {
    DungeonCard
  }
};
</script>

<style scoped>
</style>
