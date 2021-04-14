<template>
  <div>
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
  computed: {
    subclasses () {
      return this.$store.getters.getData('subclasses').filter(i => i.klass === this.klassId)
    }
  }
}
</script>
