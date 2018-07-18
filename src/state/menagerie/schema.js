import { schema } from "normalizr";

const spell = new schema.Entity("spells");
const spellList = [spell];
const creature = new schema.Entity("creatures", {
  spells: spellList
});
const creatureList = [creature];

// Expand creature schema with self-referential fields
creature.define({
  evolvesTo: creatureList,
  evolvesFrom: creature
});

export default {
  creature,
  creatureList,
  spell,
  spellList
};
