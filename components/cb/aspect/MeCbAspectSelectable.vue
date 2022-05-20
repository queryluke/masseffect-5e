<template>
  <div>
    <component
      :is="component"
      :id="id"
      :mechanic="mechanic"
      :hide-selected-models="mechanic.hide"
      :current-value="currentValue"
      :expertise="type === 'expertise'"
      :no-label="noLabel"
      @upsert="upsert"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/selections')
export default {
  name: 'MeCbAspectSelectable',
  props: {
    mechanic: {
      type: Object,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    noLabel: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['selected']),
    component () {
      return this.type.startsWith('powercasting')
        ? 'me-cb-choices-powercasting'
        : this.type === 'expertise'
          ? 'me-cb-choices-skill'
          : `me-cb-choices-${this.type}`
    },
    currentValue () {
      // NOTE...currentValue is always an array since the selectable component always returns an array of selections
      // even if there is only 1 selection, its always an array
      const selectObj = this.selected.find(i => i.path === this.id && (this.limitString ? i.limit === this.limitString : true))
      return selectObj?.value || []
    },
    id () {
      return `${this.path}/${this.type === 'model' ? this.mechanic.model : this.type}`
    },
    type () {
      return this.mechanic.type.replace('-choice', '')
    },
    limitString () {
      return this.mechanic.limits ? JSON.stringify(this.mechanic.limits) : false
    }
  },
  methods: {
    upsert (value) {
      this.$store.dispatch('character/selections/UPSERT_SELECTION', { path: this.id, value, limit: this.limitString })
    }
  }
}
</script>
