<template>
  <v-container>
    <v-card>
      <v-subheader>July 18, 2018</v-subheader>
      <v-card-title>
        <ul>
          <li>Internal updates. You may notice switching between creatures is quite a bit faster.</li>
          <li>Fixed display of some "Stat Bonus During Attack" effects.</li>
        </ul>
      </v-card-title>

      <v-subheader>July 15, 2018</v-subheader>
      <v-card-title>
        <ul>
          <li>Fixed how stat bonuses during usage of a spell are displayed. There is now an extra effect "Stat Bonus During Attack" in the list with the amount and stat which are increased.</li>
        </ul>
      </v-card-title>

      <v-subheader>July 12, 2018</v-subheader>
      <v-card-title>
        <ul>
          <li>Made 'Evolved Only' filter more restrictive to only return final stages of evolutions.</li>
        </ul>
      </v-card-title>

      <v-subheader>July 11, 2018</v-subheader>
      <v-card-title>
        <ul>
          <li>Added details of spell random effects to API.</li>
          <li>Added conditional triggers for spell effects to API.</li>
          <li>Correctly display random chance effects in spell descriptions (i.e. <router-link to="/creature/64-mountain-einherjar-earth/">Mountain Einherjar</router-link> spell 1, or <router-link to="/creature/288-wolf-cub-earth/">Earth Wolf Cub</router-link> spell 2)</li>
          <li>Added display of conditional triggers for spell effects (on Critical Hit, if target has debuff, etc)</li>
          <li>Added a filter for evolved/unevolved</li>
        </ul>
      </v-card-title>

      <v-divider />

      <v-subheader>July 10, 2018</v-subheader>
      <v-card-title>
        <ul>
          <li>
            Added detailed creature pages
            <ul>
              <li>Evolution progression</li>
              <li>Stats at all star rankings</li>
            </ul>
          </li>
          <li>Properly encoded characters in filter permalink</li>
          <li>Added generic spell category icons</li>
          <li>Updated several turn-based spell upgrades to indicate +/- correctly</li>
          <li>Keep a 1x multiplier at the front of spell multiplier formulas for clarity (e.g "1 * ATK" instead of "ATK"</li>
        </ul>
      </v-card-title>
        
      <v-divider />

      <v-subheader>July 7, 2018</v-subheader>
      <v-card-title>
        <ul>
          <li>Released!</li>
        </ul>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Changelist"
};
</script>

<style scoped>
</style>
