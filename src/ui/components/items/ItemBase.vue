<template>
  <div>
    <img :src="image" />
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
