<template>
  <v-textarea
    v-model="attrValue"
    outlined
    hide-details
    dense
    :label="label"
    @input="debouncedUpdate()"
  />
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'MeCsCompanionDebouncedTextAreaInput',
  props: {
    value: {
      type: [String, Number],
      default: () => ''
    },
    label: {
      type: String,
      default: null,
      nullable: true
    },
    isInteger: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cachedValue: null
    }
  },
  computed: {
    attrValue: {
      get () {
        return this.cachedValue || this.value
      },
      set (value) {
        this.cachedValue = value
      }
    }
  },
  created () {
    this.debouncedUpdate = debounce(() => {
      this.updateAttr()
    }, 1000)
  },
  methods: {
    updateAttr () {
      let value = this.cachedValue
      if (this.isInteger) {
        value = parseInt(value)
      }
      if (!value) {
        this.cachedValue = this.value
        return
      }
      this.$emit('set', value)
    }
  }
}
</script>
