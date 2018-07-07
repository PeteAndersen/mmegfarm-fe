export const target_definitions = {
  one: "Single Target",
  all: "AOE",
  self: "Self",
  one_minus_self: "One (excluding self)",
  all_minus_self: "AOE (excluding self)",
  all_minus_one: "AOE (minus one)",
  random_dead: "Random Dead"
};

export const stat_definitions = {
  selfdefense: "DEF",
  selfspeed: "SPD",
  selflostHP: "LostHP",
  selfremainingHP: "RemainingHP",
  selfmaxHP: "MaxHP",
  targetmaxHP: "TargetMaxHP",
  targetdefense: "TargetDefense",
  selfcritDmg: "CritDmg",
  targetspeed: "TargetSPD"
};

export const multiplier_formula = params => {
  const inc_stat = params.incStat
    ? params.incAmount !== 1
      ? `(${stat_definitions[params.incBase]} * ${params.incAmount})`
      : stat_definitions[params.incBase]
    : "";
  const with_base_stat = inc_stat ? `ATK + ${inc_stat}` : `ATK`;
  if (params.amount !== 1) {
    return `${params.amount} * (${with_base_stat})`;
  } else {
    return with_base_stat;
  }
};

export const effect_definitions = {
  avoidDamage: {
    description:
      "Makes an ally invincible against attacks, receiving 0 damage from any non-lasting source for a few turns.",
    icon: "icon-avoid-dmg",
    is_buff: true,
    sku: "spell_icon_0023",
    spell: "avoidDamage",
    title: "Avoid Direct Damage"
  },
  avoidDeath: {
    description:
      "Makes an ally unkillable, preventing their HP from dropping below 1 point.",
    icon: "icon-avoid-death",
    is_buff: true,
    sku: "spell_icon_0024",
    spell: "avoidDeath",
    title: "Avoid Death"
  },
  avoidLifeChangeAllies: {
    description:
      "Blocks the HP of the allies for some turns, making that no damage or heal received over them modify their HP.",
    icon: "icon-avoid-life-change",
    is_buff: true,
    sku: "spell_icon_0065",
    spell: "avoidLifeChangeAllies",
    title: "Avoid Life Change"
  },
  blind: {
    description:
      "Blinds an enemy, giving them a 50% chance of missing their attacks.",
    icon: "icon-blind",
    is_buff: false,
    sku: "spell_icon_0043",
    spell: "blind",
    title: "Blind"
  },
  blindMail: {
    description:
      "Recovers an ally with a rusty dust spewing mail, bringing something in the eyes of an enemy attacker. Making them missing their abilities with 50% chance.",
    icon: "icon-blind-mail",
    is_buff: true,
    sku: "spell_icon_0064",
    spell: "blindMail",
    title: "Blind Mail"
  },
  blockBuff: {
    description: "Prevents an enemy from receiving positive lasting effects.",
    icon: "icon-block-buff",
    is_buff: false,
    sku: "spell_icon_0037",
    spell: "blockBuff",
    title: "Block Buff"
  },
  blockHeal: {
    description: "Prevents an enemy from receiving healing effects.",
    icon: "icon-block-heal",
    is_buff: false,
    sku: "spell_icon_0038",
    spell: "blockHeal",
    title: "Block Heal"
  },
  blockRevive: {
    description:
      "Prevents an enemy from being reborn if they perish while this effect is active.",
    icon: "icon-block-revive",
    is_buff: false,
    sku: "spell_icon_0039",
    spell: "blockRevive",
    title: "Block Revive"
  },
  bomb: {
    description:
      "Plants a bomb on an enemy which detonates at the end of a timer, dealing damage based on the caster's attack.",
    icon: "icon-bomb",
    is_buff: false,
    sku: "spell_icon_0035",
    spell: "bomb",
    title: "Bomb"
  },
  build: {
    description:
      "Points of extra energy in the form of sageness. These allow some spells to have extra effects when cast by the ally in question. These extra effects are indicated by (Cx), where x is the number of Concentration points needed.",
    icon: "icon-charges-build-menus",
    is_buff: true,
    sku: "spell_icon_0053",
    spell: "build",
    title: "Concentration Points"
  },
  confuse: {
    description:
      "Confuses an enemy, giving a 50% chance of them attacking a non-enemy character.",
    icon: "icon-confused",
    is_buff: false,
    sku: "spell_icon_0041",
    spell: "confuse",
    title: "Confuse"
  },
  counterAttack: {
    description: "Gives a 50% chance of an ally counterattacking any attacker.",
    icon: "icon-counter-attack",
    is_buff: true,
    sku: "spell_icon_0022",
    spell: "counterAttack",
    title: "Counter Attack"
  },
  curse: {
    description:
      'Disables a percentage of target\'s HP for a number of turns. Disabled HP becomes "unusable" while effect is active.',
    icon: "icon-curse",
    is_buff: false,
    sku: "spell_icon_0051",
    spell: "curse",
    title: "Curse"
  },
  decreaseAccuracy: {
    description: "Decreases the accuracy of an enemy by 25%.",
    icon: "icon-accuracy-reduced",
    is_buff: false,
    sku: "spell_icon_0028",
    spell: "decreaseAccuracy",
    title: "Decrease Accuracy"
  },
  decreaseAttack: {
    description: "Decreases the attack of an enemy by 50%.",
    icon: "icon-attack-reduced",
    is_buff: false,
    sku: "spell_icon_0025",
    spell: "decreaseAttack",
    title: "Decrease Attack"
  },
  decreaseChanceReceiveCritical: {
    description:
      "Decreases the probability of an ally receiving a critical attack by 30%.",
    icon: "icon-decrease-chance-crit-dmg",
    is_buff: true,
    sku: "spell_icon_0007",
    spell: "decreaseChanceReceiveCritical",
    title: "Decrease Chance Receive Critical"
  },
  decreaseCooldown: {
    description:
      "Decrease the turn timer on skills, allowing them to be used sooner.",
    icon: null,
    is_buff: true,
    sku: null,
    spell: "decreaseCooldown",
    title: "Reduce Cooldown"
  },
  decreaseCriticalChance: {
    description:
      "Decreases the probability of an enemy dealing a critical attack by 15%.",
    icon: "icon-crit-chance-reduced",
    is_buff: false,
    sku: "spell_icon_0030",
    spell: "decreaseCriticalChance",
    title: "Decrease Critical Chance"
  },
  decreaseCriticalDamage: {
    description:
      "Decreases the damage an enemy inflicts when dealing a critical attack by 55%.",
    icon: "icon-crit-dmg-reduced",
    is_buff: false,
    sku: "spell_icon_0031",
    spell: "decreaseCriticalDamage",
    title: "Decrease Critical Damage"
  },
  decreaseDefense: {
    description: "Decreases the defense of an enemy by 60%.",
    icon: "icon-defense-reduced",
    is_buff: false,
    sku: "spell_icon_0026",
    spell: "decreaseDefense",
    title: "Decrease Defense"
  },
  decreaseResistance: {
    description: "Decreases the resistance of an enemy by 25%.",
    icon: "icon-resistance-reduced",
    is_buff: false,
    sku: "spell_icon_0029",
    spell: "decreaseResistance",
    title: "Decrease Resistance"
  },
  decreaseSpeed: {
    description: "Decreases the speed of an enemy by 40%.",
    icon: "icon-speed-reduced",
    is_buff: false,
    sku: "spell_icon_0027",
    spell: "decreaseSpeed",
    title: "Decrease Speed"
  },
  divineShield: {
    description: "Holy protection that dodges damage, then fades out.",
    icon: "icon-divine-shield",
    is_buff: true,
    sku: "spell_icon_0059",
    spell: "divineShield",
    title: "Divine Shield"
  },
  dodge: {
    description:
      "Fastens a creature with this positive effect, allowing it to dodge enemy abilities with 50% chance.",
    icon: "icon-dodge",
    is_buff: true,
    sku: "spell_icon_0063",
    spell: "dodge",
    title: "Dodge"
  },
  elementalAttack: {
    description:
      "Makes an ally advantageous against all elements when attacking.",
    icon: "icon-elemental-attack",
    is_buff: true,
    sku: "spell_icon_0017",
    spell: "elementalAttack",
    title: "Elemental Attack"
  },
  elementalDefense: {
    description:
      "Makes an ally advantageous against all elements when defending.",
    icon: "icon-elemental-defense",
    is_buff: true,
    sku: "spell_icon_0018",
    spell: "elementalDefense",
    title: "Elemental Defense"
  },
  fear: {
    description: "Terrifies an enemy, making them unable to cast a skill.",
    icon: "icon-fear",
    is_buff: false,
    sku: "spell_icon_0047",
    spell: "fear",
    title: "Fear"
  },
  fillBar: {
    description: "Refill allie's turn bar.",
    icon: null,
    is_buff: false,
    sku: null,
    spell: "fillBar",
    title: "Increase Turn Bar"
  },
  frost: {
    description: "Freezes an enemy, making them unable to cast a skill.",
    icon: "icon-frozen",
    is_buff: false,
    sku: "spell_icon_0046",
    spell: "frost",
    title: "Freeze"
  },
  heal: {
    description: "Restores an ally's HP",
    icon: null,
    is_buff: true,
    sku: null,
    spell: "heal",
    title: "Heal"
  },
  humanShield: {
    description:
      "Protects an ally using own body, taking any single target attacks they would have otherwise received.",
    icon: "icon-human-shield",
    is_buff: true,
    sku: "spell_icon_0016",
    spell: "humanShield",
    title: "Body shield"
  },
  huntingMark: {
    description: "Increases the damage an enemy receives by 40%.",
    icon: "icon-hunting-mark",
    is_buff: false,
    sku: "spell_icon_0040",
    spell: "huntingMark",
    title: "Hunting Mark"
  },
  immuneToAll: {
    description:
      "Makes an ally immune to incoming negative lasting effects, with 100% chance of resisting them.",
    icon: "icon-inmune-to-all",
    is_buff: true,
    sku: "spell_icon_0013",
    spell: "immuneToAll",
    title: "Immune"
  },
  immuneToX: {
    description:
      "Makes an ally partially immune to incoming lasting negative effects, resisting [some] of them with 100% chance, no matter what.",
    icon: "icon-inmune-to-single",
    is_buff: true,
    sku: "spell_icon_0012",
    spell: "immuneToX",
    title: "Partial Immunity"
  },
  increaseAccuracy: {
    description: "Increases the accuracy of an ally by 25%.",
    icon: "icon-accuracy-enhanced",
    is_buff: true,
    sku: "spell_icon_0003",
    spell: "increaseAccuracy",
    title: "Increase Accuracy"
  },
  increaseAttack: {
    description: "Increases the attack of an ally by 50%.",
    icon: "icon-attack-enhanced",
    is_buff: true,
    sku: "spell_icon_0000",
    spell: "increaseAttack",
    title: "Increase Attack"
  },
  increaseChanceReceiveCritical: {
    description:
      "Increases the probability of an enemy receiving a critical attack by 30%.",
    icon: "icon-increase-chance-crit-dmg",
    is_buff: false,
    sku: "spell_icon_0032",
    spell: "increaseChanceReceiveCritical",
    title: "Increase Chance Receive Critical"
  },
  increaseCooldown: {
    description: "Increases the turn timer on skills.",
    icon: null,
    is_buff: false,
    sku: null,
    spell: "increaseCooldown",
    title: "Increase Cooldown"
  },
  increaseCriticalChance: {
    description:
      "Increases the probability of an ally dealing a critical attack by 15%.",
    icon: "icon-crit-chance-enhanced",
    is_buff: true,
    sku: "spell_icon_0005",
    spell: "increaseCriticalChance",
    title: "Increase Critical Chance"
  },
  increaseCriticalDamage: {
    description:
      "Increases by 55% the damage an ally inflicts when dealing a critical attack.",
    icon: "icon-crit-dmg-enhanced",
    is_buff: true,
    sku: "spell_icon_0006",
    spell: "increaseCriticalDamage",
    title: "Increase Critical Damage"
  },
  increaseDefense: {
    description: "Increases the defense of an ally by 60%.",
    icon: "icon-defense-enhanced",
    is_buff: true,
    sku: "spell_icon_0001",
    spell: "increaseDefense",
    title: "Increase Defense"
  },
  increaseHealingEffects: {
    description: "Amplifies any healing effects an ally receives by 25%.",
    icon: "icon-increase-heal",
    is_buff: true,
    sku: "spell_icon_0009",
    spell: "increaseHealingEffects",
    title: "Increase Healing Effects"
  },
  increaseResistance: {
    description: "Increases the resistance of an ally by 25%.",
    icon: "icon-resistance-enhanced",
    is_buff: true,
    sku: "spell_icon_0004",
    spell: "increaseResistance",
    title: "Increase Resistance"
  },
  increaseSpeed: {
    description: "Increases the speed of an ally by 40%.",
    icon: "icon-speed-enhanced",
    is_buff: true,
    sku: "spell_icon_0002",
    spell: "increaseSpeed",
    title: "Increase Speed"
  },
  invincible: {
    description: "Makes an ally invincible to all sources of damage.",
    icon: "icon-invincible",
    is_buff: true,
    sku: "spell_icon_0014",
    spell: "invincible",
    title: "Invincible"
  },
  lifeSteal: {
    description:
      "Curses an enemy, draining their HP and recuperating the HP of the caster.",
    icon: "icon-life-steal",
    is_buff: false,
    sku: "spell_icon_0034",
    spell: "lifeSteal",
    title: "Lifesteal"
  },
  lifeStealInstant: {
    description:
      "Draining HP from an enemy and recuperate the HP of the caster.",
    icon: null,
    is_buff: true,
    sku: null,
    spell: "lifeStealInstant",
    title: "Lifesteal (Instant)"
  },
  lifeStealHP: {
    description: "Curses an enemy and inflicts lifesteal.",
    icon: "icon-life-steal",
    is_buff: false,
    sku: "spell_icon_0058",
    spell: "lifeStealHP",
    title: "Lifesteal HP"
  },
  mirror: {
    description:
      "A creature with this effect is protected by a crystalline veil that acts as a mirror against negative effects, thus bouncing them back to the original caster.",
    icon: "icon-mirror",
    is_buff: true,
    sku: "spell_icon_0057",
    spell: "mirror",
    title: "Mirror"
  },
  mute: {
    description: "Mutes an enemy, only allowing casting of the first skill.",
    icon: "icon-mute",
    is_buff: false,
    sku: "spell_icon_0042",
    spell: "mute",
    title: "Mute"
  },
  paralyze: {
    description:
      "Binds an enemy in a powerful hold, making them unable to cast a skill.",
    icon: "icon-paralyze",
    is_buff: false,
    sku: "spell_icon_0049",
    spell: "paralyze",
    title: "Paralyze"
  },
  parasite: {
    description:
      "Implants a parasite in the target that devours their HP by an increasing amount, turn after turn, until the parasite's timer runs out or the creature is dead.",
    icon: "icon-parasite",
    is_buff: false,
    sku: "spell_icon_0054",
    spell: "parasite",
    title: "Parasite"
  },
  phoenixSoul: {
    description:
      "Revives an ally from their ashes if they perish while this effect is active.",
    icon: "icon-phoenix-soul",
    is_buff: true,
    sku: "spell_icon_0010",
    spell: "phoenixSoul",
    title: "Phoenix Soul"
  },
  poison: {
    description: "Subtracts 10% of an enemy's HP at the end of their turn.",
    icon: "icon-poison",
    is_buff: false,
    sku: "spell_icon_0033",
    spell: "poison",
    title: "Poison"
  },
  poisonMail: {
    description:
      "Protects an ally with a venomous aura, with a 40% probability of poisoning any attacker for 2 turns.",
    icon: "icon-poison-mail",
    is_buff: true,
    sku: "spell_icon_0020",
    spell: "poisonMail",
    title: "Poisonmail"
  },
  polymorph: {
    description:
      "Transforms an enemy into a critter, modifying their stats and spells to those belonging to the critter for a few turns.",
    icon: "icon-polymorph",
    is_buff: false,
    sku: "spell_icon_0050",
    spell: "polymorph",
    title: "Polymorph"
  },
  protectiveMark: {
    description: "Reduces the damage an ally receives by 40%.",
    icon: "icon-protective-mark",
    is_buff: true,
    sku: "spell_icon_0015",
    spell: "protectiveMark",
    title: "Protective Mark"
  },
  purge: {
    description: "Remove beneficial effect from enemies.",
    icon: null,
    is_buff: false,
    sku: null,
    spell: "purge",
    title: "Purge Beneficial Effects"
  },
  reflectDamage: {
    description:
      "Protects an ally with a reflecting veil, injuring any attacker with 25% of the damage they just dealt.",
    icon: "icon-reflect-dmg",
    is_buff: true,
    sku: "spell_icon_0021",
    spell: "reflectDamage",
    title: "Reflect Damage"
  },
  reflectHeal: {
    description:
      "Reflects the caster's damage as healing vibes on the target ally.",
    icon: "icon-reflect-heal",
    is_buff: true,
    sku: "spell_icon_0062",
    spell: "reflectHeal",
    title: "Reflect Heal"
  },
  regen: {
    description: "Regenerates the HP of an ally at the end of their turn.",
    icon: "icon-life-regen",
    is_buff: true,
    sku: "spell_icon_0008",
    spell: "regen",
    title: "Regenerate"
  },
  return: {
    description: "Recover your turn.",
    icon: null,
    is_buff: true,
    sku: null,
    spell: "return",
    title: "Additional Turn"
  },
  reverseAlly: {
    description:
      "Incoming damage will heal the creature, while healing will deal damage.",
    icon: "icon-reverse-positive",
    is_buff: true,
    sku: "spell_icon_0060",
    spell: "reverseAlly",
    title: "Reverse Allies"
  },
  reverseEnemy: {
    description:
      "Healing turns into damage. while incoming damage will heal the creature.",
    icon: "icon-reverse-negative",
    is_buff: false,
    sku: "spell_icon_0061",
    spell: "reverseEnemy",
    title: "Reverse Enemies"
  },
  shield: {
    description:
      "Shields an ally, providing a layer of extra HP for a few turns.",
    icon: "icon-shield",
    is_buff: true,
    sku: "spell_icon_0011",
    spell: "shield",
    title: "Shield"
  },
  sleep: {
    description:
      "Puts an enemy to sleep, making them unable to cast a skill. They will be woken if attacked.",
    icon: "icon-sleep",
    is_buff: false,
    sku: "spell_icon_0044",
    spell: "sleep",
    title: "Sleep"
  },
  spreadDamage: {
    description:
      "Damage received by the creature covered by this effect is divided between all allies, and thus vastly reduced. Only the original creature is taken in account when proceeding with the calculation of damage inflicted.",
    icon: "icon-spread-damage",
    is_buff: true,
    sku: "spell_icon_0056",
    spell: "spreadDamage",
    title: "Spread Damage"
  },
  stealBar: {
    description:
      "Steal a portion of the enemy's turn bar and add it to your own",
    icon: null,
    is_buff: true,
    sku: null,
    spell: "stealBar",
    title: "Steal Turn Bar"
  },
  stone: {
    description:
      "Encases an enemy in solid rock, making them unable to cast a skill.",
    icon: "icon-stone",
    is_buff: false,
    sku: "spell_icon_0048",
    spell: "stone",
    title: "Turn To Stone"
  },
  stun: {
    description: "Incapacitates an enemy, making them unable to cast a skill.",
    icon: "icon-stun",
    is_buff: false,
    sku: "spell_icon_0045",
    spell: "stun",
    title: "Stun"
  },
  taunt: {
    description:
      "Provokes an enemy, forcing them to target the caster of this effect or one of their allies.",
    icon: "icon-target",
    is_buff: false,
    sku: "spell_icon_0036",
    spell: "taunt",
    title: "Taunt"
  },
  tauntMail: {
    description:
      "A creature with this effect has a 50% chance of mocking an enemy attacker, thus attracting their attacks for a number of turns.",
    icon: "icon-taunt-mail",
    is_buff: true,
    sku: "spell_icon_0055",
    spell: "tauntMail",
    title: "Taunt Mail"
  },
  teamUp: {
    description: "Teams up with allies to attack an enemy.",
    icon: null,
    is_buff: true,
    sku: null,
    spell: "teamUp",
    title: "Team Up"
  },
  thornMail: {
    description:
      "Protects an ally with Thornmail, injuring any attacker with 10% of their max HP.",
    icon: "icon-thorn-mail",
    is_buff: true,
    sku: "spell_icon_0019",
    spell: "thornMail",
    title: "Thornmail"
  },
  transferDebuff: {
    description: "Transfer a harmful effect from the caster to the enemy.",
    icon: null,
    is_buff: true,
    sku: null,
    spell: "transferDebuff",
    title: "Transfer Debuff"
  },
  unfillBar: {
    description: "Reduce an enemy's turn bar.",
    icon: null,
    is_buff: false,
    sku: null,
    spell: "unfillBar",
    title: "Reduce Turn Bar"
  },
  wound: {
    description:
      "Points of debility that affect an enemy creature and allow some spells to have extra effects when cast against those enemies. These extra effects are indicated by (Fx), where x is the number of Focus points needed.",
    icon: "icon-charges-wound-menus",
    is_buff: false,
    sku: "spell_icon_0052",
    spell: "wound",
    title: "Focus Points"
  }
};
