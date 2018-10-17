<template lang="pug">
  div
    h4.headline {{ program.name }}
    p
      em.
        {{ program.rarity | titlecase }} #[span(v-if="program.installation") (requires installation)]
    div.hr
    div
      markdown-file(:id="program.id" itemType="programs")
</template>

<script>
  export default {
    props: ['program']
  }
</script>
