<template>
  <div class="d-flex">
    <v-btn x-small text class="px-1" :disabled="viewOnly" @click.stop="remove()">
      <v-icon size="18">
        mdi-minus
      </v-icon>
    </v-btn>
    <div class="px-1">
      <input
        v-model.number="cachedValue"
        :class="textColor"
        :disabled="viewOnly"
        style="width: 30px; text-align: center"
        @focus.stop
        @click.stop
        @input="debouncedUpdate()"
      >
    </div>
    <v-btn x-small text :disabled="viewOnly" @click.stop="add()">
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
    },
    textColor () {
      return this.$vuetify.theme.dark ? 'white--text' : 'grey--text text--darken-4'
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
    add () {
      if (this.cachedValue + 1 <= this.max) {
        this.cachedValue++
        this.debouncedUpdate()
      }
    },
    remove () {
      if (this.cachedValue - 1 >= 0) {
        this.cachedValue--
        this.debouncedUpdate()
      }
    },
    updateAttr () {
      if (isNaN(parseInt(this.cachedValue, 10))) {
        this.cachedValue = this.current
      }
      if (this.cachedValue >= 0 && this.cachedValue <= this.max) {
        this.$emit('set', this.cachedValue)
      } else {
        this.cachedValue = this.cachedValue < 0 ? 0 : this.max
      }
    }
  }
}
</script>
