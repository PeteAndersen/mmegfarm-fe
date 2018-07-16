<template>
  <v-card height="100%">
    <v-card-title primary-title class="pb-1 pt-2">
      <v-avatar class="mr-2">
        <img :src="`/static/spells/${spell.image}.png`" />
      </v-avatar>
      <span class="headline">
        <template v-if="showSlot">{{ spell.slot }}. </template>{{ spell.title }}
      </span>
      
      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <v-avatar slot="activator">
          <img :src="`/static/spells/${spell.type_image}.png`" />
        </v-avatar>
        {{spellTypeIcon}}
      </v-tooltip>
      
    </v-card-title>

    <v-divider />

    <v-card-text v-if="attacks.length" class="pt-1 pb-1">
      <template v-for="(attack, index) in attacks">
        <div :key="index">
          {{ attack.target }}<span v-if="attack.probability && attacks.length > 1"> ({{ Math.round(attack.probability * 100) }}% Chance)</span>:
          {{ attack.formula }}
        </div>
      </template>
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
            <!-- TODO: Construct this sub title in a method using an array of strings joined by ' - ' -->
            {{ effect.target }}<template v-if="effect.params.length || effect.probability || effect.condition.length"> - </template>
            <span v-if="effect.probability">{{ Math.round(effect.probability * 100) }}% Chance<template v-if="effect.params.length || effect.condition.length"> - </template> </span>
            <span v-if="effect.condition">If {{ effect.condition }}<template v-if="effect.params.length"> - </template> </span>
            <span v-for="(param, paramIdx) in effect.params" :key="paramIdx">
              {{ param }}
              <template v-if="paramIdx < effect.params.length - 1">- </template>
            </span>
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-divider v-if="effects.length"/>
    
    <v-card-text class="pt-1 pb-1" v-html="description"></v-card-text>
    <v-card-text v-if="spell.turns > 1" class="pt-1 pb-1">Cooldown: {{ spell.turns }} turns</v-card-text>

    <v-divider />

    <v-card-text class="pt-1" v-if="spell.upgrades.length">
      <h4 class="pb-1">Upgrades</h4>
      <ol>
        <li v-for="(upgrade, index) in spell.upgrades" :key="index">
          {{ upgrade.description }} 
          <template v-if="upgrade.is_percentage">
            +{{ Math.round(upgrade.amount * 100) }}%
          </template>
          <template v-else>
            <template v-if="upgrade.amount > 0">+</template>{{ upgrade.amount }}
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
  stat_definitions,
  condition_definitions,
  parse_description
} from "@/services/creatures";
import { titleCase } from "@/services/utils";

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
    spellTypeIcon() {
      return titleCase(
        this.spell.type_image.replace("spell-icon-", "").replace(/-/g, " ")
      );
    },
    attacks() {
      const attack_effects = this.spell.effects
        .filter(effect => {
          const is_number = !isNaN(parseFloat(effect.params.amount));
          return effect.effect === "attack" && is_number;
        })
        .map(eff => ({
          ...eff,
          target: target_definitions[eff.target],
          formula: multiplier_formula(eff.params)
        }));

      return attack_effects;
    },
    effects() {
      const effects = this.spell.effects.reduce((accum, effect) => {
        if (effect.effect === "attack") {
          if (effect.params.incStat && effect.params.incStat !== "attack") {
            // Arbitrary stat bonus
            let sep_bonus_amount = effect.params.incAmount;
            let units = "";
            if (effect.params.incStat !== "attack") {
              if (effect.params.incStat === "criticalChance") {
                sep_bonus_amount *= 100;
                units = "%";
              }
            }
            const stat_boost = `${
              sep_bonus_amount > 0 ? "+" : ""
            }${sep_bonus_amount}${units} ${
              stat_definitions[effect.params.incStat]
            }`;

            accum.push({
              ...effect,
              target: "Self",
              effect: { title: "Stat Bonus During Attack" },
              condition: effect.condition
                .map(cond => condition_definitions[cond])
                .join(", "),
              params: [stat_boost]
            });
          } else {
            // Standard attack scaling - will be displayed in attacks computed property
            return accum;
          }
        } else {
          const definition = effect_definitions[effect.effect];

          if (definition) {
            accum.push({
              ...effect,
              effect: definition,
              target: target_definitions[effect.target],
              condition: effect.condition
                .map(cond => condition_definitions[cond])
                .join(", "),
              params: Object.entries(effect.params)
                .filter(param => Boolean(param[0]))
                .reduce((accum, param) => {
                  // TODO: Better assembly of params. Create a template for each type of effect and pass all params into it at once.
                  // Example: Aura of Justice is Shield - 1 turn - 15% - self Max HP
                  // Should be assembled as 1 Turn - 15% of Self Max HP
                  switch (param[0]) {
                    case "turns":
                      accum.push(`${param[1]} Turn${param[1] > 1 ? "s" : ""}`);
                      break;
                    case "amount":
                      if (param[1] < 1) {
                        accum.push(`${Math.round(param[1] * 100)}%`);
                      } else {
                        accum.push(`${param[1]}`);
                      }
                      break;
                    case "percentage":
                      accum.push(`${Math.round(param[1] * 100)}%`);
                      break;
                    case "prob":
                      accum.push(`${Math.round(param[1] * 100)}% Chance`);
                      break;

                    // Ignored stats list here
                    case "baseStat":
                    case "animation":
                      break;
                    default:
                      console.error(
                        `Unknown effect template string ${param[0]}`
                      );
                  }

                  return accum;
                }, [])
            });
          }
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
