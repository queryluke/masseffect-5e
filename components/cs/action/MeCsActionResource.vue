<template>
  <div class="d-flex align-center">
    <v-btn
      v-if="item.reset === 'manual' && item.displayType !== 'heat'"
      x-small
      class="mr-1"
      color="primary"
      icon
      @click.stop="reset"
    >
      <v-icon size="18">
        mdi-refresh
      </v-icon>
    </v-btn>
    <component
      :is="component"
      :id="id"
      :reset="item.reset"
      :current="count"
      :max="max"
      :vented="item.vented"
      :max-width="75"
      @add="add"
      @remove="remove"
      @reset="reset"
      @set="set"
    />
    <div v-if="resetText" class="text-caption mr-1">
      {{ resetText }}
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
        vented: false,
        increment: 1,
        trigger: false
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
        return parseInt((this.resources[this.id] || 0), 10)
      },
      set (value) {
        const int = parseInt(value, 10)
        if (isNaN(int)) {
          return
        }
        this.SET_RESOURCE({ id: this.id, value: int })
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
    },
    resetText () {
      return this.item.displayType === 'gear-consumable'
        ? false
        : this.item.label || (this.showPer ? `/ ${this.item.reset} rest` : false)
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
