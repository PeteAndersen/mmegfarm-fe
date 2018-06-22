<template>
  <v-avatar size="36px">
    <img :src="imgUrl" :alt="spell.image" />
  </v-avatar>
</template>

<script>
  export default {
    name: "Spell",
    props: {
      spell: {
        type: Object,
        required: true
      }
    },
    computed: {
      imgUrl() {
        return `/static/spells/${this.spell.image}.png`
      }
    }
  }
</script>

<style scoped>
</style>