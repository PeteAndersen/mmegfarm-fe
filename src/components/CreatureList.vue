<template>
  <v-container fluid grid-list-lg class="pa-0"> 
    <v-layout row wrap>
      <CreatureCard v-for="creature in creatures" :key="creature.id" :creature="creature" />
    </v-layout>
  </v-container>
</template>

<script>
import CreatureCard from "@/components/CreatureCard.vue";

export default {
  name: "CreatureList",
  components: {
    CreatureCard
  },
  props: {
    creatures: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      hasNext: false,
      hasPrev: false
    };
  }
};
</script>

<style scoped>
</style>
