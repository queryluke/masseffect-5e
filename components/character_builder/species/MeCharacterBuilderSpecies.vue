<template>
  <div>
    <div class="text-subtitle text-center mb-3">
      Choose a Species
    </div>
    <v-select
      v-model="speciesId"
      item-text="name"
      item-value="id"
      :items="species"
    >
      <template #item="data">
        <v-list-item-avatar>
          <v-img :src="data.item.bodyImg" :position="data.item.id === 'volus' ? 'center center' : 'top center'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ data.item.name }}
          </v-list-item-title>
        </v-list-item-content>
      </template>
    </v-select>
    <v-container v-if="speciesId">
      <v-row>
        <v-col>
          <me-character-builder-species-card :species-data="speciesData" />
        </v-col>
        <v-col>
          <div>
            <v-img :src="speciesData.bodyImg" width="200px" position="center center" style="margin: auto;" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-h4">
            Traits
          </div>
          <div>
            {{ abiText }}
          </div>
          <v-expansion-panels multiple class="mt-3">
            <template v-for="trait in speciesTraits">
              <me-character-builder-aspect :key="trait.id" :aspect="trait" :parent-source="`species-${speciesId}`" />
            </template>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-h4">
            Species Information
          </div>
          <me-html :content="speciesData.html" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'
export default {
  mixins: [CharacterBuilderHelpers],
  computed: {
    abiText () {
      const array = this.speciesData.abilityScoreIncrease.map((i) => {
        return `+${i.amount} ${this.$t(`abilities.${i.ability}.title`)}`
      })
      return this.$t(`lists.comma_list[${array.length}]`, array)
    }
  }
}
</script>
