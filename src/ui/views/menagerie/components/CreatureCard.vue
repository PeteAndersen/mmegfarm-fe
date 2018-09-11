<template>
  <v-flex sm12 md6 :lg6="$store.state.filterDrawer" :lg4="!$store.state.filterDrawer" xl3>
    <v-card height="100%" :to="`/creature/${this.creature.slug}`" hover>
      <v-card-title>
        <v-layout>
          <CreatureAvatar :creature="creature" />
          <v-spacer />
          <h2>{{creature.name}}</h2>
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
  name: "CreatureCard",
  props: {
    creature: {
      type: Object,
      required: true
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
    },
    spellColSize() {
      return this.creature.spells.length === 3 ? 4 : 6;
    },
    hasTwoFirstSpells() {
      const slot_1_spell_count = this.creature.spells.reduce((accum, spell) => {
        if (spell.slot === 1) {
          accum++;
        }
        return accum;
      }, 0);

      return slot_1_spell_count > 0;
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
