<template>
  <v-layout column>
    <v-flex v-if="reward.probability" text-xs-center>
      {{Math.round(reward.probability * 100)}}%
    </v-flex>
    
    <v-flex>
      <Currency :currency="reward.type" :quantity="reward.quantity" with-text/>
    </v-flex>
  </v-layout>
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
