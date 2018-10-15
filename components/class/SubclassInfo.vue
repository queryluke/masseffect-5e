<template lang="pug">
  div
    v-expansion-panel
      v-expansion-panel-content(v-for="(subclass, index) of item.subclasses" v-bind:key="index")
        div(slot="header")
          div {{ subclass.name }} #[span(v-if="subclass.source") ({{ subclass.source }})]
          div.caption.hidden-sm-and-down {{ subclass.description }}
        v-card.grey.lighten-2
          v-card-text
            div(v-for="(features, i) in subclass.features" v-bind:key="i")
              class-feature(v-for="feature in features" v-bind:key="feature" v-bind:id="feature" v-bind:featureLevel="subClassFeatureLevels[i]")
              div(:class="primaryColor" v-if="subclass.features.length > i + 1").hr
</template>

<script>
  import ClassFeature from '~/components/class/ClassFeature.vue'

  export default {
    components: { ClassFeature },
    computed: {
      subClassFeatureLevels () {
        return this.item.progression.filter(level => level.features.includes('subclass'))
      }
    },
    props: {
      item: Object,
      primaryColor: String
    }
  }
</script>

<style>
  .v-expansion-panel__header {
    height: 64px !important;
  }
</style>

