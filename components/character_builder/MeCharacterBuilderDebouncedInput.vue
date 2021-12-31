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
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
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
    }, 500)
  },
  methods: {
    updateAttr () {
      this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: this.path, value: this.cachedValue })
    }
  }
}
</script>
