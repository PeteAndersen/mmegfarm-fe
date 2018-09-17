<template>
  <v-flex xs12>
    <Reward v-for="(reward, idx) in rewards.value" :key="idx" :reward="reward" />
  </v-flex>
</template>

<script>
import Reward from "./Reward";

export default {
  props: {
    rewards: { type: Object, required: true }
  },
  components: {
    Reward
  }
};
</script>

<style scoped>
</style>
