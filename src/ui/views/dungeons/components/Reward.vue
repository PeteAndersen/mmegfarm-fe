<template>
  <component :is="rewardComponent" :reward="reward" />
</template>

<script>
import CurrencyReward from "./CurrencyReward";
import EvolutionItemReward from "./EvolutionItemReward";
import GenericReward from "./EvolutionItemReward";
import GlyphReward from "./GlyphReward";
import CreatureReward from "./CreatureReward";

import { currencies } from "@/services/items";

export default {
  name: "Reward",
  props: {
    reward: Object
  },
  components: {
    CurrencyReward,
    EvolutionItemReward,
    GenericReward,
    GlyphReward,
    CreatureReward
  },
  computed: {
    isGroup() {
      return this.reward.type === "dropGroup";
    },
    rewardComponent() {
      if (Object.keys(currencies).includes(this.reward.type)) {
        return "CurrencyReward";
      } else if (this.reward.type === "evolutionItemPattern") {
        return "EvolutionItemReward";
      } else if (this.reward.type === "runePattern") {
        return "GlyphReward";
      } else if (this.reward.type === "creaturePattern") {
        return "CreatureReward";
      } else {
        return "GenericReward";
      }
    }
  }
};
</script>

<style scoped>
div {
  border: 1px solid red;
  margin: 5px;
}
</style>
