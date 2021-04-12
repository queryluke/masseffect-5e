<template>
  <v-card
    :to="localePath({ name: 'species-id', params: { id: item.id } })"
    nuxt
    hover
    class="flex-grow-1"
  >
    <v-img :src="item.img" height="200" />
    <v-card-title>
      {{ item.name }}
    </v-card-title>
    <v-card-text>
      <p>
        {{ item.snippet }}
      </p>
      <p class="text-subtitle-1 mb-0">
        Racial Traits
      </p>
      <p>
        {{ traitsPreview }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { SpeciesMixins } from '~/mixins/speciesMixins'

export default {
  mixins: [SpeciesMixins],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      traits: []
    }
  },
  async fetch () {
    const data = await this.$store.dispatch('FETCH_DATA', 'traits')
    this.traits = data.filter(i => i.species === this.item.id)
  }
}
</script>
