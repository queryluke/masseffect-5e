<template lang="pug">
  div
    v-layout
      v-flex.xs12
        h4.headline {{ set.name }}
        p #[em {{ set.description }}]
    v-layout(row wrap flex-start)
      v-flex.xs4.attribute.mb-2
        label Type
        div {{ set.type }}
      v-flex.xs4.attribute.mb-2
        label Armor Type
        div {{ set.armorType }}
      v-flex.xs4.attribute.mb-2
        label Cost
        div {{ set.cost | groupDigits(',') }}
      v-flex.xs12
        div.hr
        ul
          li(v-for="(f, index) in benefits" v-bind:key="index") {{ f }}
</template>

<script>
  export default {
    props: {
      set: {
        type: Object,
        default: () => { return {} }
      },
    },
    computed: {
      benefits () {
        return this.set.feature ? this.set.feature.split('--').map(f => f.trim()) : []
      }
    }
  }
</script>
