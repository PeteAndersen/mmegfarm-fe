<template>
  <div>
    <img :src="shapeImg" />
    <img class="icon" :src="icon" />
  </div>
</template>

<script>
import { shapes, sets, rarities } from "@/services/glyphs";
// This component is named Rune because glyph is a reserved SVG element

export default {
  name: "Rune",
  props: {
    shape: {
      required: true,
      validator(value) {
        return shapes.includes(value);
      }
    },
    set: {
      required: true,
      validator(value) {
        return Object.keys(sets).includes(value);
      }
    },
    rarity: {
      required: true,
      validator(value) {
        return rarities.includes(value);
      }
    }
  },
  computed: {
    shapeImg() {
      return `/static/glyphs/base-${this.shape}${
        this.rarity === "dark" ? "-dark" : ""
      }.png`;
    },
    icon() {
      const qualityNum =
        this.rarity === "dark" ? 5 : rarities.indexOf(this.rarity) + 1;
      return `/static/glyphs/icon-base-${
        sets[this.set].icon
      }-R${qualityNum}.png`;
    }
  }
};
</script>

<style scoped>
div {
  position: relative;
}
img.icon {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
