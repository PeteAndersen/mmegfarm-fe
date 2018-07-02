<template>
  <v-flex xs12 md6 lg3>
    <v-card height="100%" :href="creatureDetailUrl">
      <v-card-title>
        <CreatureAvatar :creature="creature" />
        <h2>{{creature.name}}</h2>
      </v-card-title>
      <v-container grid-list-md text-xs-center class="pa-2">
        <v-layout row wrap>
          <v-flex xs3>
            <v-avatar size="2em">
              <img src="/static/creatures/icon-stats-hp.png" />
            </v-avatar>
            {{creature.maxLvlHp}}
          </v-flex>
          <v-flex xs3>
            <v-avatar size="2em">
              <img src="/static/creatures/icon-stats-atk.png" />
            </v-avatar>
            {{creature.maxLvlAttack}}
          </v-flex>
          <v-flex xs3>
            <v-avatar size="2em">
              <img src="/static/creatures/icon-stats-def.png" />
            </v-avatar>
            {{creature.maxLvlDefense}}
          </v-flex>
          <v-flex xs3>
            <v-avatar size="2em">
              <img src="/static/creatures/icon-stats-speed.png" />
            </v-avatar>
            {{Math.round(creature.speed * 1000)}}
          </v-flex>
          <v-flex xs3>
            <v-avatar size="2em">
              <img src="/static/creatures/icon-stats-crit-rate.png" />
            </v-avatar>
            {{creature.criticalChance}}%
          </v-flex>
          <v-flex xs3>
            <v-avatar size="2em">
              <img src="/static/creatures/icon-stats-crit-dmg.png" />
            </v-avatar>
            {{creature.criticalDamage}}%
          </v-flex>
          <v-flex xs3>
            <v-avatar size="2em">
              <img src="/static/creatures/icon-stats-accuracy.png" />
            </v-avatar>
            {{Math.round(creature.accuracy * 100)}}%
          </v-flex>
          <v-flex xs3>
            <v-avatar size="2em">
              <img src="/static/creatures/icon-stats-resistance.png" />
            </v-avatar>
            {{Math.round(creature.resistance * 100)}}%
          </v-flex>
        </v-layout>
      </v-container>
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
  computed: {
    creatureDetailUrl: function() {
      return `/creature/${this.creature.slug}`;
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
