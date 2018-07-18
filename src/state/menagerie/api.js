import api from "@/services/api";

async function fetchCreature(id) {
  return await api.get(`creatures/${id}/`);
}

async function fetchCreatures(params) {
  return await api.get("creatures/", { params });
}

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

  if (filter_state.nat_stars[0] !== 1) {
    filters.rank__gte = filter_state.nat_stars[0];
  }

  if (filter_state.nat_stars[1] !== 4) {
    filters.rank__lte = filter_state.nat_stars[1];
  }

  if (filter_state.type.length) {
    filters.archetype = filter_state.type.join(",");
  }

  if (filter_state.evolved !== null) {
    filters.summonable = filter_state.evolved;

    if (!filter_state.evolved) {
      filters.evolvesTo_count = 0;
    }
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

  return filters;
};

export default {
  fetchCreature,
  fetchCreatures,
  filters_to_query
};
