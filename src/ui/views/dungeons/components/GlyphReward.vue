<template>
  <div>
    <span v-if="reward.probability">{{Math.round(reward.probability * 100)}}%</span>
    <Rune 
      v-for="(glyph, idx) in allShapeTypeCombos" 
      :key="idx" 
      :shape="glyph.shape" 
      :set="glyph.type"
      :rarity="reward.value.rarity.toLowerCase()"
    />
  </div>
</template>

<script>
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
  computed: {
    allShapeTypeCombos() {
      const runeData = this.reward.value;
      // Create exhaustive combination of all shapes/types in this drop
      return runeData.type.reduce(
        (accum, type) =>
          accum.concat(
            runeData.shape.map(shape => ({
              type: type.toLowerCase(),
              shape: shape.toLowerCase()
            }))
          ),
        []
      );
    }
  }
};
</script>

<style scoped>
</style>
