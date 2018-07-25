<template>
  <v-flex>
    <v-card height="100%">
      <v-card-title>
        <v-layout>
          <CreatureAvatar
            :creature="creature"
            :level="creature.level"
            size="56px"
          />
          <v-spacer />
          <div class="text-xs-center">
            <h3>{{creature.name}}</h3>
            <p v-if="creature.boss_type == 'miniBoss'">MINIBOSS</p>
            <p v-if="creature.boss_type == 'boss'">BOSS</p>
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
      
      <v-divider />

      <v-layout>
        <v-flex>
          <v-list dense>
            <DenseStat stat="hp" :value="creature.hp" />
            <DenseStat stat="atk" :value="creature.attack" />
            <DenseStat stat="def" :value="creature.defense" />
            <DenseStat stat="speed" :value="Math.round(creature.speed * 1000)" />
          </v-list>
        </v-flex>
        <v-flex>
          <v-list dense>
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
