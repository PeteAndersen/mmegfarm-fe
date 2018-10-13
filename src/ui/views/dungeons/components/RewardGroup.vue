<template>
  <v-flex v-if="rewards.value.length > 1" xs12>
    <v-subheader>
      {{ totalProbability }}% Chance for one of the following...
    </v-subheader>
    <v-layout row wrap>
      <Reward v-for="(reward, idx) in sortedRewards" :key="idx" :reward="reward" />
    </v-layout>
  </v-flex>

  <Reward v-else :reward="rewards.value[0]" />
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
      return [...this.rewards.value].sort(
        (a, b) => (a.probability > b.probability ? -1 : 1)
      );
    },
    totalProbability() {
      return Math.min(
        Math.round(
          this.rewards.value.reduce(
            (probability, reward) => probability + reward.probability,
            0
          ) * 100
        ),
        100
      );
    }
  }
};
</script>

<style scoped>
</style>
