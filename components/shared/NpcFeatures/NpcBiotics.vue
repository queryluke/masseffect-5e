<template lang="pug">
  div.mb-3
    div(v-if="stats.spellcasting.level === 'innate'")
      p.mb-0.
        #[strong #[em Innate Biotics]]. The {{ stats.name }}'s innate biotic ability is {{ stats.spellcasting.mod }} (spell save DC
        {{ stats.spellcasting.dc }}, +{{ stats.spellcasting.hit }} to hit with biotic attacks). It can innately cast the following:
      div(v-for="(spellLevel, spellLevelIndex) in stats.spellcasting.spells" v-bind:key="spellLevelIndex")
        p(v-if="spellLevel.level === 'cantrip'").my-0 At will: #[em {{ spellLevel.spells.map(spell => spell.name.toLowerCase()).join(', ') }}]
        p(v-else).my-0 {{ spellLevel.level}}/day each
          span(v-if="spellLevel.spells.length > 0") : #[em {{ spellLevel.spells.map(spell => spell.name.toLowerCase()).join(', ') }}]
    div(v-else)
      p.mb-0.
        #[strong #[em Biotics].] The {{ stats.name }} is {{ stats.spellcasting.level | article }} {{ stats.spellcasting.level | ordinal }}-level
        biotic. Its biotic ability is {{ stats.spellcasting.mod }} (spell save DC {{ stats.spellcasting.dc }}, +{{ stats.spellcasting.hit }} to hit with spell attacks).
        The {{ stats.name }} has the following biotic spells:
      div(v-for="(spellLevel, spellLevelIndex) in stats.spellcasting.spells" v-bind:key="spellLevelIndex")
        p(v-if="spellLevel.level === 'cantrip'").my-0 Cantrips (at will): #[em {{ spellLevel.spells.map(spell => spell.name.toLowerCase()).join(', ') }}]
        p(v-else).my-0 {{ spellLevel.level | ordinal }} level ({{ spellLevel.slots }} {{ spellLevel.slots | pluralize('slot') }})
          span(v-if="spellLevel.spells.length > 0") : #[em {{ spellLevel.spells.map(spell => spell.name.toLowerCase()).join(', ') }}]
</template>

<script>
  export default {
    props: ['stats']
  }
</script>

