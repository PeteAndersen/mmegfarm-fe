import { schema } from "normalizr";

const wave = new schema.Entity("waves");
const level = new schema.Entity("levels", {
  waves: [wave]
});
const dungeon = new schema.Entity("dungeons", {
  levels: [level]
});

export default {
  dungeon,
  level,
  wave
};
