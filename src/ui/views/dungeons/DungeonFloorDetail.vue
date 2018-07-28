<template>
  <div v-if="dungeonData && levelDetail">
    <v-layout>
      <h1>{{ dungeonData.name }} {{ level }}<template v-if="levelDetail.difficulty"> - {{ levelDetail.difficulty }}</template></h1>
      
      <v-spacer></v-spacer>
      
      <div>
        <v-avatar>
          <img src="/static/currency/Energy.png" />
        </v-avatar>
        {{ levelDetail.energy_cost }}
      </div>

    </v-layout>
    <v-container grid-list-md fluid class="pa-0">
      <template v-for="(wave, idx) in levelDetail.waves">
        <Wave :key="wave.id" :wave="wave" :idx="idx + 1"/>
        <v-divider :key="idx"/>
      </template>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Wave from "./components/Wave.vue";

export default {
  name: "DungeonFloorDetail",
  props: {
    id: {
      type: Number,
      required: true
    },
    slug: { type: String },
    level: { type: Number, required: true }
  },
  components: {
    Wave
  },
  async created() {
    // Duplicated here because watch: immediate does not have guaranteed access to all prop values on creation

    this.getLevelDetail({ dungeonId: this.id, level: this.level });
  },
  watch: {
    level: {
      handler: async function(val) {
        await this.getLevelDetail({ dungeonId: this.id, level: val });
      }
    }
  },
  computed: {
    ...mapGetters("dungeons", ["dungeon", "levelDetail"]),
    dungeonData() {
      return this.dungeon(this.id);
    }
  },
  methods: {
    ...mapActions("dungeons", ["getLevelDetail"])
  }
};
</script>

<style scoped>
</style>
