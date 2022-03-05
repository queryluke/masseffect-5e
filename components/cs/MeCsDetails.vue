<template>
  <div>
    <v-chip-group v-model="tab" active-class="primary--text">
      <v-chip
        v-for="(cTab, index) in tabs"
        :key="`feature-chip-tab-${index}`"
        small
      >
        {{ cTab }}
      </v-chip>
    </v-chip-group>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-list two-line dense>
          <template v-for="perRistic in personalCharacteristics">
            <v-list-item v-if="perRistic === 'backstory'" :key="perRistic" @click="backstoryDialog = true">
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t(`character.backstory`) }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  Click for backstory
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-else :key="perRistic">
              <v-list-item-content>
                <v-list-item-title>
                  {{ perRistic === 'background' ? $tc('background_title', 1) : $t(`character.${perRistic}`) }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{
                    perRistic === 'background'
                      ? background
                        ? background.name
                        : ''
                      : perRistic === 'alignment'
                        ? character.characteristics[perRistic]
                          ? $t(`alignments.${character.characteristics[perRistic]}`)
                          : ''
                        : character.characteristics[perRistic]
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-tab-item>
      <v-tab-item>
        <v-list two-line dense>
          <v-list-item v-for="phyRistic in physicalCharacteristics" :key="phyRistic">
            <v-list-item-content>
              <v-list-item-title>
                {{ $t(`character.${phyRistic}`) }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ character.characteristics[phyRistic] }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-tab-item>
      <v-tab-item>
        <div v-if="background">
          <div class="text-h6">
            {{ background.name }}
          </div>
          <me-html :content="background.html" />
        </div>
        <div v-else>
          Please select a background.
        </div>
      </v-tab-item>
    </v-tabs-items>
    <v-dialog v-model="backstoryDialog" :fullscreen="$vuetify.breakpoint.xsOnly" max-width="500">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t(`character.backstory`) }}
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon @click="backstoryDialog = false">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-5">
          {{ character.characteristics.backstory }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  data () {
    return {
      tab: 0,
      tabs: ['Personal', 'Physical', 'Background'],
      backstoryDialog: false,
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
        'alignment',
        'place_of_birth',
        'background',
        'personality_traits',
        'ideal',
        'bond',
        'flaw',
        'backstory'
      ]
    }
  },
  computed: {
    ...mapGetters(['character', 'background'])
  }
}
</script>
