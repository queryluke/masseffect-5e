<template>
  <div v-if="items.length">
    <div class="text-subtitle-1 mt-3 mb-n3">
      <slot />
    </div>
    <me-hr size="1" />
    <div v-for="(item, index) in items" :key="`action-${index}`">
      <me-cs-action-list-base v-if="item.base" :items="item.items">
        {{ item.title }}
      </me-cs-action-list-base>
      <me-cs-action-list-group v-else-if="item.group" :items="item.items">
        {{ item.title }}
      </me-cs-action-list-group>
      <me-cs-action-card v-else :item="item" />
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
