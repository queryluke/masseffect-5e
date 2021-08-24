<template>
  <v-list-item two-line class="px-0 px-sm-3">
    <v-list-item-avatar v-if="$vuetify.breakpoint.smAndUp" tile>
      <v-img :src="require(`~/assets/images/classes/${klass.id}.svg`)" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ klassData.name }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ classLevel }}{{ subclassLabel }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action v-if="$vuetify.breakpoint.smAndUp">
      <me-character-builder-class-remove-btn :class-index="classIndex" />
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'
export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    classIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    classLevel () {
      return this.$t('level_nth', { nth: this.$t(`ordinal_numbers[${this.klass.levels}]`) })
    },
    subclassLabel () {
      return this.subklass ? `, ${this.subklassData.name}` : ''
    }
  }
}
</script>
