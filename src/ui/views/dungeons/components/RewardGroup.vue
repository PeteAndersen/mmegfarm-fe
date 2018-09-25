<template>
<v-flex>
  <v-layout row>
    <v-flex xs12 v-for="(reward, idx) in sortedRewards" :key="idx" >
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
  },
  computed: {
    sortedRewards() {
      const rewards = this.rewards.value;
      return rewards.sort((a, b) => (a.probability > b.probability ? -1 : 1));
    }
  }
};
</script>

<style scoped>
</style>
