<template>
  <v-card>
    <div class="d-flex flex-no-wrap justify-start">
      <v-avatar
        class="ma-3"
        :size="$vuetify.breakpoint.xsOnly ? 65 : 100"
        tile
      >
        <v-img
          :src="image"
          contain
        />
      </v-avatar>
      <div>
        <v-card-title
          class="text-h5"
        >
          {{ name }}
          <v-tooltip v-if="notRemoteIndicator" bottom>
            <template #activator="{ on, attrs }">
              <v-icon
                color="warning"
                dark
                v-bind="attrs"
                class="ml-3"
                v-on="on"
              >
                mdi-cloud-off-outline
              </v-icon>
            </template>
            <span>Only available on this device</span>
          </v-tooltip>
        </v-card-title>
        <v-card-subtitle v-if="character.species && character.classes.length > 0">
          {{ ident }}
        </v-card-subtitle>
      </div>
    </div>
    <v-card-actions>
      <v-btn text :to="`/characters/sheet/?id=${character.id}`">
        View
      </v-btn>
      <v-btn text :to="`/characters/builder/?id=${character.id}`">
        Edit
      </v-btn>
      <v-spacer />
      <me-character-delete :id="character.id" :name="name" text-btn />
    </v-card-actions>
  </v-card>
</template>

<script>
import identString from '~/mixins/indentString'

export default {
  props: {
    character: {
      type: Object,
      required: true
    }
  },
  computed: {
    name () {
      return this.character.name || 'Unnamed Character'
    },
    image () {
      const species = [...this.$store.getters.getData('species'), this.$store.state.character.species.customSpecies]
      if (this.character.image) {
        return this.character.image
      }
      if (this.character.species) {
        const s = species.find(i => i.id === this.character.species)
        if (s.type === 'variant' || s.type === 'subspecies') {
          return species.find(i => i.id === s.species)?.bodyImg
        } else {
          return s.bodyImg
        }
      }
      return '/icon.png'
    },
    notRemoteIndicator () {
      return this.$store.getters['auth/isAuthenticated'] ? !this.character.meta.remote : false
    },
    ident () {
      const classes = this.$store.getters.getData('classes')
      const subclasses = this.$store.getters.getData('subclasses')
      const species = [...this.$store.getters.getData('species'), this.$store.state.character.species.customSpecies]
      return identString(this.character, classes, species, subclasses).replace(/(\{\{ ordinal_levels-\d\d? }})/g, (sub) => {
        const level = sub.split(' ')[1].split('-')[1]
        return this.$t(`ordinal_numbers[${level}]`)
      })
    }
  }
}
</script>
