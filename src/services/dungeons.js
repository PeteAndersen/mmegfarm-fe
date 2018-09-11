import urlSlug from "url-slug";

export const group_names = {
  GroupElements: "Evolution Dungeon",
  GroupGylphs: "Glyph Dungeon",
  GroupTwinTowers: "Tower of Trials",
  ScenarioDungeon: "Scenario"
};

export const scenario_difficulties = ["normal", "advanced", "nightmare"];

export const is_available = (dungeon, timestamp) => {
  if (dungeon.always_available) {
    return true;
  } else if (dungeon.days_available.length) {
    const dayOfWeek = timestamp.getDay() + 1;
    return dungeon.days_available.includes(dayOfWeek);
  } else if (dungeon.months_available.length) {
    const month = timestamp.getMonth() + 1;
    return dungeon.months_available.includes(month);
  }
};

export const dungeonUrl = (dungeon, params) =>
  dungeon.group === "ScenarioDungeon"
    ? {
        name: "scenario-dungeon-detail",
        params: {
          id: dungeon.id,
          slug: urlSlug(dungeon.name),
          levelIdx: 1,
          difficulty: "advanced",
          ...params
        }
      }
    : {
        name: "dungeon-detail",
        params: {
          id: dungeon.id,
          slug: urlSlug(dungeon.name),
          levelIdx: dungeon.levels.length,
          ...params
        }
      };
