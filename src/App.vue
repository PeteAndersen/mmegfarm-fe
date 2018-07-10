<template>

  <v-app id="inspire" dark>
    <div class="loading-indicator">
      <v-progress-linear :active="loading" :indeterminate="true" class="ma-0"></v-progress-linear>
    </div>

    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>mm-eg.farm</v-toolbar-title>
    </v-toolbar>
    
    <v-footer app fixed>
      <p class="text-xs-center">&copy; 2018 Porksmash. Creature icons are &copy; Ubisoft</p>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters(["loading"])
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.loading-indicator {
  position: fixed;
  top: 64px;
  left: 0;
  width: 100%;
}
</style>
