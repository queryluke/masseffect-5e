<template lang="pug">
  div
    v-layout
      v-flex.xs12.sm6
        p.headline.mb-1 {{ weapon.name }}
        p.subheading.ma-0 #[v-avatar(:color="colors[weapon.rarity]" size=24)] {{ weapon.rarity }} {{ weapon.type }}
        p.my-1 #[em {{ weapon.tags }}]
        p.body-2 {{ weapon.cost | groupDigits(',') }} credits
      v-flex.hidden-xs-only.sm6.md3.offset-md3
        img(:src="weapon.image" style="max-width: 100%")
    v-layout(row wrap flex-start)
      v-flex.xs12.sm3.attribute.mb-2
        label Damage
        div {{ weapon.damage }}
      v-flex.xs12.sm3.attribute.mb-2
        label Range
        div {{ weapon | weaponRange }}
      v-flex(v-if="weapon.type === 'Melee'").xs12.sm3.attribute.mb-2
        label Min STR
        div {{ weapon.minStr }}
      v-flex(v-else).xs12.sm3.attribute.mb-2
        label(v-if="weapon.type === 'Heavy Weapon'") Charges
        label(v-else) Heat
        div {{ weapon.heat }}
      v-flex.xs12.sm3.attribute.mb-2
        label Weight
        div {{ weapon.weight}}
    div.hr
    div.mt-3
      me-element(:text="weapon.notes")
</template>

<script>
  import MeElement from '~/components/MeElement.vue'

  export default {
    data () {
      return {
        colors: {
          'Common': 'grey',
          'Uncommon': 'green accent-2',
          'Rare': 'orange accent-2',
          'Very Rare': 'deep-purple accent-1'
        }
      }
    },
    props: ['weapon'],
    components: {
      MeElement
    }
  }
</script>
