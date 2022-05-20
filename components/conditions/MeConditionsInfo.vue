<template>
  <div>
    <me-html :content="item.html" />
    <div v-if="children && !$fetchState.pending" class="text-body-2">
      <template v-for="child in children">
        <div :key="child.id" class="mt-3">
          <strong>{{ child.name }}.</strong>
          <span class="pl-1">
            <me-html inline :content="child.html" />
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeConditionsInfo',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  async fetch () {
    if (this.item.children) {
      await this.$store.dispatch('FETCH_DATA', 'edges')
    }
  },
  computed: {
    children () {
      return this.item.children ? this.$store.getters.getData('edges').filter(i => i.type === this.item.children) : false
    }
  }
}
</script>
