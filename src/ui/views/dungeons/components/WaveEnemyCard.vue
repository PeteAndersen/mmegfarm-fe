<template>
  <v-flex xs12 md6 lg3>
    <v-card height="100%">
      <v-card-title>
        <v-layout row>
          <div class="mr-4">
            <CreatureAvatar
              :creature="creature"
              :level="creature.level"
              size="56px"
            />
          </div>
          <div>

          <h3>{{creature.name}}</h3>
          

          <span v-if="creature.boss_type == 'miniBoss'">MINIBOSS</span>
          <span v-if="creature.boss_type == 'boss'">BOSS</span>

          <v-avatar size="2em">
            <img :src="`/static/creatures/icon-${this.creature.archetype}.png`"/>
          </v-avatar>

          <v-avatar size="2em">
            <img :src="`/static/creatures/icon-${this.creature.element}.png`"/>
          </v-avatar>
          </div>
            </v-layout>
      </v-card-title>
      
      <v-divider />

      <v-layout row wrap>
        <v-flex xs12 md12 lg6 :class="$vuetify.breakpoint.mdAndDown ? 'pb-0' : ''">
          <v-list dense :class="$vuetify.breakpoint.mdAndDown ? 'pb-0' : ''">
            <DenseStat stat="hp" :value="creature.hp" />
            <DenseStat stat="atk" :value="creature.attack" />
            <DenseStat stat="def" :value="creature.defense" />
            <DenseStat stat="speed" :value="Math.round(creature.speed * 1000)" />
          </v-list>
        </v-flex>
        <v-flex xs12 md12 lg6 :class="$vuetify.breakpoint.mdAndDown ? 'pt-0' : ''">
          <v-list dense :class="$vuetify.breakpoint.mdAndDown ? 'pt-0' : ''">
            <DenseStat stat="crit-rate" :value="creature.criticalChance" />
            <DenseStat stat="crit-dmg" :value="creature.criticalDamage" />
            <DenseStat stat="accuracy" :value="Math.round(creature.accuracy * 100)" />
            <DenseStat stat="resistance" :value="Math.round(creature.resistance * 100)" />
          </v-list>
        </v-flex>
      </v-layout>

      <v-divider />

      <v-list two-line>
        <SpellListItem
            v-for="spell in creature.spells"
            :spell="spell"
            :key="spell.id"
          />
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import { titleCase } from "@/services/utils";

import CreatureAvatar from "@/ui/components/creatures/CreatureAvatar.vue";
import SpellListItem from "@/ui/components/creatures/SpellListItem.vue";
import DenseStat from "./DenseStat.vue";

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
    SpellListItem,
    DenseStat,
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
