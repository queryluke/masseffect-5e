<template lang="pug">
  div.markdown-file
    p.headline Subclass Feature
    div(v-for="(subclass, index) in item.subclasses" v-bind:key="index")
      p.title.mb-2 #[em {{ subclass.name }}]
      div(v-for="featureId in subclass.features[featureIndex]")
        class-feature(v-bind:id="featureId" v-bind:featureLevel="level")
      div(:class="primaryColor" v-if="subclass.features.length > index + 1").hr
</template>

<script>
  import ClassFeature from '~/components/class/ClassFeature.vue'

  export default {
    components: { ClassFeature },
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
      }
    },
    props: {
      item: Object,
      level: Object,
      primaryColor: String
    }
  }
</script>
