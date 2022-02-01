<template>
  <v-text-field
    v-model="cachedValue"
    type="number"
    dense
    outlined
    prepend-icon="mdi-minus"
    append-outer-icon="mdi-plus"
    hide-details
    :disabled="viewOnly"
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
