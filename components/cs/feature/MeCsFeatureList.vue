<template>
  <div v-if="items.length">
    <div class="text-subtitle-1 mt-3 mb-n3">
      <slot />
    </div>
    <me-hr size="1" />
    <template v-for="(item, index) in items">
      <me-tpg v-if="item.featureGroup" :key="`feature-group-title-${index}`" s="title">
        {{ item.featureGroup }}
      </me-tpg>
      <me-cs-feature-item v-else :key="`feature-${index}`" :item="item" />
    </template>
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
