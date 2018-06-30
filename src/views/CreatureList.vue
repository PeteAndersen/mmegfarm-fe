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
import { mapActions } from 'vuex'
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
      hasNext: false,
      hasPrev: false
    };
  },
  computed: {
    creatures: function() {
      console.log(this.$store);
      return Object.values(this.$store.state.creatures);
    }
  },
  created() {
    this.populateCreatures();
  },
  methods: {
    ...mapActions(['populateCreatures']),
  }
};
</script>

<style scoped>
</style>
