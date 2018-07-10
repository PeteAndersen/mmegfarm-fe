<template>
  <table class="v-table">
    <thead>
      <tr>
        <th>Level</th>
        <th>
          HP
          <v-avatar size="2em">
            <img src="/static/creatures/icon-stats-hp.png" />
          </v-avatar>
        </th>
        <th>
          ATK
          <v-avatar size="2em">
            <img src="/static/creatures/icon-stats-atk.png" />
          </v-avatar>
        </th>
        <th>
          DEF
          <v-avatar size="2em">
            <img src="/static/creatures/icon-stats-def.png" />
          </v-avatar>
        </th>
        <th>
          SPD
          <v-avatar size="2em">
            <img src="/static/creatures/icon-stats-speed.png" />
          </v-avatar>
        </th>
        <th>
          Crit. Rate
          <v-avatar size="2em">
            <img src="/static/creatures/icon-stats-crit-rate.png" />
          </v-avatar>
        </th>
        <th>
          Crit. Damage
          <v-avatar size="2em">
            <img src="/static/creatures/icon-stats-crit-dmg.png" />
          </v-avatar>
        </th>
        <th>
          Accuracy
          <v-avatar size="2em">
            <img src="/static/creatures/icon-stats-accuracy.png" />
          </v-avatar>
        </th>
        <th>
          Resistance
          <v-avatar size="2em">
            <img src="/static/creatures/icon-stats-resistance.png" />
          </v-avatar>
        </th>
      </tr>
    </thead>
    <tbody class="text-xs-center">
      <tr v-for="rank in stats" :key="rank.rank">
        <td>
          {{rank.rank}}
          <v-avatar size="1.5em">
            <img src="/static/star-yellow-full.png" />
          </v-avatar>
          Level {{ max_level_for_rank(rank.rank) }}
        </td>
        <td>{{rank.hp}}</td>
        <td>{{rank.attack}}</td>
        <td>{{rank.defense}}</td>
        <td>{{rank.speed}}</td>
        <td>{{rank.criticalChance}}</td>
        <td>{{rank.criticalDamage}}</td>
        <td>{{rank.accuracy}}</td>
        <td>{{rank.resistance}}</td>
      </tr>
    </tbody>
    
  </table>
</template>

<script>
import { max_level_for_rank, calc_stat } from "@/services/creatures";

export default {
  name: "StatTable",
  props: {
    creature: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      headers: [
        "Stars",
        "HP",
        "ATK",
        "DEF",
        "SPD",
        "Crit Chance",
        "Crit Damage",
        "Accuracy",
        "Resistance"
      ]
    };
  },
  computed: {
    stats: function() {
      const stat_table = [];
      console.log(this.creature);
      for (let i = this.creature.rank; i <= 5; i++) {
        const hp = calc_stat(this.creature, "hp", this.creature.evoHp, i);
        const attack = calc_stat(
          this.creature,
          "attack",
          this.creature.evoAttack,
          i
        );
        const defense = calc_stat(
          this.creature,
          "defense",
          this.creature.evoDefense,
          i
        );
        stat_table.push({
          rank: i,
          hp,
          attack,
          defense,
          speed: Math.round(this.creature.speed * 1000),
          criticalChance: this.creature.criticalChance,
          criticalDamage: this.creature.criticalDamage,
          accuracy: Math.round(this.creature.accuracy * 100),
          resistance: Math.round(this.creature.resistance * 100)
        });
      }
      return stat_table;
    }
  },
  methods: {
    max_level_for_rank
  }
};
</script>

<style scoped>
</style>
