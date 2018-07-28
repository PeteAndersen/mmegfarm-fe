export const group_names = {
  GroupElements: "Evolution Dungeon",
  GroupGylphs: "Glyph Dungeon",
  GroupTwinTowers: "Tower of Trials",
  ScenarioDungeon: "Scenario"
};

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
