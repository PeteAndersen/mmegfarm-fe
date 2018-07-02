<template>
  <div class="mb-3" ref="creatureList">
    <CreatureList :creatures="creatureList" />
    <v-bottom-nav :value="true" fixed>
      <v-btn flat v-if="hasPrev" @click="prevPage" :loading="loading && direction === 'prev'">
        <span>Previous</span>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-btn flat v-if="hasNext" @click="nextPage" :loading="loading && direction === 'next'">
        <span>Next</span>
        <v-icon>arrow_forward</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { api_root } from '@/api';

import CreatureList from '@/components/CreatureList.vue';

export default {
  name: 'Creatures',
  components: {
    CreatureList
  },
  props: {
    page: {
      type: Number,
      default: 1
    }
  },
  computed: {
    ...mapGetters(['creatureList', 'page', 'hasNext', 'hasPrev', 'loading', 'direction']),
  },
  created() {
    this.populateCreatures();
  },
  watch: {
    loading: function(val, oldVal) {
      if (val === false) {
        this.$vuetify.goTo(0, {
          duration: 0,
        })
      }
    }
  },
  methods: {
    ...mapActions(['populateCreatures', 'nextPage', 'prevPage']),
  }
};
</script>

<style scoped>
</style>
