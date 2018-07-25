<template>
  <v-container fluid>
    <v-layout row>
      <div class="wave-number-container">
        <span class="wave-number mb-5" v-if="idx">Wave {{ idx }}</span>
      </div>

      <v-container fluid grid-list-md class="pa-0">
        <v-layout row wrap>
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
.wave-number-container {
  writing-mode: vertical-rl;
}
.wave-number {
  position: sticky;
  font-size: 20px;
  font-weight: 600;
  top: 75px;
}
</style>
