<template>
  <v-flex class="text-xs-center">
    <v-layout column align-content-center>
      <v-flex class="pb-0"><h4>{{nice_name}}</h4></v-flex>
      <v-flex class="pt-0">
        <h3>
          <v-avatar size="4em">
            <img :src="statIcon" />
          </v-avatar>{{value}}<span v-if="percentage_stat">%</span>
        </h3>
      </v-flex>
    </v-layout>
  </v-flex>
  
</template>

<script>
const percentage_stats = ["crit-rate", "crit-dmg", "resistance", "accuracy"];
const nice_names = {
  hp: "HP",
  atk: "Attack",
  def: "Defense",
  speed: "Speed",
  "crit-rate": "Crit Rate",
  "crit-dmg": "Crit Damage",
  resistance: "Resistance",
  accuracy: "Accuracy"
};

export default {
  name: "Stat",
  props: {
    stat: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    colsize: {
      type: String,
      default: "xs3"
    }
  },
  computed: {
    statIcon: function() {
      return `/static/creatures/icon-stats-${this.stat}.png`;
    },
    percentage_stat: function() {
      return percentage_stats.includes(this.stat);
    },
    nice_name: function() {
      return nice_names[this.stat];
    }
  }
};
</script>

<style scoped>
</style>
