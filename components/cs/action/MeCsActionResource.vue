<template>
  <div class="d-flex align-center">
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
    <div v-if="showPer" class="text-caption">
      / {{ item.reset }} rest
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('character')
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
    ...mapGetters({ resources: 'resources/resources', mcBonus: 'mechanics/mcBonus' }),
    item () {
      return { ...this.defaults, ...this.resource, max: { ...this.defaults.max, ...this.resource.max } }
    },
    count: {
      get () {
        return this.resources[this.id] || 0
      },
      set (value) {
        this.SET_RESOURCE({ id: this.id, value })
      }
    },
    component () {
      return `me-cs-action-resource-display-${this.item.displayType}`
    },
    max () {
      return this.mcBonus(this.item.max)
    },
    showPer () {
      return ['short', 'long'].includes(this.item.reset)
    }
  },
  methods: {
    ...mapActions({ SET_RESOURCE: 'resources/SET_RESOURCE' }),
    add () {
      if (this.count + this.item.increment > this.max) {
        return
      }
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
