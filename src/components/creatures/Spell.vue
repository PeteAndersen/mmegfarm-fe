<template>
  <v-flex>
    <div class="subheader">{{spell.slot}}. {{spell.title}}</div>
    
    <v-avatar size="3em" class="skill-icon">
      <img :src="imgUrl">
    </v-avatar>

    <v-tooltip bottom v-for="(effect, index) in effects" :key="index">
      <v-avatar tile size="1.5em" slot="activator">
        <img :src="effect.icon" />
      </v-avatar>
        <span>{{ effect.title }}</span>
    </v-tooltip>

  </v-flex>
</template>

<script>
import { effect_definitions } from "@/services/creatures.js";

export default {
  name: "Spell",
  props: {
    spell: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgUrl() {
      return `/static/spells/${this.spell.image}.png`;
    },
    effects() {
      return this.spell.effects.reduce((accum, effect) => {
        const definition = effect_definitions[effect.effect];

        if (definition && definition.icon) {
          accum.push({
            title: definition.title,
            icon: `/static/effects/${definition.icon}.png`
          });
        }
        return accum;
      }, []);
    }
  }
};
</script>

<style scoped>
.flex {
  overflow: hidden;
  white-space: normal;
}
.subheader {
  height: 2em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.skill-icon {
  float: left;
}
</style>
