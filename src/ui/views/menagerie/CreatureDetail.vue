<template>
  <v-container fluid v-if="creature" class="pt-0">
    <!-- Main Toolbar and Family -->
    <v-toolbar>
      <v-toolbar-items>
        <v-btn to="/">
          <v-icon left>arrow_back</v-icon> Menagerie
        </v-btn>
      </v-toolbar-items>

      <v-spacer v-bind="{'slot': $vuetify.breakpoint.xsOnly ? 'extension' : 'default' }" />
      
      <v-toolbar-items
        v-bind="{'slot': $vuetify.breakpoint.xsOnly ? 'extension' : 'default' }"
      >
        <v-btn :icon="$vuetify.breakpoint.smAndDown" v-for="fam in family" :key="fam.id" :to="`/creature/${fam.slug}`" flat>
          <v-avatar tile>
            <img :src="`/static/creatures/icon-${fam.element}.png`" />
          </v-avatar>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-layout row wrap>
      <v-flex xs12 md6>
        <DetailPanel :creature="creature" />

        <v-container class="pt-0">
          <!-- Stat Table -->
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
  <NotFound v-else-if="!loading" />
</template>

<script>
import { createNamespacedHelpers } from "vuex";

import { titleCase } from "@/services/utils";
import CreatureAvatar from "@/ui/components/creatures/CreatureAvatar";
import SpellPanel from "@/ui/components/creatures/SpellPanel";
import NotFound from "@/ui/components/404.vue";
import EvolveCard from "./components/EvolveCard";
import DetailPanel from "./components/DetailPanel";
import StatTable from "./components/StatTable";
import BigStat from "./components/BigStat";

const { mapActions, mapGetters } = createNamespacedHelpers("menagerie");

export default {
  name: "CreatureDetail",
  props: {
    id: {
      type: Number,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      evolves_from: null,
      evolves_to: null
    };
  },
  components: {
    CreatureAvatar,
    SpellPanel,
    DetailPanel,
    EvolveCard,
    StatTable,
    BigStat,
    NotFound
  },
  watch: {
    id: {
      handler: async function(val) {
        // Update creature in state when slug changes
        await this.getCreatureDetail(val);

        this.$vuetify.goTo(0, {
          duration: 0
        });
      },
      immediate: true
    }
  },
  created: async function() {},
  methods: {
    ...mapActions(["getCreatureDetail"]),
    titleCase
  },
  computed: {
    ...mapGetters(["creature", "loading", "family"]),
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
