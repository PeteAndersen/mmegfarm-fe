<template>
  <v-container fluid class="pa-0 ma-0" align-content-start>
    <v-layout row align-baseline>
      <v-flex>
        Sort By
        <v-menu>
          <v-btn
            flat
            slot="activator"
          >
            {{ orderByText }}<v-icon>arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile
              dense
              v-for="(kvp, index) in Object.entries(sortByOptions)"
              :key="index"
              @click="setSortKey(kvp[0])"
            >
              <v-list-tile-title>{{ kvp[1] }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-menu>
          <v-btn
            flat
            slot="activator"
          >
          {{ orderDirectionText }}<v-icon>arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile
              dense
              v-for="(kvp, index) in Object.entries(sortDirectionOptions)"
              :key="index"
              @click="setSortDirection(kvp[0])"
            >
              <v-list-tile-title>{{ kvp[1] }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
      <v-spacer />
      <v-flex class="text-xs-right">
        {{ totalCreatures }} of {{ maxCreatureCount }} Creatures
      </v-flex>
    </v-layout>
    
    <CreatureList :creatures="creatureList" />
    <div class="text-xs-center">
      <v-pagination
        class="pt-2"
        v-model="page"
        :length="numPages"
        />
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import CreatureList from "@/components/CreatureList.vue";

export default {
  name: "Creatures",
  components: {
    CreatureList
  },
  data() {
    return {
      sortByOptions: {
        name: "Name",
        "element,name": "Element",
        "archetype,name": "Type",
        "rank,name": "Base Stars",
        maxLvlHp: "HP",
        maxLvlAttack: "ATK",
        maxLvlDefense: "DEF",
        speed: "SPD",
        criticalChance: "Crit. Chance",
        criticalDamage: "Crit. Dmg",
        accuracy: "Accuracy",
        resistance: "Resistance"
      },
      sortDirectionOptions: {
        "": "Ascending",
        "-": "Descending"
      }
    };
  },
  computed: {
    ...mapGetters([
      "creatureList",
      "totalCreatures",
      "maxCreatureCount",
      "numPages",
      "loading",
      "sortKey",
      "sortDirection"
    ]),
    page: {
      get: function() {
        return this.$store.getters.page;
      },
      set: function(newValue) {
        this.setPage(newValue);
      }
    },
    orderByText() {
      return this.sortByOptions[this.sortKey];
    },
    orderDirectionText() {
      return this.sortDirectionOptions[this.sortDirection];
    }
  },
  created() {
    this.populateCreatures();
  },
  watch: {
    loading: function(val) {
      if (val === false) {
        this.$vuetify.goTo(0, {
          duration: 0
        });
      }
    }
  },
  methods: {
    ...mapActions([
      "populateCreatures",
      "setPage",
      "nextPage",
      "prevPage",
      "orderBy",
      "orderDirection"
    ]),
    setSortKey(newValue) {
      this.orderBy(newValue);
    },
    setSortDirection(newValue) {
      this.orderDirection(newValue);
    }
  }
};
</script>

<style scoped>
</style>
