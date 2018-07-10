<template>
  <v-card height="100%">
    <v-card-title primary-title class="pb-1 pt-2">
      <v-avatar class="mr-2">
        <img :src="`/static/spells/${spell.image}.png`" />
      </v-avatar>
      <span class="headline">
        <template v-if="showSlot">{{ spell.slot }}. </template>{{ spell.title }}
      </span>
    </v-card-title>

    <v-divider />

    <v-card-text v-if="attack" class="pt-1 pb-1">
      {{ attack.target }}: {{ attack.formula }}
    </v-card-text>

    <v-divider />
    
    <v-list v-if="effects.length" dense class="pt-1 pb-1">
      <v-list-tile v-for="(effect, index) in effects" :key="index">
        <v-list-tile-avatar v-if="effectHasIcon" tile>
          <img v-if="effect.effect.icon" :src="`/static/effects/${effect.effect.icon}.png`" />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ effect.effect.title }}</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ effect.target }}<template v-if="effect.params.length"> - </template>
            <span v-for="(param, paramIdx) in effect.params" :key="paramIdx">
              {{ param }}<template v-if="paramIdx < effect.params.length - 1"> - </template>
            </span>
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-divider v-if="effects.length"/>
    
    <v-card-text class="pt-1 pb-1" v-html="description"></v-card-text>
    <v-card-text v-if="spell.turns > 1" class="pt-1 pb-1">Cooldown: {{ spell.turns }} turns</v-card-text>

    <v-divider />

    <v-card-text class="pt-1">
      <h4 class="pb-1">Upgrades</h4>
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
import {
  multiplier_formula,
  target_definitions,
  effect_definitions,
  parse_description
} from "@/services/creatures";

export default {
  name: "SpellPanel",
  props: {
    spell: {
      type: Object,
      required: true
    },
    showSlot: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    description() {
      return parse_description(this.spell.description, this.spell.effects);
    },
    attack() {
      const attack_effect = this.spell.effects.find(
        effect => effect.effect === "attack"
      );

      if (attack_effect) {
        return {
          ...attack_effect,
          target: target_definitions[attack_effect.target],
          formula: multiplier_formula(attack_effect.params)
        };
      }
    },
    effects() {
      const effects = this.spell.effects.reduce((accum, effect) => {
        if (effect.effect === "attack") {
          return accum;
        }

        const definition = effect_definitions[effect.effect];

        if (definition) {
          accum.push({
            ...effect,
            effect: definition,
            target: target_definitions[effect.target],
            params: Object.entries(effect.params)
              .filter(param => Boolean(param[0]))
              .map(param => {
                // TODO: Better assembly of params. Create a template for each type of effect and pass all params into it at once.
                // Example: Aura of Justice is Shield - 1 turn - 15% - self Max HP
                // Should be assembled as 1 Turn - 15% of Self Max HP
                switch (param[0]) {
                  case "turns":
                    return `${param[1]} Turn${param[1] > 1 ? "s" : ""}`;
                  case "amount":
                    if (param[1] < 1) {
                      return `${Math.round(param[1] * 100)}%`;
                    } else {
                      return `${param[1]}`;
                    }
                  case "percentage":
                    return `${Math.round(param[1] * 100)}%`;
                  case "prob":
                    return `${Math.round(param[1] * 100)}% Chance`;
                  case "baseStat":
                    return;
                  default:
                    console.error(`Unknown effect template string ${param[0]}`);
                    return "";
                }
              })
          });
        }

        return accum;
      }, []);

      return effects;
    },
    effectHasIcon() {
      // If no effects have an icon, the v-avatar element will not be displayed
      return this.effects.reduce(
        (hasIcon, effect) => effect.effect.icon || hasIcon,
        false
      );
    }
  }
};
</script>

<style scoped>
</style>
