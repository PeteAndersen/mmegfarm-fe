import { schema } from "normalizr";

const wave = new schema.Entity("waves");
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
