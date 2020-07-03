<template lang="pug">
  div
    v-card(v-for="(subclass, index) of item.subclasses" v-bind:key="index").mb-3.elevation-0
      v-card-text
        p.display-1.font-weight-thin {{ subclass.name.toUpperCase() }} #[small(v-if="subclass.source") ({{ subclass.source }})]
        p {{ subclass.description }}
        div(v-for="(features, i) in subclass.features" v-bind:key="i")
          class-feature(v-for="feature in features" v-bind:key="feature" v-bind:id="feature" v-bind:featureLevel="subClassFeatureLevels[i]")
          div(:class="primaryColor" v-if="subclass.features.length > i + 1").hr
</template>

<script>
import ClassFeature from '~/components/class/ClassFeature.vue'

export default {
  components: { ClassFeature },
  props: {
    item: {
      type: Object,
      default: () => { return {} }
    },
    primaryColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    subClassFeatureLevels () {
      return this.item.progression.filter(level => level.features.includes('subclass'))
    }
  }
}
</script>

<style>
  .v-expansion-panel__header {
    height: 64px !important;
  }
</style>
