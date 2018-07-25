<template>
  <v-list-tile>
    <v-list-tile-avatar class='no-min-width'>
      <img :src="statIcon">
    </v-list-tile-avatar>
    
    <v-list-tile-content class="stat mr-1">{{ nice_name }}</v-list-tile-content>
    
    <v-list-tile-content class="align-end">
      {{ value }}<template v-if="percentage_stat">%</template>
    </v-list-tile-content>
  </v-list-tile>
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
  name: "DenseStat",
  props: {
    stat: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
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
.no-min-width {
  min-width: auto;
}
.stat {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
