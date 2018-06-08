<template lang="pug">
  div
    v-expansion-panel
      v-expansion-panel-content(v-for="(item, index) of items" v-bind:key="index")
        div(slot="header")
          div {{ item.name }}
          div.caption {{ item.description }}
        v-card.grey.lighten-2
          v-card-text
            div(v-for="(feature, i) in item.features" v-bind:key="i")
              p.title {{ feature.name }}
              me-element(v-bind:text="feature.description.mechanic")
              div(:class="primaryColor" v-if="item.features.length > i + 1").hr
</template>

<script>
  import MeElement from '~/components/shared/MeElement.vue'

  export default {
    components: { MeElement },
    props: ['items', 'primaryColor']
  }
</script>

