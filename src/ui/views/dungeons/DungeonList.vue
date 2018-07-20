<template>
  <v-container grid-list-sm>
    <v-layout>
      <DungeonGroupCard v-if="glyphs.length" title="Glyph Dungeons" :dungeons="glyphs" />
      <DungeonGroupCard v-if="elemental.length" title="Elemental Dungeons" :dungeons="elemental" />
      <DungeonGroupCard v-if="scenarios.length" title="Scenarios" :dungeons="scenarios" />
      <DungeonGroupCard v-if="tower.length" title="Tower of Trials" :dungeons="tower" />
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { group_names } from "@/services/dungeons";
import DungeonGroupCard from "./components/DungeonGroupCard";

export default {
  name: "DungeonList",
  components: {
    DungeonGroupCard
  },
  created() {
    this.getDungeons();
  },
  computed: {
    ...mapGetters("dungeons", ["dungeons"]),
    scenarios() {
      return this.dungeons
        .filter(d => d.group === "ScenarioDungeon")
        .map(d => ({
          ...d,
          group: group_names[d.group]
        }));
    },
    glyphs() {
      return this.dungeons.filter(d => d.group === "GroupGlyphs");
    },
    elemental() {
      return this.dungeons.filter(d => d.group === "GroupElements");
    },
    tower() {
      return this.dungeons.filter(d => d.group === "GroupTwinTowers");
    }
  },
  methods: {
    ...mapActions("dungeons", ["getDungeons"])
  }
};
</script>

<style scoped>
</style>
