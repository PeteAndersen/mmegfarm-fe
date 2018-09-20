<template>
<v-flex>
  <v-layout row>
    <v-flex xs12 v-for="(reward, idx) in rewards.value" :key="idx" >
      <Reward :reward="reward" />
    </v-flex>
  </v-layout>
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
