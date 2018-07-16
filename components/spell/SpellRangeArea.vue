<template>
  <div>
    <span>
      {{ spell.distance.range }}
    </span>
    <span v-if="spell.distance.aoeDistance">
      ({{ spell.distance.aoeDistance }} <v-avatar size="18" tile><img :src="`/images/aoe/${spell.distance.aoeType}.svg`" :alt="spell.distance.aoeType" /></v-avatar>)
    </span>
  </div>
</template>

<script>
  export default {
    props: ['spell']
  }
</script>
