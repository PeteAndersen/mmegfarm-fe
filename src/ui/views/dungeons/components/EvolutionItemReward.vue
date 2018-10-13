<template>
  <v-layout column>
    <v-flex v-if="reward.probability" text-sm-center>
      {{Math.round(reward.probability * 100)}}%
    </v-flex>
    <v-flex>
      <v-layout row class="item-list">
        <EvolutionItem 
          v-for="(evo_item, idx) in reward.value"
          :key="idx"
          :item="evo_item.type" 
          :size="evo_item.size"
          :quantity="reward.quantity" 
          with-text
          class="mr-3"
        />
      </v-layout>
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
.item-list div {
  display: inline-block;
}
.item-list div:not(:last-child):after {
  padding-left: 16px;
  content: "+";
}
</style>
