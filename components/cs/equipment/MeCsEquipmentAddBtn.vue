<template>
  <v-btn
    icon
    :color="(adding || added) ? 'success' : 'primary'"
    :loading="adding"
    x-small
    @click.stop="addItem()"
  >
    <v-icon>
      {{ (adding || added) ? 'mdi-check' : 'mdi-plus' }}
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      adding: false,
      added: false
    }
  },
  methods: {
    async addItem () {
      this.adding = true
      this.added = await this.$store.dispatch('character/equipment/ADD_EQUIPMENT', this.item)
      this.adding = false
      setTimeout(() => {
        this.added = false
      }, 1000)
    }
  }
}
</script>
