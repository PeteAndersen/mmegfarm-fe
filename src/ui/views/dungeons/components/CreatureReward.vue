<template>
  <div>
    <span v-if="reward.probability">{{Math.round(reward.probability * 100)}}%</span>
    <CreatureAvatar 
      v-for="creature in creatures"
      v-if="creature"
      :key="creature.id"
      :creature="creature"
    />
  </div>
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
