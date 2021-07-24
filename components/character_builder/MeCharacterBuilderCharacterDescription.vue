<template>
  <v-container>
    <div class="text-center text-h4 mb-3">
      Describe your character
    </div>
    <v-row>
      <v-col order-md="1" cols="12" md="9">
        <v-text-field
          v-model="characterName"
          outlined
          dense
          label="Name"
          hide-details
          class="my-3"
        />
        <v-expansion-panels multiple>
          <!-- Physical -->
          <v-expansion-panel class="mb-3">
            <v-expansion-panel-header>
              <div>
                <div>
                  Physical Characteristics
                </div>
                <div class="text-caption font-italic">
                  {{ physicalCharacteristics.join(', ') }}
                </div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-text-field
                v-for="(characteristic, index) in physicalCharacteristics"
                :key="index"
                class="mb-2"
                :value="characteristics[characteristic]"
                outlined
                hide-details
                dense
                :label="characteristic"
                @change="newCharacteristic => handleChangeCharacteristic(characteristic, newCharacteristic)"
              />
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
                  Alignment, {{ personalCharacteristics.join(', ') }}
                </div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row justify="center" class="mb-3" no-gutters>
                <v-col
                  v-for="alignment in alignmentOptions"
                  :key="alignment"
                  cols="4"
                  class="d-flex pa-1"
                  :class="{ 'justify-end': alignment.endsWith('g'), 'justify-center': alignment.endsWith('n'), 'justfiy-start': alignment.endsWith('e') }"
                >
                  <v-card
                    hover
                    height="75"
                    width="75"
                    :class="character.alignment === alignment ? 'primary' : 'secondary'"
                    @click="setAlignment(alignment)"
                  >
                    <v-row justify="center" align="center" class="fill-height text-caption">
                      <v-col class="text-center pt-8">
                        {{ $t(`alignments.${alignment}`) }}
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
              <v-text-field
                v-for="(characteristic, index) in personalCharacteristics"
                :key="index"
                class="mb-2"
                :value="characteristics[characteristic]"
                outlined
                hide-details
                dense
                :label="characteristic"
                @change="newCharacteristic => handleChangeCharacteristic(characteristic, newCharacteristic)"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- Background -->
          <v-expansion-panel class="mb-3">
            <v-expansion-panel-header>
              Background
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-autocomplete v-model="backgroundId" :items="backgrounds" item-value="id" item-text="name" />
              <div v-if="backgroundId">
                <v-expansion-panels multiple class="mt-3">
                  <me-character-builder-aspect :aspect="{name: 'Proficiencies', mechanics: backgroundData.mechanics }" path="background.selections" />
                </v-expansion-panels>
                <me-html :content="backgroundData.html" class="mt-3" />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- Back story -->
          <v-expansion-panel class="mb-3">
            <v-expansion-panel-header>
              Back story
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-textarea
                :value="characteristics.Backstory"
                auto-grow
                label="Backstory"
                @change="newCharacteristic => handleChangeCharacteristic('Backstory', newCharacteristic)"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col order-md="2" cols="12" md="3" class="d-flex justify-center justify-md-end">
        <me-character-builder-avatar />
      </v-col>
    </v-row>

    <div class="d-flex mt-5" />
    <!--
    <v-select
      :value="characteristics.alignment"
      :items="alignmentOptions"
      label="Choose an Alignment"
      @change="newAlignment => handleChangeCharacteristic('alignment', newAlignment)"
    />
    <div class="d-flex align-center">

    </div>
    <v-select
      v-if="background || background.name === 'Custom'"
      :value="background.feat.name"
      :items="feats"
      item-text="name"
      clearable
      label="Choose a feat"
      @change="handleChangeBackgroundFeat"
    />
    <v-select
      v-if="background.name ==='Custom'"
      :value="background.feature"
      :items="feats"
      item-text="name"
      clearable
      label="Choose a background feature"
      @change="handleChangeBackgroundFeature"
    />
    <h3 class="my-3">
      Characteristics
    </h3>
    <v-text-field
      v-for="(characteristic, index) in characteristicsList"
      :key="index"
      class="mb-2"
      :value="characteristics[characteristic]"
      outlined
      hide-details
      :label="characteristic"
      @change="newCharacteristic => handleChangeCharacteristic(characteristic, newCharacteristic)"
    />

    -->
  </v-container>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      expandBackgroundDesc: false,
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
        'Gender',
        'Place of Birth',
        'Age',
        'Height',
        'Weight',
        'Hair',
        'Eyes',
        'Skin',
        'Appearance'
      ],
      personalCharacteristics: [
        'Personality Traits',
        'Ideal',
        'Bond',
        'Flaw'
      ]
    }
  },
  computed: {
    characteristics: {
      get () {
        return this.character.characteristics
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'characteristics', value })
      }
    },
    name: {
      get () {
        return this.character.name
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'name', value })
      }
    },
    profsHasSelections () {
      const profTypes = this.backgroundData.profs ? Object.keys(this.backgroundData.profs) : false
      if (!profTypes) {
        return false
      }
      const checks = []
      for (const profType of profTypes) {
        if (this.backgroundData.profs[profType].choices && this.character.background.profSelections) {
          const selections = this.character.background.profSelections[profType]
          const count = this.backgroundData.profs[profType].choices.count
          if (!selections || selections.length < count) {
            checks.push(true)
          }
        }
      }
      return checks.some(i => i === true)
    }
  },
  methods: {
    setAlignment (value) {
      this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'alignment', value })
    },
    handleChangeCharacteristic (characteristic, newCharacteristic) {
      const to = { ...this.characteristics }
      to[characteristic] = newCharacteristic
      this.characteristics = to
    }
  }
}
</script>
