<template>
  <div v-if="items.length" class="mb-2">
    <div class="text-subtitle-1 mt-3 mb-n3">
      <slot />
    </div>
    <me-hr size="1" />
    <div>
      <slot name="notes" />
    </div>
    <div v-for="(item, index) in items" :key="`action-${index}`">
      <me-cs-action-list-group v-if="item.group" :items="item.items" :component="item.component">
        {{ item.title }}
      </me-cs-action-list-group>
      <me-cs-action-card v-else :item="item" :class="items[index - 1] && (items[index - 1].resource || items[index - 1].toggle) ? 'mt-4' : 'mt-1'" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeCsActionList',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
