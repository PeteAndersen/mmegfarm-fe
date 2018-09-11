<template>
  <div>
    <DungeonGroup name="Glyph Dungeons" :dungeons="glyphs" avatar="/static/glyphs/glyphs-legendary.png" />
    <DungeonGroup name="Elemental Dungeons" :dungeons="elemental" avatar="/static/dungeons/all-elements.png" />
    <DungeonGroup name="Scenarios" :dungeons="scenarios" avatar="/static/dungeons/school.png" />
    <DungeonGroup name="Other" :dungeons="other" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import DungeonGroup from "./components/DungeonGroup";

const onGroup = group => d => d.group === group;
const otherGroups = d =>
  !["ScenarioDungeon", "GroupGlyphs", "GroupElements"].includes(d.group);
const byName = (a, b) => (a.name > b.name ? 1 : -1);

export default {
  name: "DungeonList",
  components: { DungeonGroup },
  created() {
    this.getDungeons();
  },
  computed: {
    ...mapGetters("dungeons", ["dungeons"]),
    scenarios() {
      return this.dungeons.filter(onGroup("ScenarioDungeon"));
    },
    glyphs() {
      return this.dungeons.filter(onGroup("GroupGlyphs")).sort(byName);
    },
    elemental() {
      return this.dungeons.filter(onGroup("GroupElements")).sort(byName);
    },
    other() {
      return this.dungeons.filter(otherGroups).sort(byName);
    }
  },
  methods: {
    ...mapActions("dungeons", ["getDungeons", "getDungeonDetail"])
  }
};
</script>

<style scoped>
</style>
