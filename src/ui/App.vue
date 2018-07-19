<template>

  <v-app id="inspire" dark>
    <div class="loading-indicator">
      <v-progress-linear :active="loading" :indeterminate="true" class="ma-0"></v-progress-linear>
    </div>

    <v-content>
      <ErrorMessage />
      
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>mm-eg.farm</v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <v-toolbar-items>
        <v-btn flat to="/">
          Menagerie
        </v-btn>
        <v-btn flat to="/dungeons/">
          Dungeons
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn to="/changelist/">
          Changelist
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    
    <v-footer app fixed>
      <v-spacer></v-spacer>
      &copy; 2018 Porksmash ᛫ Creature and Spell icons &copy; Ubisoft Entertainment
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import ErrorMessage from "@/ui/components/ErrorMessage";

export default {
  name: "App",
  components: {
    ErrorMessage
  },
  computed: {
    ...mapGetters("menagerie", ["loading"])
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
