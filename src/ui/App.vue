<template>

  <v-app id="inspire" dark>
    <div class="loading-indicator">
      <v-progress-linear :active="$store.state.loading" :indeterminate="true" class="ma-0"></v-progress-linear>
    </div>

    <v-content>
      <ErrorMessage />
      
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    
    <v-toolbar app fixed clipped-left>
      <img src="/static/logo-img.png" height="38px" class="hidden-xs-only"/>
      <v-toolbar-title class="ml-2 hidden-xs-only">
        mm-eg.farm
      </v-toolbar-title>
      
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
    
    <v-footer >
      <v-spacer></v-spacer>
      &copy; 2018 Porksmash ᛫ Creature and Spell icons &copy; Ubisoft Entertainment
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
import ErrorMessage from "@/ui/components/ErrorMessage";

export default {
  name: "App",
  components: {
    ErrorMessage
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
