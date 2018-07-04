<template>
  <v-navigation-drawer v-model="drawer" clipped fixed app>
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Filters
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-container>
      <v-form>
        <v-text-field label="Name"></v-text-field>
        <v-select
          label="Element"
          :items="elementOptions"
          multiple
          item-text="name"
          item-value="value"
        >
          <template slot="item" slot-scope="data">
            <v-list-tile-avatar>
              <img :src="data.item.icon" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
            </v-list-tile-content>
          </template>
        </v-select>
        <v-range-slider
          label="Nat. Stars"
          :max="4"
          :min="1"
          thumb-label
        />
        <v-select
          label="Type"
          :items="typeOptions"
          multiple
          item-text="name"
          item-value="value"
        />
        
        <v-divider />
        
        <v-select
          label="Buffs"
          :items="buffOptions"
          multiple
          item-text="title"
          item-value="spell"
        >
          <template slot="item" slot-scope="data">
            <v-list-tile-avatar>
              <img :src="data.item.icon" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
            </v-list-tile-content>
          </template>
        </v-select>

        <v-select
          label="Debuffs"
          :items="debuffOptions"
          multiple
          item-text="title"
          item-value="spell"
        >
          <template slot="item" slot-scope="data">
            <v-list-tile-avatar>
              <img :src="data.item.icon" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
            </v-list-tile-content>
          </template>
        </v-select>
      </v-form>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { effect_definitions } from '@/services/creatures';

export default {
  name: "FilterForm",
  props: {
    drawer: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      elementOptions: [
        { name: 'Fire', value: 'fire', icon: '/static/creatures/icon-fire.png' },
        { name: 'Air', value: 'air', icon: '/static/creatures/icon-air.png' },
        { name: 'Earth', value: 'earth', icon: '/static/creatures/icon-earth.png' },
        { name: 'Water', value: 'water', icon: '/static/creatures/icon-water.png' },
      ],
      typeOptions: [
        { name: 'Attacker', value: 'attacker' },
        { name: 'Defender', value: 'defender' },
        { name: 'Saboteur', value: 'saboteur' },
        { name: 'Support', value: 'support' },
      ]
    };
  },
  computed: {
    buffOptions() {
      const buffs = Object.values(effect_definitions).reduce((accum, effect) => {
        if (effect.is_buff) {
          accum.push({
            ...effect,
            icon: `/static/effects/${effect.icon}.png`
          });
        }
        return accum;
      }, []);

      return buffs.sort((a, b) => a.title > b.title ? 1 : -1);
    },
    debuffOptions() {
      const buffs = Object.values(effect_definitions).reduce((accum, effect) => {
        if (!effect.is_buff) {
          accum.push({
            ...effect,
            icon: `/static/effects/${effect.icon}.png`
          });
        }
        return accum;
      }, []);

      return buffs.sort((a, b) => a.title > b.title ? 1 : -1);
    },
  }
};
</script>

<style scoped>
</style>
