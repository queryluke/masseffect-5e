<template>
  <component
    :is="component"
    :reset="item.reset"
    :current="count"
    :max="max"
    @add="add"
    @remove="remove"
    @reset="reset"
    @set="set"
  />
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('cs')
export default {
  name: 'MeCsActionResource',
  props: {
    id: {
      type: String,
      required: true
    },
    resource: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      defaults: {
        displayType: 'checkbox',
        reset: 'long',
        resetTo: 0,
        max: {
          type: 'flat',
          value: 1,
          min: 1
        },
        increment: 1
      }
    }
  },
  computed: {
    ...mapGetters(['character']),
    item () {
      return { ...this.defaults, ...this.resource, max: { ...this.defaults.max, ...this.resource.max } }
    },
    count: {
      get () {
        return this.character.currentStats.resources[this.id] || 0
      },
      set (value) {
        console.log(this.id)
        this.setResource({ id: this.id, value })
      }
    },
    component () {
      return `me-cs-action-resource-display-${this.item.displayType}`
    },
    max () {
      return 1 // this.mcBonus(this.item.max)
    },
    mod () {
      if (this.item.mod) {
        return 0 // this.absMod(this.item.mod)
      }
      return 0
    }
  },
  methods: {
    ...mapActions(['setResource']),
    add () {
      if (this.count + this.item.increment > this.max) {
        return
      }
      console.log(this.item.increment)
      this.count += this.item.increment
    },
    remove () {
      if (this.count - 1 < 0) {
        return
      }
      this.count--
    },
    set (value) {
      this.count = value
    },
    reset () {
      this.count = this.item.resetTo === 'max' ? this.max : 0
    }
  }
}
</script>
