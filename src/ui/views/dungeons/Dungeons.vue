<template>
  <div>
    <DungeonNavigator />
    <router-view></router-view>
  </div>
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
