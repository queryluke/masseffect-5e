<template>
  <div>
    <me-tpg s="h2">
      {{ item.name }}
    </me-tpg>
    <me-html :content="item.html" />
    <me-species-traits-list :item="item" variant />
    <div v-if="item.subspecies">
      <me-tpg s="h3">
        {{ item.subspecies.name }}
      </me-tpg>
      <me-html :content="item.subspecies.html" class="mt-1" />
      <div v-for="sub of subspecies" :key="sub.id">
        <me-tpg s="h4">
          {{ sub.name }}
        </me-tpg>
        <me-hr size="1" class="mt-n1" color="primary" />
        <me-html :content="sub.html" />
        <me-species-traits-list :item="sub" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    subspecies () {
      return this.$store.getters.getData('species').filter(i => i.type === 'subspecies' && i.species === this.item.id)
    }
  }
}
</script>
