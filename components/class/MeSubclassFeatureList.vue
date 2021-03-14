<template>
  <div>
    <div
      v-for="(subclass, subIndex) in subclasses"
      :key="subclass.id"
    >
      <me-class-feature-list
        :class-id="id"
        :subclass-filter="subclass.id"
        include-subclass
        show-subclass-desc
        show-subclass-header
      />
      <me-hr v-if="subIndex !== subclasses.length -1" :color="hrColor" :size="6" class="mt-10" />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    subclasses () {
      return this.$store.getters.getData('subclasses').filter(i => i.class === this.id)
    },
    hrColor () {
      return this.$store.getters['config/classThemeHrColor'](this.id)
    }
  },
  methods: {
    change (value) {
      this.$emit('change', value)
    }
  }
}
</script>
