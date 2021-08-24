<template>
  <v-slider
    v-model="value"
    :label="label"
    :step="tickSize"
    :max="max"
  >
    <template #append>
      <me-distance v-if="value > 0" :length="value" abbr />
    </template>
    <template #thumb-label>
      <me-distance v-if="value > 0" :length="value" abbr />
    </template>
  </v-slider>
</template>

<script>
import { get as getAttr } from 'lodash'
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    label: {
      type: String,
      required: true
    },
    tickSize: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    attr: {
      type: String,
      required: true
    }
  },
  computed: {
    value: {
      get () {
        return getAttr(this.character.settings, this.attr) || 0
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `settings.${this.attr}`, value })
      }
    }
  }
}
</script>
