<template lang="pug">
  rule-card(id="damage-types")
    span(slot="header") Damage Types
    template(slot="text")
      p.
        Since this is the future and there isn't really "magic", some damage types need to be re-conceptualized. If the damage type is not listed, its concept is unchanged.
      dl
        template(v-for="dmg in damage_types")
          dt {{ dmg.type }}
          dd {{ dmg.note }}
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard },
    data () {
      return {
        damage_types: [
          { type: 'Force', note: 'One of the primary biotic damage types. Mass Effect fields that pummel, pierce, or apply pressure deal force damage.' },
          { type: 'Lightning', note: 'Shock damage. Any damage done by an electrical discharge or source. Deals double damage to shields.' },
          { type: 'Necrotic', note: 'The second biotic damage type. Necrotic damage uses dark energy or tiny Mass Effect fields targeted inside a creature, crippling them from within' },
          { type: 'Psychic', note: 'A shock to the nervous system, rather than fear or mental damage. But the latter is possible.' },
          { type: 'Radiant', note: 'Radiation or damage on a nuclear level, rather than divine light.' },
          { type: 'Thunder', note: 'Shockwaves and explosions. Thunder damage is primarily caused by grenades.' }
        ]
      }
    }
  }
</script>
