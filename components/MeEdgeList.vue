<template>
  <div v-if="!$fetchState.pending">
    <p v-for="item in items" :key="item.id">
      <strong>{{ item.name }}.</strong>
      <me-html :content="item.html" inline />
    </p>
  </div>
</template>

<script>
export default {
  name: 'MeEdgeList',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      show: false
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_DATA', 'edges')
  },
  computed: {
    items () {
      return this.$store.getters.getData('edges').filter(i => i.type === this.id)
    }
  }
}
</script>
