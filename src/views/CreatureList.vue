<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <CreatureCard v-for="creature in creatures" :key="creature.id" :creature="creature" />
    </v-layout>
    <v-bottom-nav :value="true">
      <v-btn flat v-if="hasPrev" :href="prevUrl">
        <span>Previous</span>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-btn flat v-if="hasNext" :href="nextUrl">
        <span>Next</span>
        <v-icon>arrow_forward</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-container>
</template>

<script>
import { api_root } from '@/api';
import CreatureCard from '@/components/CreatureCard.vue';

export default {
  name: 'CreatureList',
  components: {
    CreatureCard
  },
  props: {
    page: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      creatures: [],
      hasNext: true,
      hasPrev: false
    };
  },
  computed: {
    nextUrl: function() {
      return `/${this.page+1}/`;
    },
    prevUrl: function() {
      return `/${this.page-1}/`;
    }
  },
  created: function() {
    this.getPage(this.page);
  },
  methods: {
    getPage: async function(page) {
      const url = `${api_root}/creatures.json?page=${this.page}`;
      
      try {
        const res = await fetch(url);
        const creatures = await res.json();
        this.creatures = creatures.results;
        this.hasNext = Boolean(creatures.next);
        this.hasPrev = Boolean(creatures.previous);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
</style>
