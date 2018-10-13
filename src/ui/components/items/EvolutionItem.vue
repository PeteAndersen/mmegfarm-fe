<template>
  <v-layout column>
    <v-flex v-if="withText" text-xs-center>{{textDescription}}</v-flex>
    <ItemBase :image="imgUrl" :quantity="quantity" />
  </v-layout>
  
</template>

<script>
import { titleCase } from "@/services/utils";
import { evolution_materials } from "@/services/items";
import ItemBase from "./ItemBase";

export default {
  props: {
    item: {
      type: String,
      required: true,
      validator(value) {
        return Object.keys(evolution_materials).includes(value);
      }
    },
    size: {
      type: String,

      required: true
    },
    quantity: Number,
    withText: Boolean
  },
  components: {
    ItemBase
  },
  computed: {
    imgUrl() {
      return `/static/currency/${
        evolution_materials[this.item][this.size].image
      }`;
    },
    textDescription() {
      return titleCase(`${this.size} ${this.item}`);
    }
  }
};
</script>

<style scoped>
</style>
