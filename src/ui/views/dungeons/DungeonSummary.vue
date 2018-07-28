<template>
  <div v-if="dungeonData">
    Dungeon summary will go here. For now, just click on the floor you want.
  
    <v-list>
      <v-list-tile
        v-for="(floor, idx) in dungeonData.levels"
        :key="floor.id"
        :to="`/dungeons/${id}-${slug}/${idx+1}/`"
      >Floor {{ idx + 1 }}</v-list-tile>
    </v-list>

    <router-view :id="id" :slug="slug" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

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
    ...mapGetters("dungeons", ["dungeon"]),
    dungeonData() {
      return this.dungeon(this.id);
    }
  },
  methods: {
    ...mapActions("dungeons", ["getDungeonDetail"])
  }
};
</script>

<style scoped>
</style>
