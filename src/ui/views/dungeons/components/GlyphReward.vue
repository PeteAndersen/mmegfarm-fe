<template>
  <v-layout column text-xs-center>
    <v-flex v-if="probability" text-sm-center>
      {{Math.round(reward.probability * 100)}}%
    </v-flex>
  
    <v-flex>
      <v-chip>
        <v-avatar :class="rarityColor"></v-avatar>
        {{reward.value.stars}}<v-icon small>star</v-icon> {{reward.value.rarity}}
      </v-chip>
    </v-flex>
  </v-layout>
</template>

<script>
import { sets, rarities, colors } from "@/services/glyphs";
import { Rune } from "@/ui/components/items";

export default {
  name: "GlyphReward",
  props: {
    reward: {
      type: Object,
      required: true
    }
  },
  components: {
    Rune
  },
  methods: {
    shapeImg(shape) {
      return `/static/glyphs/base-${shape}${
        this.reward.value.rarity === "dark" ? "-dark" : ""
      }.png`;
    },
    iconImg(type) {
      const qualityNum =
        this.rarity === "dark"
          ? 5
          : rarities.indexOf(this.reward.value.rarity) + 1;
      return `/static/glyphs/icon-base-${sets[type].icon}-R${qualityNum}.png`;
    }
  },
  computed: {
    probability() {
      return this.reward.probability
        ? Math.round(this.reward.probability * 100)
        : undefined;
    },
    rarityColor() {
      return colors[this.reward.value.rarity];
    }
  }
};
</script>

<style scoped>
</style>
