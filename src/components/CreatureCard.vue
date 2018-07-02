<template>
  <v-flex xs12 md6 lg3>
    <v-card height="100%" :href="creatureDetailUrl">
      <v-card-title>
        <CreatureAvatar :creature="creature" />
        <h2>{{creature.name}}</h2>
      </v-card-title>
      <v-container grid-list-md text-xs-center class="pa-2">
        <v-layout row wrap>
          <Stat stat="hp" :value="creature.maxLvlHp" />
          <Stat stat="atk" :value="creature.maxLvlAttack" />
          <Stat stat="def" :value="creature.maxLvlDefense" />
          <Stat stat="speed" :value="Math.round(creature.speed * 1000)" />
          <Stat stat="crit-rate" :value="creature.criticalChance" />
          <Stat stat="crit-dmg" :value="creature.criticalDamage" />
          <Stat stat="accuracy" :value="Math.round(creature.accuracy * 100)" />
          <Stat stat="resistance" :value="Math.round(creature.resistance * 100)" />
        </v-layout>
      </v-container>
      <v-list two-line subheader>
        <Spell v-for="spell in creature.spells" :key="spell.id" :spell="spell" />
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import CreatureAvatar from '@/components/creatures/CreatureAvatar.vue';
import Spell from '@/components/creatures/Spell.vue';
import Stat from '@/components/creatures/Stat.vue'

export default {
  name: 'CreatureCard',
  props: {
    creature: {
      type: Object,
      required: true
    }
  },
  computed: {
    creatureDetailUrl: function() {
      return `/creature/${this.creature.slug}`;
    }
  },
  components: {
    Spell,
    Stat,
    CreatureAvatar,
  }
};
</script>

<style scoped>
</style>
