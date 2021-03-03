<template>
  <div>
    <me-class-feature
      v-for="(feature, index) in classFeatures.base"
      :key="feature.id"
      :item="feature"
      :hr="index !== classFeatures.base.length - 1"
    />
    <div
      v-if="includeSubclass"
    >
      <div
        v-for="(subclassFeatures, scid, subIndex) in classFeatures.subclass"
        :key="scid"
        class="mt-10"
      >
        <p
          v-if="showSubclassHeader"
          class="text-h4 font-weight-thin"
        >
          {{ subclass(scid).name }}
        </p>
        <div
          v-if="showSubclassDesc"
        >
          <me-html :content="subclass(scid).html" />
        </div>
        <me-class-feature
          v-for="(scFeature, scIndex) in subclassFeatures"
          :key="scFeature.id"
          :item="scFeature"
          :hr="scIndex !== subclassFeatures.length - 1"
          :hr-size="1"
        />
        <me-hr v-if="subIndex !== Object.keys(classFeatures.subclass).length -1" :color="hrColor" :size="6" class="mt-10" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    classId: {
      type: String,
      default: ''
    },
    level: {
      type: [Number, Boolean],
      default: false
    },
    includeSubclass: {
      type: Boolean,
      default: false
    },
    subclassFilter: {
      type: [String, Boolean],
      default: false
    },
    showSubclassHeader: {
      type: Boolean,
      default: false
    },
    showSubclassDesc: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    item () {
      return this.$store.getters.getItem('classes', this.classId)
    },
    subclasses () {
      return this.$store.getters.getData('subclasses').filter(i => i.class === this.item.id)
    },
    classFeatures () {
      // all class features
      let features = this.$store.getters.getData('class-features').filter(i => i.class === this.item.id)
      // filtered by level
      if (this.level) {
        features = features.filter(i => i.level === parseInt(this.level, 10))
        if (this.item.abiLevels.includes(this.level)) {
          features.push(this.createAbi(this.level))
        }
      } else {
        // add ABIs
        for (const level of this.item.abiLevels) {
          features.push(this.createAbi(level))
        }
      }
      // remove subclass features if not included
      if (!this.includeSubclass) {
        features = features.filter(i => !i.subclass)
      }
      // filter by subclass
      if (this.includeSubclass && this.subclassFilter) {
        features = features.filter(i => i.subclass === this.subclassFilter)
      }
      return {
        base: this.sortByLevel(features.filter(i => !i.subclass)),
        subclass: this.groupBySubclass(this.sortByLevel(features.filter(i => i.subclass)))
      }
    },
    hrColor () {
      return this.$store.getters['config/classThemeHrColor'](this.classId)
    }
  },
  methods: {
    subclass (id) {
      return this.subclasses.find(i => i.id === id)
    },
    oLevel (level) {
      return `${level}${this.$options.filters.ordinal(level)}`
    },
    createAbi (level) {
      const addLevel = this.item.abiLevels.slice(this.item.abiLevels.indexOf(level) + 1).map(i => this.oLevel(i))
      const addLevelText = addLevel.length > 0 ? `and again at ${addLevel.join(', ')}, ` : ''
      let text = `<p>At ${this.oLevel(level)} level, ${addLevelText}you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. You can't increase an ability score above 20 using this feature.</p>`
      text += '<p>Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.</p>'
      return {
        name: 'Ability Score Increase',
        id: `${this.item.id}-ability-score-increase-${level}`,
        level,
        class: this.item.id,
        html: text
      }
    },
    sortByLevel (features) {
      return features.sort((a, b) => {
        return a.level === b.level
          ? a.id > b.id ? -1 : 1
          : a.level > b.level ? 1 : -1
      })
    },
    groupBySubclass (features) {
      return features.reduce((acc, curr) => {
        (acc[curr.subclass] = acc[curr.subclass] || []).push(curr)
        return acc
      }, {})
    }
  }
}
</script>
