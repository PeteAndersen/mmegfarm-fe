<template>
  <v-layout>
    <v-subheader>Shapes: </v-subheader>
    <v-chip v-for="shape in shapes" :key="shape">
      <v-avatar>
        <img :src="shapeImageUrl(shape)" />
      </v-avatar>
      <span class="text-capitalize">{{ shape }}</span>
    </v-chip>
    <v-subheader>Sets: </v-subheader>
    <v-chip v-for="set in sets" :key="set">
      <v-avatar>
        <img :src="setImageUrl(set)" />
      </v-avatar>
      <span class="text-capitalize">{{ set }}</span>
    </v-chip>
  </v-layout>
</template>

<script>
import { sets } from "@/services/glyphs";

export default {
  props: {
    sets: {
      type: Array,
      required: true
    },
    shapes: {
      type: Array,
      required: true
    }
  },
  methods: {
    shapeImageUrl(shape) {
      return `/static/glyphs/base-${shape}.png`;
    },
    setImageUrl(set) {
      return `/static/glyphs/icon-glyph-${sets[set].icon}.png`;
    }
  }
};
</script>

<style scoped>
</style>
