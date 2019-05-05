<template lang="pug">
  div
    v-layout
      v-flex.xs12.sm6
        p.headline.mb-1 {{ weapon.name }}
          v-chip(:color="rarityColors[weapon.rarity]" small dark).ml-3.text-uppercase {{ weapon.rarity }}
          v-chip(v-if="weapon.andromeda" small dark color="secondary").ml-3 Andromeda
        p.body-2.text-uppercase {{ weapon.type }}
        p.body-2 {{ weapon.cost | groupDigits(',') }} credits
      v-flex.hidden-xs-only.sm6.md3.offset-md3
        img(:src="weapon.image" style="max-width: 100%")
    v-layout(row wrap flex-start)
      v-flex.xs12.sm3.attribute.mb-2
        label Damage
        div {{ weapon.damage }} #[em {{ weapon.dmgType }}]
      v-flex.xs12.sm3.attribute.mb-2
        label Range
        div {{ weapon | weaponRange }}
      v-flex.xs12.sm3.attribute.mb-2
        label(v-if="weapon.type === 'Heavy Weapon'") Charges
        label(v-else) Heat
        div {{ weapon.heat }}
      v-flex.xs12.sm3.attribute.mb-2
        label Weight
        div {{ weapon.weight}}
    div.hr
    div.mt-3
      div.subheading.font-weight-light.font-italic
        span(v-for="(prop, index) in weapon.properties" v-bind:key="index")
          weapon-prop(:propertyName="prop")
          span(v-if="index + 1 < weapon.properties.length").pa-2 |
      p.mt-2 {{ weapon.notes }}
</template>

<script>

  import {mapGetters} from 'vuex'

  export default {
    props: {
      weapon: {
        type: Object,
        default: () => { return {} }
      },
    },
    computed: {
      ...mapGetters('itemList', ['rarityColors'])
    }
  }
</script>
