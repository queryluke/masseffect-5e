<template lang="pug">
  div
    p.display-1.font-weight-thin.mb-2
      span(v-if="title") {{ item.name }}
      span(v-if="item.createdBy").body-1.pl-2 #[em created by: {{ item.createdBy }}]
    p.title {{ item.size | capitalize }} {{ item.vehicle.type | capitalize }}
      span(v-if="item.vehicle.subtype").ml-1 ({{ item.vehicle.subtype }})
    v-layout(align-center justify-space-between row)
      p.subheading CR: {{ item.cr }}
      p.subheading Cost: {{ item.cost | groupDigits(',') }}
    div.hr
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
          p.ma-0 {{ item.range }}
        v-flex(xs6 md4 lg2).text-xs-center.my-2
          p.ma-0 #[strong Crew]
          p.ma-0 min: {{ item.crew.min }} | max: {{ item.crew.max }}
    div.hr
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
        li(v-for="weapon in item.weapons" v-bind:key="weapon.name") #[strong {{ weapon.name }}.] {{ weapon.damage }}
    div
      p.title Description
      markdown-file(:id="item.id" itemType="vehicles")
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
