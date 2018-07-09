<template>
  <v-navigation-drawer clipped fixed app v-model="$store.state.filterDrawer">
    <v-snackbar color="success" v-model="permalinkCopied" absolute top :timeout="2000">
      Copied!
    </v-snackbar>

    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Filters 
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-tooltip bottom>
        <v-btn icon flat slot="activator" @click="copyPermalink"><v-icon>link</v-icon></v-btn>
        Copy Permalink
      </v-tooltip>
    </v-toolbar>

    <v-container>
      <v-form ref="form" @submit="submit">
        <h3>Creature Attributes</h3>
        
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
            <v-list-tile-action>
              <v-checkbox v-model="data.tile.props.value" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-avatar>
              <img :src="`/static/creatures/icon-${data.item.value}.png`" />
            </v-list-tile-avatar>
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
            <v-list-tile-action>
              <v-checkbox v-model="data.tile.props.value" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-avatar>
              <img :src="`/static/creatures/icon-${data.item.value}.png`" />
            </v-list-tile-avatar>
          </template>
        </v-select>
        
        <v-divider />

        <h3 class="pt-2">Spells</h3>
        <v-select
          v-model="form.target"
          label="Target"
          :items="targetOptions"
          multiple
          item-text="name"
          item-value="value"
        />

        <v-select
          v-model="form.scalesWith"
          label="Scales With"
          :items="scalesWithOptions"
          multiple
          item-text="name"
          item-value="value"
        />
        
        <v-select
          v-model="form.buffs"
          label="Buffs"
          :items="buffOptions"
          multiple
          item-text="title"
          item-value="spell"
        >
          <template slot="item" slot-scope="data">
            <v-list-tile-action>
              <v-checkbox v-model="data.tile.props.value" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-avatar v-if="data.item.icon">
              <img :src="`/static/effects/${data.item.icon}.png`" />
            </v-list-tile-avatar>
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
            <v-list-tile-action>
              <v-checkbox v-model="data.tile.props.value" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-avatar v-if="data.item.icon">
              <img :src="`/static/effects/${data.item.icon}.png`" />
            </v-list-tile-avatar>
          </template>
        </v-select>

        <v-switch
          :label="`Has ${form.skill_filter_logic === 'all' ? 'all effects' : 'any effect'}`"
          v-model="form.skill_filter_logic"
          false-value="all"
          true-value="any"
        />

        <v-btn type="submit" :loading="loading">Apply</v-btn>
        <v-btn flat @click="clear">Clear</v-btn>
      </v-form>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { effect_definitions, stat_definitions } from "@/services/creatures";

export default {
  name: "FilterForm",
  props: {
    show: {
      type: Boolean
    }
  },
  data() {
    return {
      form: {
        name: "",
        element: [],
        nat_stars: [1, 4],
        type: [],
        target: [],
        scalesWith: [],
        buffs: [],
        debuffs: [],
        skill_filter_logic: "all"
      },
      permalinkCopied: false,
      elementOptions: [
        {
          name: "Fire",
          value: "fire",
          icon: "/static/creatures/icon-fire.png"
        },
        { name: "Air", value: "air", icon: "/static/creatures/icon-air.png" },
        {
          name: "Earth",
          value: "earth",
          icon: "/static/creatures/icon-earth.png"
        },
        {
          name: "Water",
          value: "water",
          icon: "/static/creatures/icon-water.png"
        }
      ],
      typeOptions: [
        { name: "Attacker", value: "attacker" },
        { name: "Defender", value: "defender" },
        { name: "Saboteur", value: "saboteur" },
        { name: "Support", value: "support" }
      ],
      targetOptions: [
        { name: "AOE", value: "aoe" },
        { name: "Self", value: "self" },
        { name: "Single", value: "single" },
        { name: "Random Dead", value: "random_dead" }
      ]
    };
  },
  created() {
    const {
      name,
      element,
      nat_stars,
      type,
      target,
      scalesWith,
      buffs,
      debuffs,
      skill_filter_logic
    } = this.$route.query;

    if (name) {
      this.form.name = name;
    }
    if (element) {
      this.form.element = element.split(",");
    }
    if (nat_stars) {
      this.form.nat_stars = nat_stars.split(",").map(val => Number(val));
    }
    if (type) {
      this.form.type = type.split(",");
    }
    if (target) {
      this.form.target = target.split(",");
    }
    if (scalesWith) {
      this.form.scalesWith = scalesWith.split(",");
    }
    if (buffs) {
      this.form.buffs = buffs.split(",");
    }
    if (debuffs) {
      this.form.debuffs = debuffs.split(",");
    }
    if (skill_filter_logic) {
      this.form.skill_filter_logic = skill_filter_logic;
    }
    this.submit();
    window.history.replaceState({}, "", "/"); // Remove the query params from URL
  },
  computed: {
    ...mapGetters(["loading"]),
    scalesWithOptions() {
      return Object.entries(stat_definitions).map(stat => ({
        name: stat[1],
        value: stat[0]
      }));
    },
    buffOptions() {
      const buffs = Object.values(effect_definitions).reduce(
        (accum, effect) => {
          if (effect.is_buff) {
            accum.push(effect);
          }
          return accum;
        },
        []
      );

      return buffs.sort((a, b) => (a.title > b.title ? 1 : -1));
    },
    debuffOptions() {
      const buffs = Object.values(effect_definitions).reduce(
        (accum, effect) => {
          if (!effect.is_buff) {
            accum.push(effect);
          }
          return accum;
        },
        []
      );

      return buffs.sort((a, b) => (a.title > b.title ? 1 : -1));
    },
    permalinkURL() {
      const query_params = Object.entries(this.form)
        .reduce((accum, val) => {
          if (Array.isArray(val[1])) {
            if (val[1].length) {
              accum.push(`${val[0]}=${val[1].join(",")}`);
            }
          } else {
            if (val[1]) {
              accum.push(`${val[0]}=${val[1]}`);
            }
          }

          return accum;
        }, [])
        .join("&");
      return `${window.location.origin}?${query_params}`;
    }
  },
  methods: {
    ...mapActions(["applyFilters"]),
    submit(e) {
      if (e) {
        e.preventDefault();
      }

      const filters = {};

      // Transform form values into appropriate format for GET request
      // TODO: Generalize this logic somewhere
      // Creature attributes
      if (this.form.name) {
        filters.name = this.form.name;
      }
      if (this.form.element.length) {
        filters.element = this.form.element.join(",");
      }
      filters.rank__gte = this.form.nat_stars[0];
      filters.rank__lte = this.form.nat_stars[1];
      if (this.form.type.length) {
        filters.archetype = this.form.type.join(",");
      }

      // Spells
      const spell_target = this.form.target.reduce((accum, target) => {
        if (target === "aoe") {
          accum = accum.concat(["all", "all_minus_self", "all_minus_one"]);
        } else if (target === "single") {
          accum = accum.concat(["one", "one_minus_self"]);
        } else {
          accum.push(target);
        }
        return accum;
      }, []);
      filters.spell_target = spell_target.join(",");

      filters.scales_with = this.form.scalesWith.join(",");

      const combined_effects = this.form.buffs
        .concat(this.form.debuffs)
        .join(",");
      if (combined_effects) {
        if (this.form.skill_filter_logic === "all") {
          filters.spell_effect = combined_effects;
        } else {
          filters.spell_effect_any = combined_effects;
        }
      }

      this.applyFilters(filters);
    },
    clear() {
      this.$refs.form.reset();
      this.form.nat_stars = [1, 4];
    },
    copyPermalink() {
      const el = document.createElement("textarea");
      el.value = this.permalinkURL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.permalinkCopied = true;
    }
  }
};
</script>

<style scoped>
</style>
