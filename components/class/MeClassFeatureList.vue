<template>
  <div v-if="!$fetchState.pending">
    <template v-for="(feature, index) in displayFeatures">
      <me-class-feature-item
        :key="feature.id"
        :item="feature"
        :hr="index !== displayFeatures.length - 1"
        :hr-size="hrSize"
      />
    </template>
  </div>
</template>

<script>
import { KlassMixins } from '~/mixins/klassMixins'

export default {
  mixins: [KlassMixins],
  props: {
    klassId: {
      type: String,
      required: true
    },
    abis: {
      type: [Array, Boolean],
      default: () => false
    },
    level: {
      type: [Number, Boolean],
      default: false
    },
    subclass: {
      type: [String, Boolean],
      default: false
    },
    hrSize: {
      type: [Number, Boolean],
      default: 4
    }
  },
  data () {
    return {
      features: []
    }
  },
  async fetch () {
    const data = await this.$store.dispatch('FETCH_DATA', 'class-features')
    this.features = data.slice().filter(i => i.klass === this.klassId)
  },
  computed: {
    displayFeatures () {
      const features = this.features.filter((i) => {
        const levelTest = this.level ? i.level === this.level : true
        const subclassTest = this.subclass ? i.subclass === this.subclass : !i.subclass
        return levelTest && subclassTest
      })
      if (this.abis && !this.subclass) {
        const pushAbi = this.createAbiFeatures(this.abis, this.level || this.abis[0])
        if (pushAbi) {
          features.push(pushAbi)
        }
      }
      return features.sort((a, b) => {
        return a.level === b.level
          ? a.id > b.id ? -1 : 1
          : a.level > b.level ? 1 : -1
      })
    }
  }
}
</script>
