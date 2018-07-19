import { schema } from "normalizr";

const spell = new schema.Entity("spells");
const enemy = new schema.Entity("enemies", {
  spells: [spell]
});
const wave = new schema.Entity("waves", {
  enemies: [enemy],
  bosses: [enemy]
});
const level = new schema.Entity("levels", {
  waves: [wave]
});
const dungeon = new schema.Entity("dungeons", {
  levels: [level]
});

export default {
  dungeon,
  level,
  wave,
  enemy,
  spell
};
