<template>

  <v-flex>
    <v-menu open-on-hover :open-delay="250" max-width="350px">
      <div slot="activator">
        <div class="subheader">{{spell.slot}}. {{spell.title}}</div>
        
        <v-avatar size="3em" class="skill-icon">
          <img :src="`/static/spells/${spell.image}.png`">
        </v-avatar>

        <v-avatar v-for="(effect, index) in effects" :key="index" tile size="1.5em" slot="activator">
          <img :src="effect.icon" />
        </v-avatar>
      </div>

      <SpellPanel :spell="spell" />
    </v-menu>
  </v-flex>
</template>

<script>
import { effect_definitions } from "@/services/creatures.js";
import SpellPanel from "@/components/creatures/SpellPanel.vue";

export default {
  name: "Spell",
  components: {
    SpellPanel
  },
  props: {
    spell: {
      type: Object,
      required: true
    }
  },
  computed: {
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
