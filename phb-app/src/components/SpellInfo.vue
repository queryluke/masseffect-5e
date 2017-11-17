<template lang="pug">
  div
    v-layout
      v-flex.xs12.sm6
        h4 {{ spell.name }}
      v-flex.xs12.sm6
        spell-class-list(:spell="spell")
    v-layout(row wrap flex-start)
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Type
        div
          spell-type(:spell="spell")
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Casting Time
        div {{ spell.casting_time }}
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Duration
        div
          spell-duration(:spell="spell")
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Range/Area
        div
          spell-range-area(:spell="spell")
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Attack Type
        ul.list-unstyled
          li(v-for="at in spell.attack_type" v-bind:key="at") {{ at }}
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Damage Type
        ul.list-unstyled
          li(v-for="dmg in spell.damage_type" v-bind:key="dmg") {{ dmg }}
      v-flex.xs12.sm4.md3.attribute.mb-2
        label Effect
        ul
          li(v-for="effect in spell.effect" v-bind:key="effect") {{ effect }}
    div.hr
    div.mt-3
      me-element(:text="spell.mechanic")
      v-layout(row wrap justify-space-around)
        v-flex(v-for="option in spell.adv_options" v-bind:key="spell.id").xs12.md6
          advanced-option(:option="option")
</template>

<script>
  import SpellType from "./SpellType.vue";
  import SpellDuration from "./SpellDuration.vue";
  import SpellRangeArea from "./SpellRangeArea.vue";
  import SpellDamageEffect from "./SpellDamageEffect.vue";
  import AdvancedOption from "./AdvancedOption.vue";
  import SpellClassList from "./SpellClassList.vue";
  import MeElement from "./MeElement.vue";

  export default {
    name: 'SpellInfo',
    props: ['spell'],
    components: {
      SpellClassList, AdvancedOption, SpellType, SpellDuration, SpellRangeArea, SpellDamageEffect, MeElement
    },
  };
</script>
