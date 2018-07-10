<template>
  <v-container v-if="creature !== null" class="pt-0">
    <v-toolbar>
      <v-toolbar-items>
        <v-btn to="/">
          <v-icon>arrow_back</v-icon> Back
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

    <v-layout>
      <v-flex xs12 md6>
        <v-container>
          <v-layout>
            <h1>{{ creature.name }}</h1>

            <v-spacer />

            <v-tooltip bottom>
              <v-avatar slot="activator">
                <img :src="`/static/creatures/icon-${creature.archetype}.png`"/>
              </v-avatar>
              {{titleCase(creature.archetype)}}
            </v-tooltip>
            <v-tooltip bottom>
              <v-avatar slot="activator">
                <img :src="`/static/creatures/icon-${creature.element}.png`"/>
              </v-avatar>
              {{titleCase(creature.element)}}
            </v-tooltip>
          </v-layout>
          <CreatureAvatar class="ma-3" :creature="creature" />
        </v-container>
      <v-layout>
        <v-btn>
          <creature-avatar :creature="creature" size="2em" :stars="false"/>
          Evolves From
        </v-btn>
        <v-btn large>
          Evolves To
          <creature-avatar :creature="creature" size="2em" :stars="false"/>
        </v-btn>
      </v-layout>
      </v-flex>
      <v-flex xs12 md6>
        <v-container grid-list-lg>
          <h2>Skills</h2>
          <v-layout row>
            <v-flex xs12 v-bind="{ [`md-${12 / spellSlotOne.length}`]: true }" v-for="(spell, index) in spellSlotOne" :key="index">
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
    SpellPanel
  },
  watch: {
    slug: function(val) {
      // Update creature in state when slug changes
      this.getCreature(val);
    }
  },
  created: async function() {
    this.getCreature(this.slug);
  },
  methods: {
    ...mapActions(["getCreature"]),
    titleCase
  },
  computed: {
    ...mapGetters(["creature", "family"]),
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
</style>
