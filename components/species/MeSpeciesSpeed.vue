<template>
  <me-species-trait v-if="displaySpeed" :label="$t('speed_title')">
    <me-html :content="speedText" />
  </me-species-trait>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    displaySpeed () {
      return (this.speeds && this.speeds.length) || this.item.speedColor
    },
    speeds () {
      return this.item.mechanics?.filter(i => i.type === 'speed')
    },
    speedText () {
      const speedsTextArray = this.speeds.map((i) => {
        return this.$t('speed_trait', {
          type: this.$t(`speeds.${i.speed}.text`),
          distance: `<me-distance length="${i.distance}" />`
        })
      })
      const list = this.$t(`lists.comma_list[${speedsTextArray.length}]`, speedsTextArray)
      const text = this.item.speedColor ? `${this.item.speedColor} ` : ''
      return `${text}${list}`
    }
  }
}
</script>
