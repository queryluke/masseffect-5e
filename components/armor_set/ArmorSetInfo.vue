<template lang="pug">
  div
    v-layout
      v-flex.xs12
        h4.headline {{ set.name }}
          v-chip(v-if="andromeda" small dark color="secondary").ml-3 Andromeda
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
        ul.list-unstyled
          li(v-for="(f, index) in benefits" v-bind:key="index").subheading {{ f }}
        v-card(xs12 md8 v-if="setBonus.length > 0").mt-4
          v-card-text
            p.ma-0.body-2 Set Bonuses
            dl(v-for="(f, index) in setBonus" v-bind:key="index")
              dt #[strong ({{ setBonusGroup(f) }})]
              dd {{ setBonusText(f) }}
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
      },
      setBonus () {
        return this.set.setBonus ? this.set.setBonus.split('--').map(f => f.trim()) : []
      },
      andromeda () {
        return this.set.andromeda === 'x'
      }
    },
    methods: {
      setBonusGroup(bonus) {
        const match = bonus.match(/\d of \d/)
        return match ? match[0] : ''
      },
      setBonusText(bonus) {
        const split = bonus.split(':')
        return split[1] ? split[1] : ''
      }
    }
  }
</script>
