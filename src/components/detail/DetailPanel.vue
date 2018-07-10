<template>
  <v-container>
    <v-layout>
      <CreatureAvatar class="ma-3 float left" :creature="creature"/>
      
      <v-spacer />

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
    <p>{{creature.lore}}</p>
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
</style>
