<template>
  <v-select
    v-model="selections"
    :items="items"
    :label="label"
    :counter="totalSelections"
    :item-disabled="itemIsDisabled"
    :menu-props="{
      closeOnContentClick: disableItems
    }"
    chips
    deletable-chips
    multiple
    :append-icon="appendIcon"
    :error="error"
    persistent-hint
    :hint="hint"
    :disabled="viewOnly || disabled"
  >
    <template #selection="{ item, attrs, selected }">
      <v-chip
        v-bind="attrs"
        :input-value="selected"
        close
        small
        @click:close="removeSelection(item.value)"
      >
        {{ item.text }}
      </v-chip>
    </template>
    <template #item="{ item }">
      <v-list-item-icon v-if="alreadyAcquired(item)">
        <v-icon color="warning">
          mdi-alert-circle
        </v-icon>
      </v-list-item-icon>
      <v-list-item-icon v-else-if="value.includes(item.value)">
        <v-icon color="primary">
          mdi-checkbox-marked
        </v-icon>
      </v-list-item-icon>
      <v-list-item-icon v-else>
        <v-icon :color="itemIsDisabled(item) ? 'grey darken-2' : undefined">
          mdi-checkbox-blank-outline
        </v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          {{ item.text }}
        </v-list-item-title>
        <v-list-item-subtitle v-if="alreadyAcquired(item)">
          <slot name="itemSubtitle" :item="item">
            Already acquired
          </slot>
        </v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-select>
</template>

<script>
export default {
  name: 'MeCbChoicesVSelect',
  props: {
    items: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    totalSelections: {
      type: Number,
      default: 1
    },
    value: {
      type: Array,
      required: true
    },
    acquired: {
      type: Function,
      default: () => {
        return false
      }
    },
    appendIcon: {
      type: String,
      default: undefined
    },
    error: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    disableItems () {
      return this.value.length === this.totalSelections
    },
    selections: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('change', value)
      }
    }
  },
  methods: {
    alreadyAcquired (item) {
      return this.acquired(item) && !this.isSelected(item.value)
    },
    itemIsDisabled (item) {
      return this.alreadyAcquired(item) || (this.isSelected(item.value) ? false : this.disableItems)
    },
    isSelected (value) {
      return this.value.includes(value)
    },
    removeSelection (value) {
      const newValue = this.selections.slice()
      const currentIndex = newValue.indexOf(value)
      newValue.splice(currentIndex, 1)
      this.selections = newValue
    }
  }
}
</script>
