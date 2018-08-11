<template>
  <v-flex>
    {{ rewards }}
  </v-flex>
</template>

<script>
  export default {
    props: {
      rewards: {
        type: Array,
        required: true,
      },
      sc: {
        type: Boolean,
        default: false
      },
      glyphs: {
        type: Boolean,
        default: false,
      }

    },
    computed: {
      
    }
  }
</script>

<style scoped>
</style>