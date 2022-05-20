<template>
  <me-cs-action-stat>
    <template v-if="showTitle && dc.save" #title>
      <span class="text-uppercase">
        {{ dc.save || '' }}
      </span>
    </template>
    {{ dc.target }}
    <template #subtitle>
      <div v-if="dc.note && showTitle">
        {{ dc.note }}
      </div>
      <span v-else-if="!showTitle" class="text-uppercase">
        {{ dc.save || '' }}
      </span>
    </template>
  </me-cs-action-stat>
</template>
<script>
export default {
  name: 'MeCsActionDc',
  props: {
    dc: {
      type: [Object, Boolean],
      default: false
    },
    layout: {
      type: String,
      default: 'attack'
    }
  },
  computed: {
    showTitle () {
      return !['attack', 'power'].includes(this.layout)
    }
  }
}
</script>
