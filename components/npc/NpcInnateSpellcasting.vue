<template lang="pug">
  div.mb-3
    p(v-for="(item, index) in spellcasting.spellList" v-bind:key="index").my-0 {{ item.perDay }}:
      span(v-for="(spell, index) in item.spells" v-bind:key="spell.id").ml-1
        span #[em {{ spell.id }}]
        span(v-if="spell.higherLevel").ml-1 (as a {{ spell.higherLevel | ordinal }}-level spell)
        span(v-if="index + 1 < item.spells.length") ,
</template>

<script>
export default {
  props: {
    spellcasting: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>
