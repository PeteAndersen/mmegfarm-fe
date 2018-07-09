<template>
  <v-container>
    <v-layout>
      <v-flex>
        <CreatureAvatar :creature="creature" />
      </v-flex>
      {{slug}}
      {{creature}}
    </v-layout>
  </v-container>
</template>

<script>
import api from "@/api";
import CreatureAvatar from '@/components/creatures/CreatureAvatar'

export default {
  name: "CreatureDetail",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  components: {
    CreatureAvatar
  },
  data() {
    return { creature: null };
  },
  created() {
    this.getCreature(this.slug);
  },
  methods: {
    getCreature: async function() {
      const {
        data: { results }
      } = await api.get("/creatures/", {
        params: {
          slug: this.slug
        }
      });

      this.creature = results[0];
    }
  }
};
</script>

<style scoped>
</style>
