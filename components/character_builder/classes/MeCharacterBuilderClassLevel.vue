<template>
  <div>
    <div class="text-h6">
      Number of Levels in this Class
    </div>
    <v-select
      v-model="klassLevel"
      class="ms-2 flex"
      :items="levelArray"
    />
  </div>
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
    levelArray () {
      const posLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      return posLevels.slice(0, posLevels.length - this.level + this.klassLevel)
    }
  }
}
</script>
