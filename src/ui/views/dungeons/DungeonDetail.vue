<template>
  <div>
    {{id}} {{ slug }}
    {{ dungeon }}
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "DungeonDetail",
  props: {
    id: {
      type: Number,
      required: true
    },
    slug: { type: String }
  },
  watch: {
    id: {
      handler: async function(val) {
        // Update dungeon in state when id changes
        await this.getDungeonDetail(val);
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters('dungeons', [
      'dungeon'
    ]),
  },
  methods: {
    ...mapActions('dungeons', [
      'getDungeonDetail'
    ])
  }
};
</script>

<style scoped>
</style>
