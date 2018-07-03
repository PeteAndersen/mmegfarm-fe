<template>
  <v-flex xs12 md6 lg3>
    <v-card height="100%" :href="creatureDetailUrl">
      <v-card-title>
        <v-layout>
          <CreatureAvatar :creature="creature" />
          <v-spacer />
          <h2>{{creature.name}}</h2>
          <v-spacer />
          <v-avatar>
            <img :src="archetypeImage"/>
          </v-avatar>
          <v-avatar>
            <img :src="elementImage"/>
          </v-avatar>
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
      <v-layout row class="spells pb-2">
        <Spell v-for="spell in creature.spells" :spell="spell" :key="spell.id"/>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
import CreatureAvatar from "@/components/creatures/CreatureAvatar.vue";
import Spell from "@/components/creatures/Spell.vue";
import Stat from "@/components/creatures/Stat.vue";

export default {
  name: "CreatureCard",
  props: {
    creature: {
      type: Object,
      required: true
    }
  },
  computed: {
    creatureDetailUrl() {
      return `/creature/${this.creature.slug}`;
    },
    archetypeImage() {
      return `/static/creatures/icon-${this.creature.archetype}.png`;
    },
    elementImage() {
      return `/static/creatures/icon-${this.creature.element}.png`;
    },
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
  }
};
</script>

<style scoped>
.spells {
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
