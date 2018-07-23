<template>
  <v-container fluid grid-list-md>
    <v-layout>
      <WaveEnemyCard v-for="enemy in wave.enemies" :key="enemy.id" :creature="enemy" />
      <WaveEnemyCard v-for="enemy in wave.bosses" :key="enemy.id" :creature="enemy" boss />
    </v-layout>
    
    
  </v-container>
</template>

<script>
import WaveEnemyCard from './WaveEnemyCard';

  export default {
    name: "Wave",
    props: {
      wave: {
        type: Object,
        required: true,
      }
    },
    components: {
      WaveEnemyCard
    }
  }
</script>

<style scoped>
</style>
