<template lang="pug">
  dl
    template(v-for="dmg in damageTypes")
      dt {{ dmg.type }}
      dd {{ dmg.note }}
</template>

<script>
export default {
  data () {
    return {
      damageTypes: [
        { type: 'Acid', note: 'The corrosive spray of a chemical and the dissolving enzymes secreted by thresher maw spit deal damage.' },
        { type: 'Bludgeoning', note: 'Blunt force attacks - hammers, falling, constriction, and the like - deal bludgeoning damage.' },
        { type: 'Cold', note: 'The painful chill from a cryo beam breath deal cold damage.' },
        { type: 'Fire', note: 'Many tech spells use plasma and flames to deal fire damage' },
        { type: 'Force', note: 'One of the primary biotic damage types. Mass effect fields that pummel, pierce, or apply pressure deal force damage.' },
        { type: 'Lightning', note: 'Shock damage. Any damage done by an electrical discharge or source. Deals double damage to shields.' },
        { type: 'Necrotic', note: 'The second biotic damage type. Necrotic damage uses dark energy and  mass effect fields on a subatomic level.' },
        { type: 'Piercing', note: 'Puncturing and impaling attacks, including bullets and monsters\' bites, deal piercing damage.' },
        { type: 'Poison', note: 'Venomous stings, poisoned blades, and the toxic gas deal poison damage.' },
        { type: 'Psychic', note: 'A shock to the nervous system, rather than fear or mental damage. But the latter is possible.' },
        { type: 'Radiant', note: 'Radiation or damage on a nuclear level, rather than divine light.' },
        { type: 'Slashing', note: 'Swords, axes, and monsters\' claws deal slashing damage.' },
        { type: 'Thunder', note: 'Shockwaves and explosions. Thunder damage is primarily caused by grenades.' }
      ]
    }
  }
}
</script>
