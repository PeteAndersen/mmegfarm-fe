<template>
  <v-flex v-bind="{ [`${colsize}`]: true }">
    <v-layout column align-content-center>
      <v-flex class="pb-0 stat">{{nice_name}}</v-flex>
      <v-flex class="pt-0">
        <v-avatar size="2em">
          <img :src="statIcon" />
        </v-avatar>
        {{value}}<template v-if="percentage_stat">%</template>
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
.stat {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
