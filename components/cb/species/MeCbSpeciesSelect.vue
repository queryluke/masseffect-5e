<template>
  <div>
    <div v-if="changeSpecies || !speciesId">
      <me-tpg s="h3" class="text-center">
        {{ changeSpecies ? 'Change' : 'Choose a' }} Species
      </me-tpg>
      <v-row v-if="speciesId">
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
          <me-cb-species-select-card :item="sp" @selectSpecies="selectSpecies" />
        </v-col>
      </v-row>
    </div>
    <div v-if="speciesId && !changeSpecies">
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
            <me-cb-aspect-card v-if="character.options.tashas" root-path="species" :aspect="{ id: 'asi', mechanics: tashasMechanics }">
              <template #title>
                Ability Score Increase
              </template>
            </me-cb-aspect-card>
            <me-cb-aspect-card v-else root-path="species" :aspect="{ id: 'asi', mechanics: speciesOptionalAsis }">
              <template #title>
                Ability Score Increase
              </template>
              <template #description>
                {{ speciesSetAsiText }}
              </template>
            </me-cb-aspect-card>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
      <me-cb-species-additional-traits />
    </div>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'
export default {
  name: 'MeCbSpeciesSelect',
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      search: null,
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
    speciesOptions () {
      const baseSpecies = this.species.filter(i => i.type !== 'variant')
      if (!this.search) {
        return baseSpecies
      }
      return baseSpecies.filter(i => i.name.toLowerCase().includes(this.search.toLowerCase()))
    },
    tashas: {
      get () {
        return this.character.options.tashas
      },
      set (value) {
        this.deleteSelections('species/asi')
        this.updateCharacter('options.tashas', value)
      }
    }
  },
  methods: {
    selectSpecies ({ speciesId, subspeciesId }) {
      this.speciesId = speciesId
      this.subspeciesId = subspeciesId
      this.changeSpecies = false
    }
  }
}
</script>
