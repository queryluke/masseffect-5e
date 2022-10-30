<template>
  <div>
    <v-select
      v-model="selectedDieType"
      :items="options"
      :label="label"
      :multiple="multiple"
      filled
      dense
      :chips="multiple"
      :small-chips="multiple"
      :append-outer-icon="appendIcon"
      @click:append-outer="showDialog = true"
      @change="shouldShowDialog($event)"
    />
    <v-dialog v-model="showDialog" max-width="700">
      <v-card>
        <v-card-title>
          Base Die Type on a Character Stat
        </v-card-title>
        <v-card-text>
          <me-homebrew-input-bonus label="Die Type Selection" always-on :bonus="customDieType" @update="customDieType = $event" />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="cancelCustomDieType">
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn text color="primary" @click="setCustomDieType">
            Set
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'MeHomebrewInputDieType',
  props: {
    dieType: {
      type: [String, Boolean, Number, Object],
      default: false
    },
    label: {
      type: String,
      default: 'Die Type'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    includeNone: {
      type: Boolean,
      default: false
    },
    includeCustom: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      baseOptions: [
        { text: 'd4', value: 4 },
        { text: 'd6', value: 6 },
        { text: 'd8', value: 8 },
        { text: 'd10', value: 10 },
        { text: 'd12', value: 12 }
      ],
      showDialog: false,
      customDieType: {
        type: 'flat',
        value: 4
      }
    }
  },
  computed: {
    options () {
      const options = [...this.baseOptions]
      if (this.includeNone) {
        options.unshift({ text: 'None', value: 0 })
      }
      if (this.includeCustom) {
        options.push({ text: 'Custom', value: 'custom' })
      }
      return options
    },
    selectedDieType: {
      get () {
        return typeof this.dieType === 'object' ? 'custom' : this.dieType
      },
      set (value) {
        if (value === 'custom') {
          return
        }
        this.$emit('update', value)
      }
    },
    appendIcon () {
      return typeof this.dieType === 'object' ? 'mdi-circle-edit-outline' : undefined
    }
  },
  methods: {
    shouldShowDialog (value) {
      if (value === 'custom') {
        this.showDialog = true
      }
    },
    setCustomDieType () {
      this.selectedDieType = this.customDieType
      this.showDialog = false
    },
    cancelCustomDieType () {
      // this.selectedDieType = 4
      this.showDialog = false
    }
  }
}
</script>
