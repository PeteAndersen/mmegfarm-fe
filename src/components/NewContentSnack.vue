<template>
  <v-snackbar color="cyan darken-4" v-model="visible" top vertical :timeout=0>
    A new version of mm-eg.farm has been loaded. Refresh to activate it.
    <v-btn flat @click="visible = false">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "NewContentSnack",
  data() {
    return { visible: false };
  },
  created() {
    window.addEventListener("newContentAvailable", () => {
      this.visible = true;
    });
  }
};
</script>

<style scoped>
</style>
