<template>
  <div v-if="dungeon && level">
    <v-layout>
      <h1>{{ dungeon.name }} {{ levelIdx }}<template v-if="level.difficulty"> - {{ level.difficulty }}</template></h1>
      
      <v-spacer></v-spacer>
      
      <div>
        <v-avatar>
          <img src="/static/currency/Energy.png" />
        </v-avatar>
        {{ level.energy_cost }}
      </div>
    </v-layout>

    <v-layout>
      <v-btn-toggle v-if="scenario" class="mr-3">
        <v-btn 
          flat
          :to="dungeonUrl({difficulty: 'normal'})"
        >
          Normal
        </v-btn>
         <v-btn 
          flat
          :to="dungeonUrl({difficulty: 'advanced'})"
        >
          Advanced
        </v-btn>
         <v-btn 
          flat
          :to="dungeonUrl({difficulty: 'nightmare'})"
        >
          Nightmare
        </v-btn>
      </v-btn-toggle>

      <v-btn-toggle>
        <v-btn
          flat
          v-for="l in this.numLevels"
          :key="l"
          :to="dungeonUrl({levelIdx: l})"
        >
          {{ l }}
        </v-btn>
      </v-btn-toggle>
    </v-layout>

    <v-layout>
      <v-flex xs12>
        <Reward :reward="xpReward" />
        <Reward :reward="manaReward" />
      </v-flex>
      <RewardGroup v-for="(rewards, idx) in rewardGroups" :key="idx" :rewards="rewards" />
    </v-layout>

    <v-container grid-list-md fluid class="pa-0">
      <template v-if="wave" v-for="(wave, idx) in level.waves">
        <Wave :key="wave.id" :wave="wave" :idx="idx + 1" />
      </template>
    </v-container>
  </div>
</template>

<script>
import Wave from "./components/Wave";
import Reward from "./components/Reward";
import RewardGroup from "./components/RewardGroup";
import { scenario_difficulties } from "@/services/dungeons";

export default {
  name: "DungeonDetail",
  props: {
    id: {
      type: Number,
      required: true
    },
    slug: { type: String },
    levelIdx: { type: Number, required: true },
    scenario: { type: Boolean, default: false },
    difficulty: { type: String, required: false }
  },
  components: {
    Wave,
    Reward,
    RewardGroup
  },
  created() {
    // Duplicated here because watch: immediate does not have guaranteed access to all props on component creation
    this.getLevelDetail({ dungeonId: this.id, levelIdx: this.levelIdx });
  },
  watch: {
    levelIdx: {
      handler: async function(val) {
        await this.getLevelDetail({
          dungeonId: this.id,
          levelIdx: val,
          scenario: this.scenario
        });
      }
    },
    id: {
      handler: async function(val) {
        await this.getLevelDetail({
          dungeonId: val,
          levelIdx: this.levelIdx
        });
      }
    },
    difficulty: {
      handler: async function() {
        await this.getLevelDetail({
          dungeonId: this.id,
          levelIdx: this.levelIdx
        });
      }
    }
  },
  computed: {
    dungeon() {
      return this.$store.getters["dungeons/dungeon"](this.id);
    },
    level() {
      return this.$store.getters["dungeons/level"](
        this.id,
        this.scenarioLevelIndex(this.levelIdx)
      );
    },
    numLevels() {
      return this.scenario ? 7 : this.dungeon.levels.length;
    },
    manaReward() {
      if (this.level) {
        return this.level.rewards.find(reward => reward.type === "sc");
      }
    },
    xpReward() {
      if (this.level) {
        return this.level.rewards.find(reward => reward.type === "xp");
      }
    },
    rewardGroups() {
      if (this.level) {
        return this.level.rewards.filter(reward => reward.type === "dropGroup");
      }
    }
  },
  methods: {
    getLevelDetail(payload) {
      const { levelIdx } = payload;

      this.$store.dispatch("dungeons/getLevelDetail", {
        ...payload,
        levelIdx: this.scenarioLevelIndex(levelIdx)
      });
    },
    scenarioLevelIndex(levelIdx) {
      // Get the correct index in the level array for scenarios
      if (this.scenario) {
        const offset = 7 * scenario_difficulties.indexOf(this.difficulty);
        return levelIdx - 1 + offset;
      } else {
        return levelIdx - 1;
      }
    },
    dungeonUrl(params) {
      return {
        name: this.$route.name,
        params: {
          ...this.$route.params,
          ...params
        }
      };
    }
  }
};
</script>

<style scoped>
</style>
