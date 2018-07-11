<template>
  <v-container fluid v-if="creature !== null" class="pt-0">
    <!-- Main Toolbar and Family -->
    <v-toolbar>
      <v-toolbar-items>
        <v-btn to="/">
          <v-icon left>arrow_back</v-icon> Menagerie
        </v-btn>
      </v-toolbar-items>

      <v-spacer />
      
      <v-toolbar-items>
        <v-btn  v-for="fam in family" :key="fam.id" :to="`/creature/${fam.slug}`">
          <v-avatar tile>
            <img :src="`/static/creatures/icon-${fam.element}.png`" />
          </v-avatar>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-layout row wrap>
      <v-flex xs12 md6>
        <DetailPanel :creature="creature"/>

        
        <v-container>
          <!-- Evolves To/From -->
          <v-layout row>
            <v-flex xs3 v-if="evolves_from">
              <EvolveCard :creature="evolves_from" direction="From"/>
            </v-flex>

            <v-spacer></v-spacer>

            <v-flex xs3 v-if="evolves_to">
              <EvolveCard :creature="evolves_to" direction="To"/>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container>
          <!-- Stat Table -->
          <h2>Stats</h2>
          <v-layout row wrap class="pt-2 pb-2">
            <BigStat stat="speed" :value="Math.round(creature.speed * 1000)" />
            <BigStat stat="crit-rate" :value="creature.criticalChance" />
            <BigStat stat="crit-dmg" :value="creature.criticalDamage" />
            <BigStat stat="accuracy" :value="Math.round(creature.accuracy * 100)" />
            <BigStat stat="resistance" :value="Math.round(creature.resistance * 100)" />
          </v-layout>
          <StatTable :creature="creature" />
        </v-container>
      </v-flex>
      
      <v-flex xs12 md6>
        <v-container grid-list-lg>
          <h2>Skills</h2>
          <v-layout row wrap>
            <v-flex md12 v-bind="{ [`lg${12 / spellSlotOne.length}`]: true }" v-for="(spell, index) in spellSlotOne" :key="index">
              <SpellPanel :spell="spell" showSlot />
            </v-flex>
          </v-layout>
          <v-layout column>
            <v-flex v-for="(spell, index) in otherSpells" :key="index">
              <SpellPanel :spell="spell" showSlot />
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import { titleCase } from "@/services/utils";
import CreatureAvatar from "@/components/creatures/CreatureAvatar";
import SpellPanel from "@/components/creatures/SpellPanel";
import EvolveCard from "@/components/detail/EvolveCard";
import DetailPanel from "@/components/detail/DetailPanel";
import StatTable from "@/components/detail/StatTable";
import BigStat from "@/components/creatures/BigStat";

export default {
  name: "CreatureDetail",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  components: {
    CreatureAvatar,
    SpellPanel,
    DetailPanel,
    EvolveCard,
    StatTable,
    BigStat
  },
  watch: {
    slug: function(val) {
      // Update creature in state when slug changes
      this.getCreature(val);
    }
  },
  created: async function() {
    this.getCreature(this.slug);
    this.$vuetify.goTo(0, {
      duration: 0
    });
  },
  methods: {
    ...mapActions(["getCreature"]),
    titleCase
  },
  computed: {
    ...mapGetters(["creature", "evolves_from", "evolves_to", "family"]),
    spellSlotOne() {
      if (this.creature) {
        return this.creature.spells.filter(s => s.slot === 1);
      }
    },
    otherSpells() {
      if (this.creature) {
        return this.creature.spells.filter(s => s.slot > 1);
      }
    }
  }
};
</script>

<style scoped>
.float.left {
  float: left;
}
</style>
