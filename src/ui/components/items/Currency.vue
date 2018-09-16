<template>
  <ItemBase :image="imgUrl" :quantity="quantity" />
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
    quantity: Number
  },
  components: {
    ItemBase
  },
  computed: {
    imgUrl() {
      return `/static/currency/${currencies[this.currency].image}`;
    }
  }
};
</script>

<style scoped>
</style>
