<template>
  <v-container>
    <v-layout row>
      <h1 v-if="idx">Wave {{ idx }}</h1>

      <v-container fluid grid-list-md class="pa-0">
        <v-layout align-content-start>
          <WaveEnemyCard v-for="enemy in wave.enemies" :key="enemy.id" :creature="enemy" />
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import WaveEnemyCard from "./WaveEnemyCard";

export default {
  name: "Wave",
  props: {
    wave: {
      type: Object,
      required: true
    },
    idx: {
      type: Number,
      required: false
    }
  },
  components: {
    WaveEnemyCard
  }
};
</script>

<style scoped>
h1 {
  writing-mode: vertical-rl;
}
</style>
