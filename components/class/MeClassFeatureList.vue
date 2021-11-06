<template>
  <div>
    <template v-for="(feature, index) in features">
      <me-class-feature-item
        :key="feature.id"
        :item="feature"
        :hr="index !== features.length - 1"
        :hr-size="hrSize"
      />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    klassId: {
      type: String,
      required: true
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
  computed: {
    item () {
      return this.$store.getters.getItem('classes', this.klassId)
    },
    abis () {
      if (this.subclass) {
        return false
      }
      const abis = this.item.progression.abi.slice()
      if (this.level) {
        if (!abis.includes(this.level)) {
          return false
        }
        return [abis[abis.indexOf(this.level)], false]
      }
      const first = abis.shift()
      return [first, abis]
    },
    features () {
      const features = this.$store.getters.getData('class-features').filter((i) => {
        const levelTest = this.level ? i.level === this.level : true
        const subclassTest = this.subclass ? i.subclass === this.subclass : !i.subclass
        return i.klass === this.klassId && levelTest && subclassTest
      })
      if (this.abis) {
        features.push(this.createAbiFeatures(...this.abis))
      }
      return features.sort((a, b) => {
        return a.level === b.level
          ? a.id > b.id ? -1 : 1
          : a.level > b.level ? 1 : -1
      })
    }
  },
  methods: {
    createAbiFeatures (first, rest) {
      const atLevel = {
        level: this.$t('level_nth', {
          nth: this.$t(`ordinal_numbers[${first}]`)
        })
      }
      if (rest) {
        atLevel.and_list = this.$t(`lists.and_list[${rest.length}]`, rest.map(i => this.$t(`ordinal_numbers[${i}]`)))
      }
      const abiText = this.$t('abi_feature.text', {
        at_level: this.$tc('abi_feature.at_level', rest ? 2 : 1, atLevel)
      })
      return {
        name: this.$t('ability_score_increase_title'),
        id: `${this.klassId}-ability-score-increase-${first}`,
        level: first,
        klass: this.klassId,
        html: `<p>${abiText}</p><p>${this.$t('abi_feature.feat_text')}</p>`
      }
    }
  }
}
</script>
