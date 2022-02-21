<template>
  <v-container>
    <me-page-title />
    <div v-for="type in types" :key="type.key" class="py-6">
      <h2 class="text-title text-md-h4 pb-4">
        {{ type.title }}
      </h2>
      <me-species-list :type="type.key" :loading="$fetchState.pending" />
      <v-divider class="mt-4" />
    </div>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      types: [
        {
          title: 'Milky Way',
          key: 'primary'
        },
        {
          title: "Milky Way's Lesser Known Operatives",
          key: 'lesser_known'
        },
        {
          title: 'Fringe Species',
          key: 'villainous'
        },
        {
          title: 'Ancient and Expanded Species',
          key: 'expanded'
        },
        {
          title: 'Andromeda',
          key: 'andromeda'
        }
      ]
    }
  },
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$tc('species_title', 2),
      description: this.$t('meta.species')
    })
    await this.$store.dispatch('FETCH_LOTS', ['species'])
  }
}
</script>
