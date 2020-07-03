<template lang="pug">
  div
    p.display-1.font-weight-thin.mb-2
      span(v-if="title") {{ item.name }}
    v-layout(row wrap flex-start)
      v-flex.xs6.md3.attribute.mb-2
        label Damage
        div {{ item.damage }}
      v-flex.xs6.md3.attribute.mb-2
        label Damage Type
        div {{item.damageType }}
      v-flex.xs6.md3.attribute.mb-2
        label Range
        div {{ item.range }}
      v-flex.xs6.md3.attribute.mb-2
        label Blast
        div {{ item.blast }}
    div.hr
    div.mt-3
      markdown-file(:id="item.id" itemType="grenades")
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
