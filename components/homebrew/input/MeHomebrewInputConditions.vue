<template>
  <v-select
    v-model="selectedConditions"
    :items="conditionOptions"
    :multiple="multiple"
    :loading="loading"
    item-text="name"
    item-value="id"
    :label="label"
    :hint="hint"
    :persistent-hint="hint !== ''"
    :clearable="clearable"
    filled
    dense
    :chips="multiple"
    :small-chips="multiple"
  />
</template>

<script>
export default {
  name: 'MeHomebrewInputClassesSelect',
  props: {
    selected: {
      type: [Array, String, Boolean],
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Conditions'
    },
    hint: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    excludePrimers: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: true,
      conditions: []
    }
  },
  async fetch () {
    this.conditions = await this.$store.dispatch('FETCH_DATA', 'conditions')
    this.loading = false
  },
  computed: {
    conditionOptions () {
      return this.conditions.filter(i => i.id !== 'primed')
    },
    selectedConditions: {
      get () {
        return this.selected
      },
      set (value) {
        this.$emit('update', value)
      }
    }
  }
}
</script>
