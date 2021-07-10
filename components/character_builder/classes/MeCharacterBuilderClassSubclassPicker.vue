<template>
  <v-select
    v-model="subklass"
    :items="subklassOptions"
    item-text="name"
    item-value="id"
    label="Subclass"
  />
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
  }
}
</script>
