<template>
  <v-autocomplete
    ref="autocomplete"
    v-model="input"
    label="Add New"
    :items="items"
    item-text="name"
    item-value="id"
    return-object
    @change="add"
  />
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      input: null
    }
  },
  computed: {
    items () {
      return this[this.type]
    }
  },
  methods: {
    add (item) {
      if (item) {
        this.addEquipment(this.type, item)
      }
      this.reset()
    },
    reset () {
      this.$nextTick(() => {
        this.input = null
        this.$refs.autocomplete.internalSearch = null
      })
    }
  }
}
</script>
