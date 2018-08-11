import { schema } from "normalizr";
const enemy = new schema.Entity("enemies");
const wave = new schema.Entity("waves", {
  enemies: [enemy]
});
const level = new schema.Entity("levels", {
  waves: [wave]
});
const dungeon = new schema.Entity("dungeons", {
  levels: [level]
});
const dungeonSummary = new schema.Entity("dungeons");

export default {
  dungeon,
  dungeonSummary,
  level,
  wave
};
