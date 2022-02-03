<template>
  <v-text-field
    v-model="cachedValue"
    type="number"
    dense
    outlined
    :label="label || undefined"
    :prepend-icon="!hideIcons ? 'mdi-minus' : undefined"
    :append-outer-icon="!hideIcons ? 'mdi-plus' : undefined"
    hide-details
    :disabled="viewOnly"
    :append-icon="clearable ? 'mdi-close' : undefined"
    @click:append="$emit('clear')"
    @input="debouncedUpdate()"
    @click:append-outer="$emit('add')"
    @click:prepend="$emit('remove')"
  />
</template>

<script>
import { debounce } from 'lodash'
export default {
  props: {
    current: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    clearable: {
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Boolean],
      default: false
    },
    hideIcons: {
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
    viewOnly () {
      return this.$store.state.character.viewOnly
    }
  },
  watch: {
    current (newVal) {
      this.cachedValue = newVal
    }
  },
  created () {
    this.cachedValue = this.current
    this.debouncedUpdate = debounce(() => {
      this.updateAttr()
    }, 500)
  },
  methods: {
    updateAttr () {
      if (this.cachedValue >= 0 && this.cachedValue <= this.max) {
        this.$emit('set', this.cachedValue)
      } else {
        this.cachedValue = this.cachedValue < 0 ? 0 : this.max
      }
    }
  }
}
</script>
