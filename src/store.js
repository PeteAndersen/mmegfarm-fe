import Vue from "vue";
import Vuex from "vuex";
/*import VuexPersistence from "vuex-persist";
import localForage from "localforage";*/

import api from "@/api.js";

Vue.use(Vuex);

/*const vuexLocal = new VuexPersistence({
  storage: localForage
});*/

export default new Vuex.Store({
  state: {
    creatures: [],
    total_creatures: 0,
    max_creature_count: 0,
    creature: null,
    evolves_to: null,
    evolves_from: null,
    family: [],
    page: 1,
    page_size: 48,
    num_pages: 1,
    filters: {
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
    filterDrawer: true,
    sortKey: "name",
    sortDirection: "", // '' or '-'
    loading: false
  },
  //plugins: [vuexLocal.plugin],
  mutations: {
    addCreatures(state, { creatures }) {
      state.creatures = creatures;
    },
    setCreature(state, { creature }) {
      state.creature = creature;
    },
    setCreatureEvolvesFrom(state, { creature }) {
      state.evolves_from = creature;
    },
    setCreatureEvolvesTo(state, { creature }) {
      state.evolves_to = creature;
    },
    setFamily(state, { family }) {
      state.family = family;
    },
    setPage(state, { page }) {
      state.page = page;
    },
    setPageSize(state, { page_size }) {
      state.page_size = page_size;
    },
    setTotalCreatures(state, value) {
      state.total_creatures = value;
    },
    setMaxCreatureCount(state, value) {
      state.max_creature_count = value;
    },
    setNumPages(state, value) {
      state.num_pages = value;
    },
    loading(state, value) {
      state.loading = value;

      if (value === false) {
        state.direction = null;
      }
    },
    filterDrawer(state, value) {
      state.filterDrawer = value;
    },
    setOrderingKey(state, value) {
      state.sortKey = value;
    },
    setOrderingDirection(state, value) {
      state.sortDirection = value;
    }
  },
  actions: {
    async populateCreatures({ state, dispatch, commit }) {
      commit("loading", true);

      try {
        const {
          data: { count, results }
        } = await api.get("creatures/", {
          params: {
            ...filters_to_query(state.filters),
            ordering: `${state.sortDirection}${state.sortKey}`,
            page_size: state.page_size,
            page: state.page
          }
        });
        const num_pages = Math.ceil(count / state.page_size);
        commit("addCreatures", { creatures: results });
        commit("setNumPages", num_pages);
        commit("setTotalCreatures", count);
        dispatch("getMaxCreatureCount");
      } catch (e) {
        console.log(e);
      }

      commit("loading", false);
    },
    async getCreature({ dispatch, commit }, slug) {
      commit("loading", true);

      try {
        const {
          data: { results }
        } = await api.get("creatures/", {
          params: { slug }
        });
        const creature = results[0];
        commit("setCreature", { creature });
        dispatch("getFamily", creature.creatureType);

        if (creature.evolvesTo) {
          const { data } = await api.get(`creatures/${creature.evolvesTo}/`);
          commit("setCreatureEvolvesTo", { creature: data });
        } else {
          commit("setCreatureEvolvesTo", { creature: null });
        }
        if (creature.evolvesFrom && creature.evolvesFrom.length) {
          const { data } = await api.get(
            `creatures/${creature.evolvesFrom[0]}/`
          );
          commit("setCreatureEvolvesFrom", { creature: data });
        } else {
          commit("setCreatureEvolvesFrom", { creature: null });
        }
      } catch (e) {
        console.log(e);
      }

      commit("loading", false);
    },
    async getFamily({ commit }, family_id) {
      try {
        const {
          data: { results }
        } = await api.get("creatures/", {
          params: { creatureType: family_id }
        });
        const family = results.sort((a, b) => (a.element > b.element ? 1 : -1));
        commit("setFamily", { family });
      } catch (e) {
        console.log(e);
      }
    },
    async getMaxCreatureCount({ commit }) {
      try {
        const {
          data: { count }
        } = await api.get("creatures/");
        commit("setMaxCreatureCount", count);
      } catch (e) {
        console.log(e);
      }
    },
    setPage({ commit, dispatch }, value) {
      commit("setPage", { page: value });
      dispatch("populateCreatures");
    },
    orderBy({ commit, dispatch }, value) {
      commit("setOrderingKey", value);
      dispatch("populateCreatures");
    },
    orderDirection({ commit, dispatch }, value) {
      commit("setOrderingDirection", value);
      dispatch("populateCreatures");
    }
  },
  getters: {
    creatureList: state => state.creatures,
    creature: state => state.creature,
    evolves_to: state => state.evolves_to,
    evolves_from: state => state.evolves_from,
    family: state => state.family,
    totalCreatures: state => state.total_creatures,
    maxCreatureCount: state => state.max_creature_count,
    page: state => state.page,
    numPages: state => state.num_pages,
    hasNext: state => state.hasNext,
    hasPrev: state => state.hasPrev,
    loading: state => state.loading,
    sortKey: state => state.sortKey,
    sortDirection: state => state.sortDirection,
    filterDrawer: state => state.filterDrawer
  }
});

const filters_to_query = filter_state => {
  const filters = {};

  // Transform form values into appropriate format for GET request
  // Creature attributes
  if (filter_state.name) {
    filters.name = filter_state.name;
  }
  if (filter_state.element.length) {
    filters.element = filter_state.element.join(",");
  }
  filters.rank__gte = filter_state.nat_stars[0];
  filters.rank__lte = filter_state.nat_stars[1];
  if (filter_state.type.length) {
    filters.archetype = filter_state.type.join(",");
  }

  // Spells
  const spell_target = filter_state.target.reduce((accum, target) => {
    if (target === "aoe") {
      accum = accum.concat(["all", "all_minus_self", "all_minus_one"]);
    } else if (target === "single") {
      accum = accum.concat(["one", "one_minus_self"]);
    } else {
      accum.push(target);
    }
    return accum;
  }, []);

  if (spell_target.length) {
    filters.spell_target = spell_target.join(",");
  }

  if (filter_state.scalesWith.length > 0) {
    filters.scales_with = filter_state.scalesWith.join(",");
  }

  const combined_effects = filter_state.buffs
    .concat(filter_state.debuffs)
    .join(",");
  if (combined_effects) {
    if (filter_state.skill_filter_logic === "all") {
      filters.spell_effect = combined_effects;
    } else {
      filters.spell_effect_any = combined_effects;
    }
  }

  console.log(filters);

  return filters;
};
