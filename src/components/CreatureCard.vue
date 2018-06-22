<template>
  <v-flex xs12 md6 lg3 fill-height>
    <v-card>
      <v-card-title>{{creature.name}} - {{creature.element}}</v-card-title>
      <v-card-text>{{creature.rank}} Stars</v-card-text>
      <v-card-text>{{creature.lore}}</v-card-text>
      <v-flex>
        <Spell v-for="spell in creature.spells" :key="spell.id" :spell="spell" />
      </v-flex>
    </v-card>
  </v-flex>
</template>

<script>
  import Spell from '@/components/Spell.vue';

  export default {
    name: "CreatureCard",
    props: {
      creature: {
        type: Object,
        required: true,
      }
    },
    components: {
      Spell
    }
  }
</script>

<style scoped>
</style>