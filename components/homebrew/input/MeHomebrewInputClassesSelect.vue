<template>
  <v-select
    v-model="classes"
    :items="classesItems"
    :multiple="multiple"
    :loading="loading"
    item-text="name"
    item-value="id"
    :label="label"
    :hint="hint"
    :persistent-hint="hint !== ''"
    filled
    dense
    :chips="multiple"
    :small-chips="multiple"
    :clearable="clearable"
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
      default: 'Classes'
    },
    hint: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: true,
      classesItems: []
    }
  },
  async fetch () {
    this.classesItems = await this.$store.dispatch('FETCH_DATA', 'classes')
    this.loading = false
  },
  computed: {
    classes: {
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
