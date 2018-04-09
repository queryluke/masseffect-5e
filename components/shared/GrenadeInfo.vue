<template lang="pug">
  div
    v-layout
      v-flex.xs12.sm6
        h4 {{ grenade.name }}
    v-layout(row wrap flex-start)
      v-flex.xs12.md3.attribute.mb-2
        label Intensity
        div {{ grenade.damage_amount }}{{ grenade.dd }}
      v-flex.xs12.md3.attribute.mb-2
        label Damage/Effect
        div {{grenade.damage_type }}
      v-flex.xs12.md3.attribute.mb-2
        label Range
        div {{ grenade.range }}
      v-flex.xs12.md3.attribute.mb-2
        label Blast
        div {{ grenade.blast }}
    div.hr
    div.mt-3
      me-element(:text="grenade.desc")
</template>

<script>
  import MeElement from '~/components/shared/MeElement.vue'

  export default {
    components: { MeElement },
    props: ['grenade']
  }
</script>
