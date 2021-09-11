<template lang="pug">
  div
    p.display-1.font-weight-thin.mb-2
      span(v-if="title") {{ item.name }}
    p.title {{ item.size | capitalize }} {{ item.type | capitalize }}
      span(v-if="item.subtype").ml-1 ({{ item.subtype }})
    v-layout(align-center justify-space-between row)
      p.subheading CR: {{ item.cr }}
      p.subheading Cost: {{ item.cost | groupDigits(',') }}
    v-progress-linear(:value="100" color="secondary")
    v-container.py-0
      v-layout
        v-flex(xs6 md4 lg2).text-xs-center.my-2
          p.ma-0 #[strong Hull Points]
          p.ma-0 {{ item.hp }}
        v-flex(xs6 md4 lg2).text-xs-center.my-2
          p.ma-0 #[strong Shield Points]
          p.ma-0 {{ item.sp }}
        v-flex(xs6 md4 lg2).text-xs-center.my-2
          p.ma-0 #[strong AC]
          p.ma-0 {{ item.ac }}
        v-flex(xs6 md4 lg2).text-xs-center.my-2
          p.ma-0 #[strong Speed]
          p.ma-0 {{ item.speed }}
        v-flex(xs6 md4 lg2).text-xs-center.my-2
          p.ma-0 #[strong Range]
          p.ma-0 {{ item.range.distance }} {{ item.range.units }}
        v-flex(xs6 md4 lg2).text-xs-center.my-2
          p.ma-0 #[strong Crew]
          p.ma-0 min: {{ item.crew.min }} | max: {{ item.crew.max }}
    v-progress-linear(:value="100" color="secondary")
    div.mb-2
      p.title Systems
      ul.mb-2
        li(v-for="(system, index) in item.systems" v-bind:key="index")
          strong(v-if="system.type === 'combined'") Combined, #[em {{ system.systems.join(" / ") }}]:
          strong(v-else) {{ system.type }}:
          span.ml-1 {{ system.crew }} crew
        li #[strong Cargo Capacity]: {{ item.cargo }} {{ item.cargo | pluralize('tonne') }}
    div(v-if="item.weapons").mb-2
      p.title Weapons
      ul.mb-2
        li(v-for="weapon in item.weapons" v-bind:key="weapon.name") #[strong {{ weapon.name }}.]
          me-html(:content="weapon.damage")
    div
      p.title Description
      me-html(:content="item.html")
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => { return {} }
    },
    title: {
      type: Boolean,
      default: true
    }
  }
}
</script>
