<template lang="pug">
  div
    v-layout
      v-flex.xs12.sm6
        h4.headline {{ weapon.name }}
        p
          em {{ weapon.tags }}
      v-flex.hidden-xs-only.sm6.md3.offset-md3
        img(:src="weapon.image" style="max-width: 100%")
    v-layout(row wrap flex-start)
      v-flex.xs12.sm4.md2.attribute.mb-2
        label Range
        div {{ weapon | weaponRange }}
      v-flex.xs12.sm4.md2.attribute.mb-2
        label Damage
        div {{ weapon.damage }}
      v-flex(v-if="weapon.type === 'Melee'").xs12.sm4.md2.attribute.mb-2
        label Min STR
        div {{ weapon.minStr }}
      v-flex(v-else).xs12.sm4.md2.attribute.mb-2
        label(v-if="weapon.type === 'Heavy Weapon'") Charges
        label(v-else) Heat
        div {{ weapon.heat }}
      v-flex.xs12.sm4.md2.attribute.mb-2
        label Weight
        div {{ weapon.weight}}
      v-flex.xs12.sm4.md2.attribute.mb-2
        label Rarity
        div {{ weapon.rarity }}
      v-flex.xs12.sm4.md2.attribute.mb-2
        label Cost
        div {{ weapon.cost | groupDigits(',') }}
    div.hr
    div.mt-3
      me-element(:text="weapon.notes")
</template>

<script>
  import MeElement from '~/components/shared/MeElement.vue'

  export default {
    props: ['weapon'],
    components: {
      MeElement
    }
  }
</script>
