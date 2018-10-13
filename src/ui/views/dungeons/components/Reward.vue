<template>
  <v-flex :class="[`pa-2`, $vuetify.breakpoint.mdAndUp ? ` no-grow` : '']" :xs6="$vuetify.breakpoint.xs" :sm3="$vuetify.breakpoint.sm">
    <v-card class="pa-2" height="100%">
      <component :is="rewardComponent" :reward="reward" />
    </v-card>
  </v-flex>
</template>

<script>
import CurrencyReward from "./CurrencyReward";
import EvolutionItemReward from "./EvolutionItemReward";
import GenericReward from "./GenericReward";
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
.no-grow {
  flex: 0 1 auto;
}
</style>
