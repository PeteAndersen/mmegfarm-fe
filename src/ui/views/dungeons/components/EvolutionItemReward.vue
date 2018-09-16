<template>
  <div>
    <span v-if="reward.probability">{{Math.round(reward.probability * 100)}}%</span>
    <EvolutionItem 
      v-for="(evo_item, idx) in reward.value"
      :key="idx"
      :item="evo_item.type" 
      :size="evo_item.size"
      :quantity="reward.quantity" 
    />
  </div>
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
