<template>
  <div>
    <h3>Type and Shape of Glyph Drops</h3>
    
    <v-layout>
      <v-avatar v-for="shape in shapes" :key="shape">
        <img :src="shapeImageUrl(shape)" />
      </v-avatar>

      <v-chip v-for="set in sets" :key="set">
        <v-avatar>
          <img :src="setImageUrl(set)" />
        </v-avatar>
        {{ set }}
      </v-chip>
    </v-layout>
  </div>
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
