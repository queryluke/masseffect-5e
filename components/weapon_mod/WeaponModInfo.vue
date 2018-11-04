<template lang="pug">
  div
    v-layout
      v-flex.xs12
        h4.headline {{ mod.name }}
        p #[em {{ mod.description }}]
    v-layout(row wrap flex-start)
      v-flex.xs4.attribute.mb-2
        label Placement
        div {{ mod.placement }}
      v-flex.xs4.attribute.mb-2
        label Weapon Availability
        div {{ mod.availability }}
      v-flex.xs4.attribute.mb-2
        label Cost
        div {{ mod.cost | groupDigits(',') }}
      v-flex.xs12
        div.hr
        p {{ mod.feature }}
</template>

<script>
  export default {
    props: {
      mod: {
        type: Object,
        default: () => { return {} }
      },
    }
  }
</script>
