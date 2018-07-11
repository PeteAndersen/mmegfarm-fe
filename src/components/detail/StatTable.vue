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
      headers: ["Stars", "HP", "ATK", "DEF"]
    };
  },
  computed: {
    stats: function() {
      const stat_table = [];
      
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
          defense
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
table {
  width: 100%;
}
</style>
