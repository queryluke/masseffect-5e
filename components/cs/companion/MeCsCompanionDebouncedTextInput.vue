<template>
  <v-text-field
    v-model="attrValue"
    outlined
    hide-details
    dense
    :clearable="clearable"
    :label="label"
    @input="debouncedUpdate()"
  />
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'MeCsCompanionDebouncedTextInput',
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
    },
    clearable: {
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
    imperial () {
      return this.$store.getters['user/imperial']
    },
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
      if (!value && value !== 0) {
        // this.cachedValue = this.value
        return
      }
      this.$emit('set', value)
    }
  }
}
</script>
