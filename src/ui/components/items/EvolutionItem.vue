<template>
  <ItemBase :image="imgUrl" :quantity="quantity" />
</template>

<script>
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
    quantity: Number
  },
  components: {
    ItemBase
  },
  computed: {
    imgUrl() {
      return `/static/currency/${
        evolution_materials[this.item][this.size].image
      }`;
    }
  }
};
</script>

<style scoped>
</style>
