import { schema } from "normalizr";

const spell = new schema.Entity("spells");
const creature = new schema.Entity("creatures", {
  spells: [spell]
});

// Expand creature schema with self-referential fields
creature.define({
  evolvesTo: [creature],
  evolvesFrom: creature
});

export default {
  creature,
  spell
};
