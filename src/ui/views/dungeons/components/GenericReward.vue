<template>
  <div>
  <h4>{{reward.type}} x{{reward.quantity}} <template v-if="reward.probability">- {{Math.round(reward.probability * 100)}}%</template></h4>
        <p>{{reward.value}}</p>
        </div>
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
