<template>
  <div>
    <h2>Rewards</h2>
    <v-layout column wrap v-for="(rewards, name) in grouped" v-if="rewards.length" :key="name" >
      <h3>{{name}}</h3>
      
      <GlyphTypeSummary 
        v-if="glyphRewardSummary && name === 'Glyphs'"
        :sets="glyphRewardSummary.types"
        :shapes="glyphRewardSummary.shapes"
      />

      <v-layout row wrap>
        <template v-for="(reward, idx) in rewards">
          <RewardGroup v-if="reward.type === 'dropGroup'" :key="idx" :rewards="reward" />
          <Reward v-else :key="idx" fill-height :reward="reward" />
        </template>
      </v-layout>
      
      <v-divider class="mt-2 mb-2" />
    </v-layout>
  </div>
</template>

<script>
import GlyphTypeSummary from "./GlyphTypeSummary";
import Reward from "./Reward";
import RewardGroup from "./RewardGroup";

import { currencies } from "@/services/items";

const sortGroupByLength = (a, b) => {
  if (a.type === "dropGroup" && b.type === "dropGroup") {
    // Sort by number of rewards (ascending)
    return a.value.length > b.value.length ? 1 : -1;
  } else if (a.type === "dropGroup") {
    // Move a towards end
    return 1;
  } else if (b.type === "dropGroup") {
    // Move b towards end
    return -1;
  }
};

const isCurrency = reward => {
  if (reward.type === "dropGroup") {
    // Check items within the group
    return isCurrency(reward.value[0]);
  } else {
    return currencies[reward.type] !== undefined;
  }
};

const isEvoMaterial = reward => {
  if (reward.type === "dropGroup") {
    // Check items within the group
    return isEvoMaterial(reward.value[0]);
  } else {
    return reward.type === "evolutionItemPattern";
  }
};

const isGlyph = reward => {
  if (reward.type === "dropGroup") {
    // Check items within the group
    return isGlyph(reward.value[0]);
  } else {
    return reward.type === "runePattern";
  }
};

const isOther = reward => {
  return !isCurrency(reward) && !isEvoMaterial(reward) && !isGlyph(reward);
};

export default {
  props: {
    rewards: {
      type: Array,
      required: true
    }
  },
  components: {
    GlyphTypeSummary,
    Reward,
    RewardGroup
  },
  computed: {
    grouped() {
      const groups = {
        Currency: this.rewards.filter(isCurrency).sort(sortGroupByLength),
        "Evolution Materials": this.rewards
          .filter(isEvoMaterial)
          .sort(sortGroupByLength),
        Glyphs: this.rewards.filter(isGlyph).sort(sortGroupByLength),
        Other: this.rewards.filter(isOther).sort(sortGroupByLength)
      };
      console.log(groups);
      return groups;
    },
    glyphRewardSummary() {
      // Determine what shapes and sets drop in rewards. This can be determined from a single glyph reward
      const glyphDrop = this.rewards
        .filter(isGlyph)
        .find(group => group.value[0].type === "runePattern");

      if (!glyphDrop) {
        return undefined;
      }

      const glyphReward = glyphDrop.value[0].value;
      return { shapes: glyphReward.shape, types: glyphReward.type };
    }
  }
};
</script>

<style scoped>
</style>
