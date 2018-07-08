<template lang="pug">
  div.mb-3
    div(v-if="stats.techcasting.level === 'innate'")
      p.mb-0.
        #[strong #[em Innate Tech]]. The {{ stats.name }}'s innate tech ability is Intelligence (spell save DC
        {{ stats.techcasting.dc }}, +{{ stats.techcasting.hit }} to hit with tech attacks). It can innately cast the following for
        {{ stats.techcasting.tpSpent }} tech {{ stats.techcasting.tpSpent | pluralize('point') }}:
      p.my-0 {{ stats.techcasting.perDay ? `${stats.techcasting.perDay}/Day` : 'Recharge 4-6' }}: #[em {{ stats.techcasting.spells.map(spell => spell.name).join(', ') }}]
    div(v-else)
      p.mb-1.
        #[strong #[em Tech Powers ({{ stats.techcasting.perDay }}/Day)].] The {{ stats.name }} can cast {{ stats.techcasting.perDay }}
        tech {{ stats.techcasting.perDay | pluralize('power') }} from the following list per day. When it casts a tech power that requires X tech points, it casts the power with
        {{ stats.techcasting.tpSpent }} tech {{ stats.techcasting.tpSpent | pluralize('point') }}. Its tech ability is Intelligence (spell save DC {{ stats.techcasting.dc }},
        +{{ stats.techcasting.hit }} to hit with tech attacks).
      p.my-0 Known tech powers: #[em {{ stats.techcasting.spells.map(spell => spell.name).join(', ') }}]
</template>

<script>
  export default {
    props: ['stats']
  }
</script>

