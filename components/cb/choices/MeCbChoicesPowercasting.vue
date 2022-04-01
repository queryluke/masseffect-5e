<template>
  <div>
    <me-cb-choices-v-select
      :items="items"
      label="Powercasting Ability"
      :value="currentValue"
      @change="upsert"
    />
  </div>
</template>

<script>
export default {
  name: 'MeCbChoicesPowercasting',
  props: {
    mechanic: {
      type: Object,
      required: true
    },
    currentValue: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    items () {
      return this.mechanic.mod.map((i) => {
        return {
          text: this.$t(`abilities.${i}.title`),
          value: i
        }
      })
    }
  },
  methods: {
    upsert (value) {
      this.$emit('upsert', value)
    }
  }
}
</script>
