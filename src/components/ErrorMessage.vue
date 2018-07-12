<template>
  <v-alert
      v-model="$store.state.error"
      type="error"
      dismissible
    >
      Sorry! An error occurred and I was unable to load your request.
    </v-alert>
</template>

<script>
export default {
  name: "ErrorMessage"
};
</script>

<style scoped>
</style>
