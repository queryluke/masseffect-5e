<template>
  <div>
    <div v-if="changeSpecies || !character.species">
      <me-tpg s="h3" class="text-center">
        {{ changeSpecies ? 'Change' : 'Choose a' }} Species
      </me-tpg>
      <v-row v-if="character.species">
        <v-col>
          <me-cb-species-selected-card @keepSpecies="changeSpecies = false" />
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col offset-md="3" cols="12" md="6">
          <v-text-field
            v-model="search"
            label="Search"
            outlined
            prepend-inner-icon="mdi-magnify"
            clearable
            dense
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="sp in speciesOptions"
          :key="sp.id"
          cols="12"
          md="6"
        >
          <me-cb-species-select-card :item="sp" :current-value="character.species" @selectSpecies="selectSpecies" />
        </v-col>
      </v-row>
    </div>
    <div v-if="character.species && !changeSpecies">
      <me-cb-species-selected-card change @changeSpecies="changeSpecies = true" />
      <v-card max-width="800px" flat class="mx-auto mt-3">
        <v-card-title>
          <me-tpg s="h5">
            Traits
          </me-tpg>
        </v-card-title>
        <v-card-text>
          <v-switch
            v-model="tashas"
            label="Custom Ability Score Increase"
          />
          <v-expansion-panels focusable multiple>
            <me-cb-aspect-card v-if="character.options.tashas" :root-path="`${rootPath}/traits`" :aspect="{ id: 'asi', mechanics: tashasMechanics }">
              <template #title>
                Ability Score Increase
              </template>
            </me-cb-aspect-card>
            <me-cb-aspect-card v-else-if="asiAsOptions.length" :root-path="`${rootPath}/traits`" :aspect="{ id: 'asi', mechanics: asiAsOptions }">
              <template #title>
                Ability Score Increase
              </template>
              <template #description>
                {{ asiText }}
              </template>
            </me-cb-aspect-card>
            <me-cb-aspect-card v-for="trait in traits" :key="trait.id" :root-path="`${rootPath}/traits`" :aspect="trait" />
          </v-expansion-panels>
        </v-card-text>
      </v-card>
      <me-cb-species-additional-traits v-if="character.species !== 'custom'" />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCbSpeciesSelect',
  data () {
    return {
      search: '',
      changeSpecies: false,
      tashasMechanics: [
        {
          type: 'asi-choice',
          options: true,
          selections: 3,
          max: 2,
          total: 3
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      character: 'character',
      traits: 'species/traits',
      asiAsOptions: 'species/asiAsOptions',
      speciesMechanics: 'species/speciesMechanics'
    }),
    asiText () {
      const setAsis = this.speciesMechanics.reduce((acc, curr) => {
        acc[curr.ability] += curr.amount
        return acc
      }, { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 })
      const list = []
      for (const [key, value] of Object.entries(setAsis)) {
        if (value > 0) {
          list.push(`+${value} ${this.$t(`abilities.${key}.title`)}`)
        }
      }
      return list.join(', ')
    },
    baseSpecies () {
      return this.$store.getters.getData('species').filter(i => i.type !== 'variant' && i.type !== 'subspecies')
    },
    homebrewSpecies () {
      return [this.$store.state.character.species.customSpecies]
    },
    speciesOptions () {
      return [...this.baseSpecies, ...this.homebrewSpecies].filter(i => i.name.toLowerCase().includes(this.search.toLowerCase()))
    },
    tashas: {
      get () {
        return this.character.options.tashas
      },
      set (value) {
        this.$store.dispatch('character/selections/BULK_DELETE', `${this.rootPath}/traits/asi`)
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'options.tashas', value })
        this.$store.dispatch('character/mechanics/INIT_MECHANICS')
      }
    },
    rootPath () {
      return `species/${this.character.species}`
    }
  },
  methods: {
    selectSpecies (value) {
      this.$store.dispatch('character/selections/BULK_DELETE', 'species')
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'species', value })
      this.$store.dispatch('character/mechanics/INIT_MECHANICS')
      this.changeSpecies = false
    }
  }
}
</script>
