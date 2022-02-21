<template>
  <div>
    <me-species-asis :item="item" />
    <me-species-trait v-if="item.age" :label="$t('age_title')">
      {{ item.age }}
    </me-species-trait>
    <me-species-trait v-if="item.alignment" :label="$t('alignment_title')">
      {{ item.alignment }}
    </me-species-trait>
    <me-species-trait v-if="item.size" :label="$t('size_title')">
      {{ item.size }}
    </me-species-trait>
    <me-species-speed :item="item" />
    <template v-for="trait in traits">
      <me-species-trait :key="trait.id" :label="trait.name">
        <me-html :content="trait.html" />
      </me-species-trait>
    </template>
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
    traits () {
      return this.$store.getters.getData('traits').filter(i => i.species?.includes(this.item.id) || i.subspecies?.includes(this.item.id))
    }
  }
}
</script>
