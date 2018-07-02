<template>
  <div>
    <CreatureList :creatures="creatureList" />
    <div class="text-xs-center">
      <v-pagination
        class="pt-2"
        v-model="page"
        :length="numPages"
       />
    </div>
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
  /*props: {
    page: {
      type: Number,
      default: 1
    }
  },*/
  computed: {
    ...mapGetters(['creatureList', 'numPages', 'loading']),
    page: {
      get: function() {
        return this.$store.getters.page
      },
      set: function(newValue) {
        this.setPage(newValue);
      }
    }
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
    ...mapActions(['populateCreatures', 'setPage', 'nextPage', 'prevPage']),
  }
};
</script>

<style scoped>
</style>
