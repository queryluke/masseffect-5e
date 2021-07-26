<template>
  <me-character-builder-aspect :aspect="{name: $tc('background_title', 1) }" :has-selections="backgroundHasSelections" class="mb-3">
    <v-autocomplete v-model="backgroundId" :items="backgrounds" item-value="id" item-text="name" />
    <div v-if="backgroundId">
      <template v-for="mechanic in backgroundData.mechanics.filter(i => i.choices)">
        <me-character-builder-selectable :key="mechanic.id" :selectable="mechanic" :source="`background-${backgroundId}-${mechanic.id}`" />
      </template>
      <me-html v-if="!loading" :content="backgroundData.html" class="mt-3" />
    </div>
  </me-character-builder-aspect>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      loading: false
    }
  },
  watch: {
    backgroundId (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.loading = true
        // FIXME: ugly race condition here, need to find a better way to re-trigger the html content render
        setTimeout(() => {
          this.loading = false
        }, 100)
      }
    }
  }
}
</script>
