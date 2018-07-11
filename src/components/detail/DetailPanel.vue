<template>
  <v-container>
    <CreatureAvatar class="ma-3 float left" :creature="creature"/>
    <v-layout>
      <h1>{{ creature.name }}</h1>

      <v-spacer />

      <v-tooltip bottom>
        <v-avatar slot="activator">
          <img :src="`/static/creatures/icon-${creature.archetype}.png`"/>
        </v-avatar>
        {{titleCase(creature.archetype)}}
      </v-tooltip>

      <v-tooltip bottom>
        <v-avatar slot="activator">
          <img :src="`/static/creatures/icon-${creature.element}.png`"/>
        </v-avatar>
        {{titleCase(creature.element)}}
      </v-tooltip>
    </v-layout>

    <div v-if="$vuetify.breakpoint.smAndDown" class="clearing"></div>

    <v-layout wrap align-end>
        <v-btn v-if="evolvesFrom" :to="`/creature/${evolvesFrom.slug}/`">
          <v-icon left>arrow_left</v-icon>
          <CreatureAvatar :creature="evolvesFrom" :stars="false" size="2em" />
          <span class="ml-2">{{ evolvesFrom.name }}</span>
        </v-btn>

        <v-btn v-if="evolvesTo" :to="`/creature/${evolvesTo.slug}/`">
          <span class="mr-2">{{ evolvesTo.name }}</span>
          <CreatureAvatar :creature="evolvesTo" :stars="false" size="2em" />
          <v-icon right>arrow_right</v-icon>
        </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import { titleCase } from "@/services/utils";
import CreatureAvatar from "@/components/creatures/CreatureAvatar";

export default {
  name: "DetailPanel",
  props: {
    creature: {
      type: Object,
      required: true
    },
    evolvesTo: {
      type: Object
    },
    evolvesFrom: {
      type: Object
    }
  },
  components: {
    CreatureAvatar
  },
  methods: {
    titleCase
  }
};
</script>

<style scoped>
.clearing {
  clear: both;
}
</style>
