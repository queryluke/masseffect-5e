<template>
  <v-container v-if="!$fetchState.pending">
    <me-character-builder />
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.$store.commit('pageTitle', this.$store.getters['user/character'].name)
    await this.$store.dispatch('FETCH_LOTS', ['species', 'weapons', 'armor', 'powers', 'feats', 'backgrounds', 'classes', 'class-features', 'subclasses', 'character-progression'])
  },
  computed: {
    character () {
      return this.$store.getters['user/character']
    },
    species () {
      return this.$store.getters.getData('species')
    },
    classes () {
      return this.$store.getters.getData('classes')
    },
    subclasses () {
      return this.$store.getters.getData('subclasses').filter(i => this.character.class ? i.class === this.character.class.id : false)
    },
    backgrounds () {
      return this.$store.getters.getData('backgrounds')
    }
  }
}
</script>
