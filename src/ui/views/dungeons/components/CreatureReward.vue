<template>
  <v-layout column text-xs-center>
    <v-flex v-if="reward.probability" class="mb-2">{{Math.round(reward.probability * 100)}}%</v-flex>
    <template v-for="creature in creatures" v-if="creature">
      <v-flex :key="creature.id">
        <CreatureAvatar :creature="creature" />
      </v-flex>
      <v-flex :key="creature.name">{{creature.name}}</v-flex>
    </template>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CreatureAvatar from "@/ui/components/creatures/CreatureAvatar";

export default {
  name: "CreatureReward",
  props: {
    reward: {
      type: Object,
      required: true
    }
  },
  components: {
    CreatureAvatar
  },
  methods: {
    ...mapActions("menagerie", ["getCreature"]),
    ...mapGetters("menagerie", ["creatureById"])
  },
  computed: {
    creatures() {
      return this.reward.value.map(cId => this.creatureById()(cId));
    }
  },
  created() {
    this.reward.value.forEach(cId => this.getCreature(cId));
  }
};
</script>

<style scoped>
</style>
