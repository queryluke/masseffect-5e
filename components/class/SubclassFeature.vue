<template lang="pug">
  div
    div(v-for="(subclass, index) in item.subclasses" v-bind:key="index")
      p.display-1.font-weight-thin.mb-2 {{ subclass.name.toUpperCase() }} #[small(v-if="subclass.source") ({{ subclass.source }})]
      div(v-for="featureId in subclass.features[featureIndex]" v-bind:key="featureId")
        class-feature(v-bind:id="featureId" v-bind:featureLevel="level")
      div(:class="primaryColor" v-if="subclass.features.length > index + 1").hr
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
    level: {
      type: Object,
      default: () => { return {} }
    },
    primaryColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    featureIndex () {
      let index = 0
      for (const level of this.item.progression) {
        if (this.level === level) {
          return index
        }
        if (level.features.includes('subclass')) {
          index++
        }
      }
      return ''
    }
  }
}
</script>
