<template lang="pug">
  div.mb-3.text-body-2
    p(v-for="(item, index) in powercasting.powerList" v-bind:key="index").my-0 {{ item.perDay }}:
      span(v-for="(power, index) in item.powers" v-bind:key="power.id").ml-1
        span #[em {{ power.id }}]
        span(v-if="power.higherLevel").ml-1 (as a {{ power.higherLevel }}{{ power.higherLevel | ordinal }}-level power)
        span(v-if="index + 1 < item.powers.length") ,
</template>

<script>
export default {
  props: {
    powercasting: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>
