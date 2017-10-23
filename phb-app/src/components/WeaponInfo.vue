<template lang="jade">
  div
    v-layout
      v-flex.xs12.sm6
        h4 {{ weapon.name }}
        p.headline
          span {{ weapon.type }}
          span(v-if="weapon.rare").deep-purple--text
            small  (rare)
        p
          em {{ weapon.tags }}
      v-flex.hidden-xs-only.sm6.md3.offset-md3
        img(:src="weapon.image" style="max-width: 100%")
    v-layout(row wrap flex-start)
      v-flex.xs12.sm4.md2.attribute.mb-2
        label Range
        div {{ weapon.range }}
      v-flex.xs12.sm4.md2.attribute.mb-2(v-if="weapon.type !== 'Melee'")
        label Rate of Fire
        div {{ weapon.rof }}
      v-flex.xs12.sm4.md2.attribute.mb-2
        label Damage
        div(v-if="weapon.type === 'Melee'") {{ weapon.rof }}d{{ weapon.damage }}
        div(v-else) d{{ weapon.damage }}
      v-flex.xs12.sm4.md2.attribute.mb-2
        label(v-if="weapon.type === 'Heavy Weapon'") Charges
        label(v-if="weapon.type === 'Melee'") Min STR
        label(v-else) Heat
        div {{ weapon.heat }}
      v-flex.xs12.sm4.md2.attribute.mb-2
        label Weight
        div {{ weapon.weight}}
      v-flex.xs12.sm4.md2.attribute.mb-2
        label Cost
        div {{ weapon.cost }}
    div.hr
    div.mt-3
      me-element(:text="weapon.notes")
</template>

<script>
  import MeElement from "./MeElement.vue";

  export default {
    name: 'WeaponInfo',
    props: ['weapon'],
    components: {
      MeElement
    },
  };
</script>
