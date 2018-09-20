<template>
  <v-card>
    <v-card-title v-if="reward.probability">{{Math.round(reward.probability * 100)}}% Chance</v-card-title>
    <v-card-text>{{reward.value.stars}} substats</v-card-text>
    <v-layout>
      <v-flex>
        <v-layout column>
          <v-flex>Shapes</v-flex>
          <v-flex v-for="shape in reward.value.shape" :key="shape">
            <v-avatar>
              <img :src="shapeImg(shape)" />
            </v-avatar>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout column>
          <v-flex>Sets</v-flex>
          <v-flex v-for="type in reward.value.type" :key="type">
            <v-avatar>
              <img :src="iconImg(type)" />
            </v-avatar>
          </v-flex>
        </v-layout>
      </v-flex> 
    </v-layout>
    
  </v-card>
</template>

<script>
import { sets, rarities } from "@/services/glyphs";
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
  }
};
</script>

<style scoped>
</style>
