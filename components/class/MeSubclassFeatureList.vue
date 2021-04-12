<template>
  <div v-if="!$fetchState.pending">
    <template v-for="(subclass, index) in subclasses">
      <me-class-feature :key="subclass.id" :hr="index < subclasses.length - 1" :klass-id="klassId">
        <template #title>
          <me-subclass-header :item="subclass" :flavor="flavor" />
        </template>
        <me-class-feature-list :subclass="subclass.id" :hr-size="1" :level="level" :klass-id="klassId" />
      </me-class-feature>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    klassId: {
      type: String,
      required: true
    },
    flavor: {
      type: Boolean,
      default: false
    },
    level: {
      type: [Number, Boolean],
      default: false
    }
  },
  data () {
    return {
      subclasses: []
    }
  },
  async fetch () {
    const data = await this.$store.dispatch('FETCH_DATA', 'subclasses')
    this.subclasses = data.filter(i => i.klass === this.klassId)
  }
}
</script>
