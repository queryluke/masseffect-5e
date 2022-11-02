<template>
  <v-btn right @click.stop="navigate">
    {{ $t('buttons.view_details') }}
  </v-btn>
</template>

<script>
export default {
  props: {
    itemId: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    homebrew: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    navigate () {
      if (this.homebrew) {
        this.$router.push(`/homebrew/view/?id=${this.itemId}`)
      } else {
        this.$router.push(this.localePath(`/${this.type}/${this.itemId}`))
      }
    }
  }
}
</script>
