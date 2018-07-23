<template>
  <v-flex sm12 md6 lg4>
    <v-card height="100%">
      <v-card-title>
        <v-layout>
          <CreatureAvatar
            :creature="creature"
            :level="creature.level" 
          />
          <v-spacer />
          <div class="text-xs-center">
            <h2>{{creature.name}}</h2>
            <h4 v-if="creature.miniboss">MINIBOSS</h4>
            <h3 v-if="boss">BOSS</h3>
          </div>
          <v-spacer />
          <v-tooltip bottom>
            <v-avatar slot="activator">
              <img :src="`/static/creatures/icon-${this.creature.archetype}.png`"/>
            </v-avatar>
            {{titleCase(creature.archetype)}}
          </v-tooltip>
          <v-tooltip bottom>
            <v-avatar slot="activator">
              <img :src="`/static/creatures/icon-${this.creature.element}.png`"/>
            </v-avatar>
            {{titleCase(creature.element)}}
          </v-tooltip>
        </v-layout>
      </v-card-title>
      <v-container grid-list-md text-xs-center class="pa-2">
        <v-layout row wrap>
          <Stat stat="hp" :value="creature.hp" />
          <Stat stat="atk" :value="creature.attack" />
          <Stat stat="def" :value="creature.defense" />
          <Stat stat="speed" :value="Math.round(creature.speed * 1000)" />
          <Stat stat="crit-rate" :value="creature.criticalChance" />
          <Stat stat="crit-dmg" :value="creature.criticalDamage" />
          <Stat stat="accuracy" :value="Math.round(creature.accuracy * 100)" />
          <Stat stat="resistance" :value="Math.round(creature.resistance * 100)" />
        </v-layout>
      </v-container>
      <v-divider />
      <v-container class="pa-2">
        <v-layout row wrap class="spells pb-2">
          <Spell
            v-for="spell in creature.spells"
            :spell="spell"
            :key="spell.id"
            :class="`xs${spellColSize}`"
          />
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import { titleCase } from "@/services/utils";

import CreatureAvatar from "@/ui/components/creatures/CreatureAvatar.vue";
import Spell from "@/ui/components/creatures/Spell.vue";
import Stat from "@/ui/components/creatures/Stat.vue";

export default {
  name: "WaveEnemyCard",
  props: {
    creature: {
      type: Object,
      required: true
    },
    boss: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    spells() {
      const spells = this.creature.spells.reduce((accum, spell) => {
        if (accum[spell.slot] !== undefined) {
          accum[spell.slot].push(spell);
        } else {
          accum[spell.slot] = [spell];
        }
        return accum;
      }, {});

      return spells;
    }
  },
  components: {
    Spell,
    Stat,
    CreatureAvatar
  },
  methods: {
    titleCase
  }
};
</script>

<style scoped>
.spells {
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
