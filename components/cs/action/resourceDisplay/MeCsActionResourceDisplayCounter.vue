<template>
  <div class="d-flex">
    <v-btn x-small text class="px-1" @click.stop="$emit('remove')">
      <v-icon size="18">
        mdi-minus
      </v-icon>
    </v-btn>
    <div class="px-1">
      {{ current }}
    </div>
    <v-btn x-small text @click.stop="$emit('add')">
      <v-icon size="18">
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
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
