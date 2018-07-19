<template>
  <div>
    <h1>DUNGEONS!!!</h1>

    <ul v-if="dungeons">
      <li v-for="dungeon in dungeons" :key="dungeon.id">{{dungeon.name}}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

  export default {
    name: "DungeonList",
    created() {
      this.getDungeons();
    },
    computed: {
      ...mapGetters('dungeons', [
        'dungeons'
      ])
    },
    methods: {
      ...mapActions('dungeons', [
        'getDungeons'
      ])
    }
  }
</script>

<style scoped>
</style>