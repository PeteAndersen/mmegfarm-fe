<template>
  <v-flex xs12 md6 lg3 fill-height>
    <v-card>
      <v-card-title>{{creature.name}} - {{creature.element}}</v-card-title>
      <v-card-text>{{creature.lore}}</v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    name: "CreatureCard",
    props: {
      creature: {
        type: Object,
        required: true,
      }
    }
  }
</script>

<style scoped>
</style>