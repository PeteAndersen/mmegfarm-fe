<template>
  <div>
    {{id}}
    {{creature}}
  </div>
</template>

<script>
  import { api_root } from '@/api';
  export default {
    name: "CreatureDetail",
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data() {
      return {creature: null}
    },
    created() {
      this.getCreature(this.id);
    },
    methods: {
      getCreature: async function(id) {
        const url = `${api_root}/creatures/${id}.json`;
        
        try {
          const res = await fetch(url);
          this.creature = await res.json();
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
</script>

<style scoped>
</style>