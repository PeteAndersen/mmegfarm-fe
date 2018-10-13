<template>
  <span>
    <h4>{{reward.type}} x{{reward.quantity}} s</h4>
    <p>{{reward.value}}</p>
  </span>
</template>

<script>
export default {
  props: {
    reward: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
</style>
