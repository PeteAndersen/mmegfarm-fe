<template>
  <div>
    {{slug}}
    {{creature}}
  </div>
</template>

<script>
  import api from '@/api';
  export default {
    name: "CreatureDetail",
    props: {
      slug: {
        type: String,
        required: true
      }
    },
    data() {
      return {creature: null}
    },
    created() {
      this.getCreature(this.slug);
    },
    methods: {
      getCreature: async function(id) {
        const {data: {results}} = await api.get('/creatures/', {
          params: {
          slug: this.slug
        }})

        this.creature = results[0];
      }
    }
  }
</script>

<style scoped>
</style>
