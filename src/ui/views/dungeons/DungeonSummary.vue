<template>
  <div v-if="dungeonData">
    
    <v-layout column>
      <v-flex v-for="(level, idx) in dungeonData.levels" :key="level.id" sc glyphs>
        <router-link :to="`/dungeons/${id}-${slug}/${idx+1}/`">
          Floor {{ idx + 1 }}
        </router-link>
        <RewardSummaryRow :rewards="level.rewards" />
      </v-flex>
    </v-layout>
  
    <router-view :id="id" :slug="slug" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RewardSummaryRow from './components/RewardSummaryRow';

export default {
  name: "DungeonSummary",
  props: {
    id: {
      type: Number,
      required: true
    },
    slug: {
      type: String,
      required: false
    }
  },
  components: {
    RewardSummaryRow
  },
  watch: {
    id: {
      handler: async function(val) {
        // Update dungeon in state when id changes
        await this.getDungeonDetail(val);
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters("dungeons", ["dungeonDetail"]),
    dungeonData() {
      return this.dungeonDetail(this.id);
    }
  },
  methods: {
    ...mapActions("dungeons", ["getDungeonDetail"])
  }
};
</script>

<style scoped>
</style>
