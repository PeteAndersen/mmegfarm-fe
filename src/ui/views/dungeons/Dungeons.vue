<template>
  <v-container grid-list-sm>
    <DungeonNavigator />
    <router-view></router-view>
  </v-container>
</template>

<script>
import DungeonNavigator from "./components/DungeonNavigator";

export default {
  name: "DungeonList",
  components: {
    DungeonNavigator
  }
};
</script>

<style scoped>
</style>
