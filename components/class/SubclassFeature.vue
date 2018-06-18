<template lang="pug">
  div.markdown-file
    p.headline Subclass Feature
    div(v-for="(subclass, index) in item.subclasses" v-bind:key="index")
      p.title #[em {{ subclass.name }}]
      div(v-for="featureId in subclass.features[featureIndex]")
        class-feature(v-bind:id="featureId" v-bind:level="level")
      div(:class="primaryColor" v-if="subclass.features.length > index + 1").hr
</template>

<script>
  import {mapGetters} from 'vuex'
  import {EnhanceMarkdown} from '~/mixins/enhanceMarkdown.js'
  import ClassFeature from '~/components/class/ClassFeature.vue'

  export default {
    components: { ClassFeature },
    computed: {
      ...mapGetters(['getData']),
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
    methods: {
      markdownFile (id) {
        return this.enhanceMarkdown(require(`~/data/class_features/${id}.md`), this.level)
      }
    },
    mixins: [EnhanceMarkdown],
    props: {
      item: Object,
      level: Object,
      primaryColor: String
    }
  }
</script>
