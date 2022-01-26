<template>
  <div v-if="items.length">
    <div class="text-subtitle-1 mt-3">
      <slot />
    </div>
    <me-hr size="1" />
    <me-cs-action-card v-for="(item, index) in items" :key="`action-${index}`" :item="item" />
  </div>
</template>

<script>

import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  name: 'MeCsActionList',
  mixins: [CharacterBuilderHelpers],
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
