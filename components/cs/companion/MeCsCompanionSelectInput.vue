<template>
  <v-select
    :label="label"
    :items="items"
    :multiple="multiple"
    :chips="multiple"
    :deletable-chips="multiple"
    :small-chips="multiple"
    outlined
    dense
    hide-details
    :value="value"
    @change="$emit('set', $event)"
  />
</template>

<script>
export default {
  name: 'MeCsCompanionSelectInput',
  props: {
    value: {
      type: [Array, String],
      default: null,
      nullable: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null,
      nullable: true
    },
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>
