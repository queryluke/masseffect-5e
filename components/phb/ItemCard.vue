<template lang="pug">
  v-card.ma-1
    v-card-title(primary-title)
      div.headline {{ name }}
    v-card-text
      v-layout(row wrap)
        v-flex(xs6)
          p #[strong Capacity]: {{ capacity }}
        v-flex(xs6)
          p #[strong Rarity]: {{ rarity }}
        v-flex(xs12)
          slot(name="description")
    v-card-actions
      slot(name="actions")

</template>

<script>
  export default {
    props: ['capacity', 'rarity', 'name', 'page']
  }
</script>
