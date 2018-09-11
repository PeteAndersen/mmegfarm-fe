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

level.define({
  dungeon
});

wave.define({
  level
});

export default {
  dungeon,
  level,
  wave
};
