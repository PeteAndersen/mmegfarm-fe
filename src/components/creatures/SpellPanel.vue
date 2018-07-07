<template>
  <v-card>
    <v-card-title primary-title class="pb-1">
      <v-avatar class="mr-2">
        <img :src="`/static/spells/${spell.image}.png`" />
      </v-avatar>
      <span class="headline">{{ spell.title }}</span>
    </v-card-title>

    <v-divider />
    
    <v-list dense class="pt-1 pb-1">
      <v-list-tile v-for="(effect, index) in effects" :key="index">
        <v-list-tile-avatar v-if="effect.effect.icon" tile>
          <img :src="`static/effects/${effect.effect.icon}.png`" />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ effect.effect.title }}</v-list-tile-title>
          <v-list-tile-sub-title>
            <span v-for="(param, paramIdx) in effect.params" :key="paramIdx">
              {{ param }}<template v-if="paramIdx < effect.params.length - 1"> - </template>
            </span>
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-divider />
    
    <v-card-text>{{ spell.description }}</v-card-text>

    <v-divider />

    <v-card-text>
      <h4 class="pt-1 pb-1">Upgrades</h4>
      <ol>
        <li v-for="(upgrade, index) in spell.upgrades" :key="index">
          {{ upgrade.description }} 
          <template v-if="upgrade.is_percentage">
            +{{ Math.round(upgrade.amount * 100) }}%
          </template>
          <template v-else>
            <template v-if="upgrade.attribute === 'turns'">-</template>
            <template v-else>+</template>
            {{ upgrade.amount }}
          </template>
        </li>
      </ol>
    </v-card-text>
  </v-card>
</template>

<script>
  import { effect_definitions } from '@/services/creatures';

  export default {
    name: "SpellPanel",
    props: {
      spell: {
        type: Object,
        required: true
      }
    },
    computed: {
      effects() {
        const effects = this.spell.effects.reduce((accum, effect) => {
          const definition = effect_definitions[effect.effect];

          if (definition && definition.icon) {
            accum.push({
              ...effect,
              effect: definition,
              params: Object.entries(effect.params).map(param => {
                // TODO: Better assembly of params. Create a template for each type of effect and pass all params into it at once. 
                // Example: Aura of Justice is Shield - 1 turn - 15% - self Max HP
                // Should be assembled as 1 Turn - 15% of Self Max HP
                console.log(param);
                switch (param[0]) {
                  case 'turns':
                    return `${param[1]} Turn${param[1] > 1 ? 's' : ''}`;
                  case 'amount':
                  case 'percentage':
                    return `${Math.round(param[1] * 100)}%`;
                  case 'prob':
                    return `${Math.round(param[1] * 100)}% Chance`;
                  case 'baseStat':
                    return 
                  default:
                    console.error(`Unknown effect template string ${param[0]}`)
                    return `${param[0]}: ${param[1]}`
                }
              })
            });
          }
          return accum;
        }, []);
        console.log(effects);
        return effects;
      }
    }
  }
</script>

<style scoped>
ol {
}
</style>