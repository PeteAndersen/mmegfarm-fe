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
          v-model="$store.state.filters.name"
          label="Name"
          browser-autocomplete="off"
        />

        <v-select
          v-model="$store.state.filters.element"
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
          v-model="$store.state.filters.nat_stars"
          label="Nat. Stars"
          :max="4"
          :min="1"
          thumb-label="always"
          thumb-size="20"
          always-dirty
        />

        <v-select
          v-model="$store.state.filters.type"
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

        <v-radio-group v-model="$store.state.filters.evolved">
          <v-radio
            v-for="(data, idx) in evolvedOptions"
            :key="idx"
            :label="data.name"
            :value="data.value"
          ></v-radio>
        </v-radio-group>
        
        <v-divider />

        <h3 class="pt-2">Spells</h3>
        <v-select
          v-model="$store.state.filters.target"
          label="Target"
          :items="targetOptions"
          multiple
          item-text="name"
          item-value="value"
        />

        <v-select
          v-model="$store.state.filters.scalesWith"
          label="Scales With"
          :items="scalesWithOptions"
          multiple
          item-text="name"
          item-value="value"
        />
        
        <v-select
          v-model="$store.state.filters.buffs"
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
          v-model="$store.state.filters.debuffs"
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
          :label="`Has ${$store.state.filters.skill_filter_logic === 'all' ? 'all effects' : 'any effect'}`"
          v-model="$store.state.filters.skill_filter_logic"
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
      evolvedOptions: [
        { name: "Evolved and Unevolved", value: null },
        { name: "Unevolved Only", value: true },
        { name: "Evolved Only", value: false }
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
      this.$store.state.filters.name = name;
    }
    if (element) {
      this.$store.state.filters.element = element.split(",");
    }
    if (nat_stars) {
      this.$store.state.filters.nat_stars = nat_stars
        .split(",")
        .map(val => Number(val));
    }
    if (type) {
      this.$store.state.filters.type = type.split(",");
    }
    if (target) {
      this.$store.state.filters.target = target.split(",");
    }
    if (scalesWith) {
      this.$store.state.filters.scalesWith = scalesWith.split(",");
    }
    if (buffs) {
      this.$store.state.filters.buffs = buffs.split(",");
    }
    if (debuffs) {
      this.$store.state.filters.debuffs = debuffs.split(",");
    }
    if (skill_filter_logic) {
      this.$store.state.filters.skill_filter_logic = skill_filter_logic;
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
      const query_params = Object.entries(this.$store.state.filters)
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
      return encodeURI(`${window.location.origin}?${query_params}`);
    }
  },
  methods: {
    ...mapActions(["populateCreatures"]),
    submit(e) {
      if (e) {
        e.preventDefault();
      }
      this.$ga.page(this.$router);
      this.populateCreatures();
    },
    clear() {
      this.$refs.form.reset();
      this.$store.state.filters.nat_stars = [1, 4];
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
