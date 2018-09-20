<template>
  <div>
    <v-avatar><img :src="image" /></v-avatar>
    <span v-if="quantity">{{quantity}}</span>
  </div>
</template>

<script>
export default {
  name: "ItemBase",
  props: {
    image: {
      type: String,
      required: true
    },
    quantity: Number
  }
};
</script>

<style scoped>
</style>
