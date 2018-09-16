<template>
  <div>
    <span v-if="reward.probability">{{Math.round(reward.probability * 100)}}%</span>
    <Currency :currency="reward.type" :quantity="reward.quantity" />
  </div>
</template>

<script>
import { Currency } from "@/ui/components/items";
export default {
  name: "CurrencyReward",
  props: {
    reward: {
      type: Object,
      required: true
    }
  },
  components: {
    Currency
  }
};
</script>

<style scoped>
</style>
