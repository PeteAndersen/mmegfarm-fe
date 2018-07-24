<template>
  <v-container v-if="dungeon && level">
    <v-layout>
      <h1>{{ dungeon.name }} {{ levelNumber }}<template v-if="level.difficulty"> - {{ level.difficulty }}</template></h1>
      
      <v-spacer></v-spacer>
      
      <div>
        <v-avatar>
          <img src="/static/currency/Energy.png" />
        </v-avatar>
        {{ level.energy_cost }}
      </div>

    </v-layout>

    <Wave v-for="(wave, idx) in level.waves" :key="wave.id" :wave="wave" :idx="idx + 1"/>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Wave from "./components/Wave.vue";

export default {
  name: "DungeonDetail",
  props: {
    id: {
      type: Number,
      required: true
    },
    slug: { type: String }
  },
  components: {
    Wave
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
    ...mapGetters("dungeons", ["dungeon", "level"]),
    levelNumber() {
      return this.dungeon.levels.findIndex(l => l.id == this.level.id) + 1;
    }
  },
  methods: {
    ...mapActions("dungeons", ["getDungeonDetail", "getLevelDetail"])
  }
};
</script>

<style scoped>
</style>
