<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="image"
          dense
          filled
          label="Image URL"
          append-outer-icon="mdi-help-circle"
          @click:append-outer="showHelp"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'MeHomebrewInputImage',
  props: {
    imageUrl: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      showHelp: false
    }
  },
  computed: {
    image: {
      get () {
        return this.imageUrl
      },
      set (value) {
        this.$emit('update', value)
      }
    }
  }
}
</script>
