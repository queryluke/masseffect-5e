<template>
  <v-card flat>
    <div class="text-center">
      <v-avatar tile size="125">
        <v-img :src="image" contain />
      </v-avatar>
    </div>
    <div class="text-center">
      <me-tpg s="h5">
        {{ character.name || 'Unnamed Character' }}
      </me-tpg>
      <div class="text-body-2">
        {{ speciesName }}
      </div>
      <div class="text-caption">
        {{ $t('level_nth', {nth: $t(`ordinal_numbers[${level}]`)}) }}
      </div>
    </div>
    <div class="mx-2 mt-3">
      <me-cb-xp-interface />
    </div>
    <v-list two-line dense>
      <v-list-item v-for="(klass, index) in klasses" :key="`klass-${index}`" style="min-height: 48px">
        <v-list-item-avatar tile class="my-0">
          <v-avatar tile size="40">
            <v-img :src="require(`~/assets/images/classes/${klass.id}.svg`)" />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ klass.data.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ klass.subclassData.name === '' ? 'No Subclass' : klass.subclassData.name }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action-text>
          {{ $t('level_nth', {nth: $t(`ordinal_numbers[${klass.levels}]`)}) }}
        </v-list-item-action-text>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsCharacterSideNavPrepend',
  computed: {
    ...mapGetters({ character: 'character', level: 'klasses/level', klasses: 'klasses/klasses', species: 'species/species', image: 'image', id: 'id' }),
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    speciesName () {
      let speciesName = this.species.name
      const variant = this.species.type === 'variant'
      const subspecies = this.species.type === 'subspecies'
      if (variant || subspecies) {
        speciesName = variant
          ? speciesName.toLowerCase().includes('variant')
            ? `Variant ${this.species.parentName}`
            : `Variant ${this.species.parentName} (${speciesName})`
          : `${this.species.parentName} (${speciesName})`
      }
      return speciesName
    }
  }
}
</script>
