<template>
  <v-select
    v-model="actionTime"
    :items="classesItems"
    :multiple="multiple"
    :loading="loading"
    item-text="name"
    item-value="id"
    label="Classes"
  />
</template>

<script>
export default {
  name: 'MeHomebrewInputClassesSelect',
  props: {
    selected: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      actionTimes: [
        { id: 'action' }
      ]
    }
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
