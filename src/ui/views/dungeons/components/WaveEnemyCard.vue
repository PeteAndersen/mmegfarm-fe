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

      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>HP:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ creature.hp }}</v-list-tile-content>
        </v-list-tile>
        
        <v-list-tile>
          <v-list-tile-content>ATK:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ creature.attack }}</v-list-tile-content>
        </v-list-tile>
        
        <v-list-tile>
          <v-list-tile-content>DEF:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ creature.defense }}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-content>SPD:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ Math.round(creature.speed * 1000) }}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-content>Crit Rate:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ creature.criticalChance }}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-content>Crit Damage:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ creature.criticalDamage }}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-content>Accuracy:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ Math.round(creature.accuracy * 100) }}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-content>Resistance:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ Math.round(creature.resistance * 100) }}</v-list-tile-content>
        </v-list-tile>
      </v-list>

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
    SpellListItem,
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
