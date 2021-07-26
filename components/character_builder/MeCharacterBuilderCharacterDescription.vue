<template>
  <v-container>
    <div class="text-center text-h4 mb-3">
      Describe your character
    </div>
    <v-row>
      <v-col cols="12">
        <v-expansion-panels multiple>
          <!-- Physical -->
          <v-expansion-panel class="mb-3">
            <v-expansion-panel-header>
              <div>
                <div>
                  Physical Characteristics
                </div>
                <div class="text-caption font-italic">
                  {{ physicalCharText }}
                </div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div v-for="characteristic in physicalCharacteristics" :key="characteristic" class="mb-2">
                <me-character-builder-debounced-input :path="`characteristics.${characteristic}`" :label="$t(`character.${characteristic}`)" />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- Physical -->
          <v-expansion-panel class="mb-3">
            <v-expansion-panel-header>
              <div>
                <div>
                  Personal Characteristics
                </div>
                <div class="text-caption font-italic">
                  {{ personalCharText }}
                </div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row justify="center" class="mb-3" no-gutters>
                <v-col
                  v-for="al in alignmentOptions"
                  :key="al"
                  cols="4"
                  class="d-flex pa-1"
                  :class="{ 'justify-end': al.endsWith('g'), 'justify-center': al.endsWith('n'), 'justfiy-start': al.endsWith('e') }"
                >
                  <v-card
                    hover
                    height="75"
                    width="75"
                    :class="alignment === al ? 'primary' : 'secondary'"
                    @click="alignment = al"
                  >
                    <v-row justify="center" align="center" class="fill-height text-caption">
                      <v-col class="text-center pt-8">
                        {{ $t(`alignments.${al}`) }}
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
              <div v-for="characteristic in personalCharacteristics" :key="characteristic" class="mb-2">
                <me-character-builder-debounced-input :path="`characteristics.${characteristic}`" :label="$t(`character.${characteristic}`)" />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- Background -->
          <me-character-builder-character-background />

          <!-- Back story -->
          <v-expansion-panel class="mb-3">
            <v-expansion-panel-header>
              {{ $t('character.backstory') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <me-character-builder-debounced-input label="Backstory" path="characteristics.backstory" input-type="textarea" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      alignmentOptions: [
        'lg',
        'ln',
        'le',
        'ng',
        'nn',
        'ne',
        'cg',
        'cn',
        'ce'
      ],
      physicalCharacteristics: [
        'gender',
        'age',
        'height',
        'weight',
        'hair',
        'eyes',
        'skin',
        'appearance'
      ],
      personalCharacteristics: [
        'place_of_birth',
        'personality_traits',
        'ideal',
        'bond',
        'flaw'
      ]
    }
  },
  computed: {
    alignment: {
      get () {
        return this.character.characteristics.alignment
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'characteristics.alignment', value })
      }
    },
    physicalCharText () {
      const array = this.physicalCharacteristics.map(i => this.$t(`character.${i}`))
      return this.$t(`lists.comma_list[${array.length}]`, array)
    },
    personalCharText () {
      let array = [this.$t('character.alignment')]
      array = array.concat(this.personalCharacteristics.map(i => this.$t(`character.${i}`)))
      array.push(this.$tc('background_title', 1))
      return this.$t(`lists.comma_list[${array.length}]`, array)
    }
  }
}
</script>
