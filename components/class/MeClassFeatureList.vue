<template>
  <div v-if="!$fetchState.pending">
    <template v-for="(feature, index) in features">
      <me-class-feature-item
        :key="feature.id"
        :item="feature"
        :hr="index !== features.length - 1"
        :hr-size="hrSize"
      />
    </template>
    <div v-if="includeSubclass">
      <me-subclass-feature-list :klass-id="item.id" :level="level" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    klassId: {
      type: String,
      required: true
    },
    abiArray: {
      type: [Array, Boolean],
      default: () => false
    },
    level: {
      type: [Number, Boolean],
      default: false
    },
    includeSubclass: {
      type: Boolean,
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
    const features = data.slice()
    if (this.abiArray) {
      features.concat(this.abis)
    }
    this.features = features.filter((i) => {
      const levelTest = this.level ? i.level === this.level : true
      const subclassTest = this.subclass ? i.subclass === this.subclass : !i.subclass
      return i.klass === this.klassId && subclassTest && levelTest
    }).sort((a, b) => {
      return a.level === b.level
        ? a.id > b.id ? -1 : 1
        : a.level > b.level ? 1 : -1
    })
  },
  computed: {
    abis () {
      if (!this.abiArray) {
        return false
      }
      const abiLevels = this.abiArray.slice()
      const first = abiLevels.shift
      const abiText = this.$t('character.klass.progression.abi.text', {
        level: this.$t('level.nth', {
          level: this.$t(`numbers.ordinal[${first}]`)
        }),
        and_list: this.$t('lists.and_list', abiLevels.map(i => this.$t(`numbers.ordinal[${i}]`)))
      })
      return this.item.progression.abi.map((i) => {
        return {
          name: this.$t('character.klass.progression.abi.title'),
          id: `${this.item.id}-ability-score-increase-${i}`,
          i,
          class: this.item.id,
          html: `<p>${abiText}</p><p>${this.$t('character.klass.abi.progression.feat_text')}</p>`
        }
      })
    }
  }
}
</script>
