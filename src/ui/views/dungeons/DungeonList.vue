<template>
  <div>
    <h1>DUNGEONS!!!</h1>

    <h2>Glpyh Dungeons</h2>
    <ul v-if="glyphs.length">
      <li v-for="d in glyphs" :key="d.id">{{d.name}}</li>
    </ul>

    <h2>Elemental</h2>
    <ul v-if="elemental.length">
      <li v-for="d in elemental" :key="d.id">{{d.name}}</li>
    </ul>

    <h2>Scenarios</h2>
    <ul v-if="scenarios.length">
      <li v-for="d in scenarios" :key="d.id">{{d.name}}</li>
    </ul>

    <h2>Tower of Trials</h2>
    <ul v-if="tower.length">
      <li v-for="d in tower" :key="d.id">{{d.name}}</li>
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
      ]),
      scenarios() {
        return this.dungeons.filter(d => d.group === 'ScenarioDungeon')
      },
      glyphs() {
        return this.dungeons.filter(d => d.group === 'GroupGlyphs')
      },
      elemental() {
        return this.dungeons.filter(d => d.group === 'GroupElements')
      },
      tower() {
        return this.dungeons.filter(d => d.group === 'GroupTwinTowers')
      }
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