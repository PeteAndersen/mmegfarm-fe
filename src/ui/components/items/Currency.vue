<template>
  <v-layout column>
    <v-flex v-if="withText" text-xs-center>{{textDescription}}</v-flex>
    <ItemBase :image="imgUrl" :quantity="quantity" />
  </v-layout>
</template>

<script>
import { currencies } from "@/services/items";
import ItemBase from "./ItemBase";

export default {
  props: {
    currency: {
      type: String,
      validator(value) {
        return Object.keys(currencies).includes(value);
      }
    },
    quantity: Number,
    withText: Boolean
  },
  components: {
    ItemBase
  },
  computed: {
    imgUrl() {
      return `/static/currency/${currencies[this.currency].image}`;
    },
    textDescription() {
      return currencies[this.currency].description;
    }
  }
};
</script>

<style scoped>
</style>
