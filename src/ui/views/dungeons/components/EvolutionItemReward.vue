<template>
  <v-layout column>
    <v-flex v-if="reward.probability" text-xs-center>
      {{Math.round(reward.probability * 100)}}%
    </v-flex>
    <v-flex v-for="(evo_item, idx) in reward.value" :key="idx">
      <EvolutionItem 
        :item="evo_item.type" 
        :size="evo_item.size"
        :quantity="reward.quantity" 
        with-text
        class="mr-3"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { EvolutionItem } from "@/ui/components/items";
export default {
  props: {
    reward: {
      type: Object,
      required: true
    }
  },
  components: {
    EvolutionItem
  }
};
</script>

<style scoped>
</style>
