<template>
  <div v-if="items.length">
    <div class="text-subtitle-1 mt-3 mb-n3">
      <slot />
    </div>
    <me-hr size="1" />
    <me-cs-feature-item v-for="(item, index) in items" :key="`action-${index}`" :item="item" />
  </div>
</template>

<script>
export default {
  name: 'MeCsFeatureList',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
