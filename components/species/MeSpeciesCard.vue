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
        {{ $t('character.species.traits') }}
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
  computed: {
    traits () {
      return this.$store.getters.getData('traits').filter(i => i.species === this.item.id)
    }
  }
}
</script>
