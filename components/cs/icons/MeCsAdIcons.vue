<template>
  <span v-if="mechanics.length">
    <me-cs-ad-icon v-if="ad.has" small>
      {{ ad.flat ? '' : ad.notes }}
    </me-cs-ad-icon>
    <me-cs-ad-icon v-if="dis.has" small type="d">
      {{ dis.flat ? '' : dis.notes }}
    </me-cs-ad-icon>
  </span>
</template>

<script>

export default {
  name: 'MeCsAdIcons',
  props: {
    type: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    mechanics () {
      return this.$store.getters['character/mechanics/mechanics'].filter(i => i.type === this.type && i.value?.includes(this.value) && ['advantage', 'disadvantage'].includes(i.effect?.type))
    },
    ad () {
      return this.processAbilityAorD('advantage')
    },
    dis () {
      return this.processAbilityAorD('disadvantage')
    }
  },
  methods: {
    processAbilityAorD (which) {
      const mc = this.mechanics.filter(i => i.effect.type === which)
      const notes = mc.filter(i => i.effect.note)
      return {
        has: mc.length > 0,
        flat: mc.length && mc.length > notes.length,
        notes: notes.map(i => i.effect?.note).join(', ')
      }
    }
  }
}
</script>
