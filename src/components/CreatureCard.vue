<template>
  <v-flex xs12 md6 lg3 fill-height>
    <v-card>
      <v-card-title>
        <v-avatar>
          <img :src="creatureAvatarUrl" />
        </v-avatar>
        {{creature.name}} - {{creature.element}}
      </v-card-title>
      <v-card-text>{{creature.rank}} Stars</v-card-text>
      <v-card-text>{{creature.lore}}</v-card-text>
      <v-flex>
        <Spell v-for="spell in creature.spells" :key="spell.id" :spell="spell" />
      </v-flex>
    </v-card>
  </v-flex>
</template>

<script>
  import Spell from '@/components/Spell.vue';
  import slugify from 'slugify';

  export default {
    name: "CreatureCard",
    props: {
      creature: {
        type: Object,
        required: true,
      }
    },
    computed: {
      creatureAvatarUrl() {
        return `/static/creatures/portraits/${slugify(this.creature.name.toLowerCase())}-${slugify(this.creature.element)}.png`;
      }
    },
    components: {
      Spell
    }
  }
</script>

<style scoped>
</style>