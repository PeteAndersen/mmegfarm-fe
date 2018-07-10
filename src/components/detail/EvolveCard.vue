<template>
  <v-card :to="`/creature/${creature.slug}/`" flat hover>
    <v-card-title class="text-xs-center centered">
      <div>
        <h3 class="headline mb-0">Evolves {{ direction }}</h3>
        <div>
          <creature-avatar :creature="creature" size="3em" :stars="false"/>
          <small>{{ creature.name }}</small>
        </div>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
import CreatureAvatar from "@/components/creatures/CreatureAvatar";

export default {
  name: "EvolvesCard",
  props: {
    creature: {
      type: Object,
      required: true
    },
    direction: {
      type: String,
      required: true
    }
  },
  components: {
    CreatureAvatar
  }
};
</script>

<style scoped>
.v-card__title.centered > div {
  margin: auto;
}
</style>
