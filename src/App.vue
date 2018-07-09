<template>
  <v-app id="inspire" dark>
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
  methods: {
    toggleDrawer() {
      this.$store.commit("filterDrawer", !this.$store.getters.filterDrawer);
    }
  },
  computed: {
    ...mapGetters(["filterDrawer"])
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
</style>
