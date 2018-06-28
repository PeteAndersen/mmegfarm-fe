<template>
  <v-flex xs12 md6 lg3>
    <v-card height="100%">
      <v-card-title>
        <CreatureAvatar :creature="creature" />
        <h2>{{creature.name}}</h2>
      </v-card-title>
      <v-card-text>{{creature.lore}}</v-card-text>
      <v-flex>
        <Spell v-for="spell in creature.spells" :key="spell.id" :spell="spell" />
      </v-flex>
    </v-card>
  </v-flex>
</template>

<script>
import CreatureAvatar from '@/components/creatures/CreatureAvatar.vue';
import Spell from '@/components/creatures/Spell.vue';

export default {
  name: 'CreatureCard',
  props: {
    creature: {
      type: Object,
      required: true
    }
  },
  components: {
    Spell,
    CreatureAvatar,
  }
};
</script>

<style scoped>
</style>
