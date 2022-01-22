<template>
  <v-card flat class="mx-auto" max-width="450px">
    <v-card-title>
      Selected Species
    </v-card-title>
    <div class="d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <v-avatar size="64">
          <v-img :src="speciesData.bodyImg" :position="avatarPosition" />
        </v-avatar>
        <div>
          <div v-if="subspeciesData" class="text-overline">
            {{ subspeciesData.name }}
          </div>
          <div v-else-if="variantTitle" class="text-overline">
            {{ variantTitle }}
          </div>
          <me-tpg s="h4">
            {{ speciesData.name }}
          </me-tpg>
        </div>
      </div>
      <div class="d-flex flex-column align-center justify-space-around">
        <v-btn outlined small @click="keepOrChange">
          {{ change ? 'Change' : 'Keep' }}
        </v-btn>
        <v-btn
          v-if="change && speciesId !== 'custom'"
          x-small
          plain
          color="primary"
          text
          class="mt-3"
          :to="`/species/${isVariantSpeciesId ? speciesData.species : speciesId}`"
          target="_blank"
        >
          View Species Info
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'
export default {
  name: 'MeCbSpeciesSelectedCard',
  mixins: [CharacterBuilderHelpers],
  props: {
    change: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    avatarPosition () {
      return ['volus'].includes(this.speciesId) ? 'center center' : 'top center'
    },
    variantTitle () {
      if (this.isVariantSpeciesId) {
        const parent = this.species.find(i => i.id === this.speciesData.species)
        return `Variant ${parent.name}`
      }
      return false
    }
  },
  methods: {
    keepOrChange () {
      if (this.change) {
        this.$emit('changeSpecies')
      } else {
        this.$emit('keepSpecies')
      }
    }
  }
}
</script>
