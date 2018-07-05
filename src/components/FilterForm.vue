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
        <v-text-field
          v-model="form.name"
          label="Name"
          browser-autocomplete="off"
        />

        <v-select
          v-model="form.element"
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
          v-model="form.nat_stars"
          label="Nat. Stars"
          :max="4"
          :min="1"
          thumb-label="always"
          thumb-size="20"
          always-dirty
        />

        <v-select
          v-model="form.type"
          label="Type"
          :items="typeOptions"
          multiple
          item-text="name"
          item-value="value"
        >
          <template slot="item" slot-scope="data">
            <v-list-tile-avatar>
              <img :src="`/static/creatures/icon-${data.item.value}.png`" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
            </v-list-tile-content>
          </template>
        </v-select>
        
        <v-divider />
        
        <v-select
          v-model="form.buffs"
          label="Buffs"
          :items="buffOptions"
          multiple
          item-text="title"
          item-value="spell"
        >
          <template slot="item" slot-scope="data">
            <v-list-tile-avatar>
              <img :src="`/static/effects/${data.item.icon}.png`" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
            </v-list-tile-content>
          </template>
        </v-select>

        <v-select
          v-model="form.debuffs"
          label="Debuffs"
          :items="debuffOptions"
          multiple
          item-text="title"
          item-value="spell"
        >
          <template slot="item" slot-scope="data">
            <v-list-tile-avatar>
              <img :src="`/static/effects/${data.item.icon}.png`" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
            </v-list-tile-content>
          </template>
        </v-select>

        <v-switch
          :label="`Has ${form.skill_filter_logic === 'all' ? 'all effects' : 'any effect'}`"
          v-model="form.skill_filter_logic"
          false-value="all"
          true-value="any"
        />

        <v-btn @click="submit">Apply</v-btn>
      </v-form>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from 'vuex';
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
      form: {
        name: '',
        element: [],
        nat_stars: [1, 4],
        type: [],
        buffs: [],
        debuffs: [],
        skill_filter_logic: "all" 
      },
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
          accum.push(effect);
        }
        return accum;
      }, []);

      return buffs.sort((a, b) => a.title > b.title ? 1 : -1);
    },
    debuffOptions() {
      const buffs = Object.values(effect_definitions).reduce((accum, effect) => {
        if (!effect.is_buff) {
          accum.push(effect);
        }
        return accum;
      }, []);

      return buffs.sort((a, b) => a.title > b.title ? 1 : -1);
    },
  },
  methods: {
    ...mapActions(['applyFilters']),
    submit() {
      const filters = {};
      
      // Transform form values into appropriate format for GET request
      // TODO: Generalize this logic somewhere
      if (this.form.name) {
        filters.name = this.form.name;
      }
      if (this.form.element.length) {
        filters.element = this.form.element.join(',')
      }
      filters.rank__gte = this.form.nat_stars[0];
      filters.rank__lte = this.form.nat_stars[1];
      if (this.form.type.length) {
        filters.archetype = this.form.type.join(',')
      }

      const combined_effects = this.form.buffs.concat(this.form.debuffs).join(',');

      if (combined_effects) {
        if (this.form.skill_filter_logic === "all") {
          filters.spell_effect = combined_effects;
        } else {
          filters.spell_effect_any = combined_effects;
        }
      }

      console.log({filters})

      this.applyFilters(filters);
    }
  }
};
</script>

<style scoped>
</style>
