<template>
  <div>
    {{id}} {{ slug }}
  </div>
</template>

<script>
export default {
  name: "DungeonDetail",
  props: {
    id: {
      type: Number,
      required: true
    },
    slug: { type: String }
  }
};
</script>

<style scoped>
</style>
