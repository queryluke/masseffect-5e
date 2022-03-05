<template>
  <div>
    <me-species-asis v-if="renderAsi" :item="item" />
    <me-species-trait v-if="item.age" :label="$t('age_title')">
      {{ item.age }}
    </me-species-trait>
    <me-species-trait v-if="item.alignment" :label="$t('alignment_title')">
      {{ item.alignment }}
    </me-species-trait>
    <me-species-trait v-if="item.size" :label="$t('size_title')">
      {{ item.size }}
    </me-species-trait>
    <me-species-speed v-if="renderSpeed" :item="item" />
    <template v-for="trait in traits">
      <me-species-trait :key="trait.id" :label="trait.name">
        <me-html :content="trait.html" />
      </me-species-trait>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    variant: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    baseSpecies () {
      return this.variant ? this.$store.getters.getItem('species', this.item.species) : false
    },
    renderAsi () {
      if (!this.variant) {
        return true
      }
      if (this.item.abilityScoreIncrease !== this.baseSpecies.abilityScoreIncrease) {
        return true
      }
      const asis = (this.item.mechanics || []).filter(i => i.type.startsWith('asi'))
      const baseAsis = (this.baseSpecies.mechanics || []).filter(i => i.type.startsWith('asi'))
      if (baseAsis.length !== asis.length) {
        return true
      }
      for (const asi of asis) {
        const match = baseAsis.find(i => i.type === asi.type && (i.ability === asi.ability || i.limit === asi.limit))
        if (!match) {
          return true
        }
      }
      return false
    },
    renderSpeed () {
      if (!this.variant) {
        return true
      }
      const speeds = (this.item.mechanics || []).filter(i => i.type === 'speed')
      const baseSpeeds = (this.baseSpecies.mechanics || []).filter(i => i.type === 'speed')
      if (baseSpeeds.length !== speeds.length) {
        return true
      }
      for (const speed of speeds) {
        const match = baseSpeeds.find(i => i.speed === speed.speed)
        if (!match) {
          return true
        }
        if (match.distance !== speed.distance) {
          return true
        }
      }
      return false
    },
    traits () {
      return this.$store.getters.getData('traits').filter((i) => {
        return (i.species?.includes(this.item.id) || i.subspecies?.includes(this.item.id)) &&
          (this.variant ? !i.species.includes(this.item.species) : true)
      })
    }
  }
}
</script>
