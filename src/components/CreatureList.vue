<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <CreatureCard v-for="creature in creatures" :key="creature.id" :creature="creature" />
    </v-layout>
    <button v-if="prev" @click="getPage(prev)">Previous</button>
    <button v-if="next" @click="getPage(next)">Next</button>
  </v-container>
</template>

<script>
import { api_root } from '@/api';
import CreatureCard from '@/components/CreatureCard.vue';

  export default {
    name: "CreatureList",
    components: {
      CreatureCard,
    },
    data() {
      return {
        creatures: [],
        next: null,
        prev: null,
      };
    },
    created: function() {
      this.getPage();
    },
    methods: {
      getPage: async function(url) {
        if (url === undefined) {
          url = `${api_root}/creatures.json`;
        }
        try {
          const res = await fetch(url);
          const creatures = await res.json();
          this.creatures = creatures.results;
          this.next = creatures.next;
          this.prev = creatures.previous;
        } catch (e) {
          console.log(e);
        }
      }
    },
  }
</script>

<style scoped>
</style>