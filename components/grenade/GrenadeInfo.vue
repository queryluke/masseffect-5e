<template lang="pug">
  div
    v-layout
      v-flex.xs12
        h4.headline {{ grenade.name }}
    v-layout(row wrap flex-start)
      v-flex.xs6.md3.attribute.mb-2
        label Damage
        div {{ grenade.damage }}
      v-flex.xs6.md3.attribute.mb-2
        label Damage Type
        div {{grenade.damageType }}
      v-flex.xs6.md3.attribute.mb-2
        label Range
        div {{ grenade.range }}
      v-flex.xs6.md3.attribute.mb-2
        label Blast
        div {{ grenade.blast }}
    div.hr
    div.mt-3
      markdown-file(:id="grenade.id" itemType="grenades")
</template>

<script>
  export default {
    props: ['grenade']
  }
</script>
