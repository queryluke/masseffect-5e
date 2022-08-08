<template>
  <v-card flat max-width="700px" class="mx-auto">
    <me-tpg s="h3" class="text-center">
      Description
    </me-tpg>
    <v-row>
      <v-col cols="12">
        <v-card elevation="0">
          <v-card-title>Name & Image</v-card-title>
          <v-card-text>
            <v-row align="center">
              <v-col cols="12" sm="3" class="d-flex justify-center justify-sm-start">
                <me-cb-avatar />
              </v-col>
              <v-col cols="12" sm="9" class="text-center text-sm-left">
                <me-cb-debounced-input path="name" :label="$t(`character.name`)" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
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
                <me-cb-debounced-input :path="`characteristics.${characteristic}`" :label="$t(`character.${characteristic}`)" />
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
                <me-cb-debounced-input :path="`characteristics.${characteristic}`" :label="$t(`character.${characteristic}`)" />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!--  Background -->
          <me-cb-aspect-card :asm-override="{ has: true, value: !!background }" class="mb-3">
            <template #title>
              Background
            </template>
            <v-select
              v-model="selectedBackground"
              :items="backgroundsList"
              item-value="id"
              item-text="name"
              clearable
              label="Choose a background"
            />
            <div v-if="selectedBackground">
              <me-cb-aspect-card v-if="background.mechanics.some(i => i.options)" root-path="background" :aspect="{ ...background, html: null }" />
              <div v-if="!loading" class="mt-5">
                <me-html :content="background.html" />
              </div>
            </div>
          </me-cb-aspect-card>

          <!-- Back story -->
          <v-expansion-panel class="mb-3">
            <v-expansion-panel-header>
              {{ $t('character.backstory') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <me-cb-debounced-input label="Backstory" path="characteristics.backstory" input-type="textarea" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')

export default {
  name: 'MeCbDescription',
  data () {
    return {
      loading: false,
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
    ...mapGetters(['character', 'background', 'backgroundsList']),
    alignment: {
      get () {
        return this.character.characteristics.alignment
      },
      set (value) {
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'characteristics.alignment', value })
      }
    },
    selectedBackground: {
      get () {
        return this.background?.id
      },
      set (value) {
        this.$store.dispatch('character/selections/BULK_DELETE', 'background')
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'background', value })
        this.$store.dispatch('character/mechanics/INIT_MECHANICS')
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
  },
  watch: {
    selectedBackground () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 100)
    }
  }
}
</script>
