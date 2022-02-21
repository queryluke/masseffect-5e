<template>
  <div>
    <v-text-field
      v-if="inputType === 'text'"
      v-model="attrValue"
      outlined
      hide-details
      dense
      clearable
      :label="label"
      @input="debouncedUpdate()"
    />
    <v-textarea
      v-if="inputType === 'textarea'"
      v-model="attrValue"
      auto-grow
      :label="label"
      @input="debouncedUpdate()"
    />
  </div>
</template>

<script>
import { debounce, get as attrGetter } from 'lodash'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCbDebouncedInput',
  props: {
    path: {
      type: String,
      required: true
    },
    inputType: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      cachedValue: null
    }
  },
  computed: {
    ...mapGetters(['character']),
    attrValue: {
      get () {
        return attrGetter(this.character, this.path)
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
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: this.path, value: this.cachedValue })
    }
  }
}
</script>
