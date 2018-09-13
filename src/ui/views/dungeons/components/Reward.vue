<template>
  <v-flex xs12>
    <template v-if="reward.type === 'dropGroup'">
      <Reward v-for="(subreward, idx) in reward.value" :key="idx" :reward="subreward" />
    </template>
    <template v-else>
      <h4>{{reward.type}} x{{reward.quantity}} <template v-if="reward.probability">- {{Math.round(reward.probability * 100)}}%</template></h4>
      <p>{{reward.value}}</p>
    </template>
  </v-flex>
</template>

<script>
  export default {
    name: "Reward",
    props: {
      reward: Object
    }
  }
</script>

<style scoped>
div {
  border: 1px solid red;
  margin: 5px;
}
</style>