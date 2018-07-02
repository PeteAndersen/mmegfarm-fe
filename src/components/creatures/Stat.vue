<template>
  <v-flex xs3>
    <v-tooltip bottom>
      <div slot="activator">
        <v-avatar size="2em">
          <img :src="statIcon" />
        </v-avatar>
        {{value}}
        <span v-if="percentage_stat">%</span>
      </div>
      <span>{{nice_name}}</span>  
    </v-tooltip>
  </v-flex>
  
</template>

<script>
  const percentage_stats = ['crit-rate', 'crit-dmg', 'resistance', 'accuracy']
  const nice_names = {
    'hp': 'HP',
    'atk': 'Attack',
    'def': 'Defense',
    'speed': 'Speed',
    'crit-rate': 'Critical Hit Rate',
    'crit-dmg': 'Critical Hit Damage',
    'resistance': 'Resistance',
    'accuracy': 'Accuracy',
  }

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
      }
    },
    computed: {
      statIcon: function() {
        return `/static/creatures/icon-stats-${this.stat}.png`
      },
      percentage_stat: function() {
        return percentage_stats.includes(this.stat);
      },
      nice_name: function() {
        return nice_names[this.stat];
      }
    }
  }
</script>

<style scoped>
</style>