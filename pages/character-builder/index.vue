<template>
  <v-container>
    <v-row v-if="characters.length === 0">
      <v-col cols="12" class="text-center">
        <div class="text-h4">
          Welcome to the ME5e Character Builder!
        </div>
        <p>Click the button below to get started</p>
      </v-col>
    </v-row>
    <v-row v-else class="d-flex justify-center">
      <v-col cols="12" class="text-center">
        <div class="text-h5">
          My Characters
        </div>
      </v-col>
      <v-col v-for="characterId in characters" :key="characterId" sm="8" lg="6">
        <me-character-builder-index-card :character-id="characterId" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn @click="createNewCharacter">
          Create a New Character
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData ({ store }) {
    await store.dispatch('FETCH_LOTS', ['species', 'classes', 'subclasses'])
    store.dispatch('SET_META', {
      title: 'Character Builder',
      description: 'Build your own ME5e Character'
    })
  },
  data () {
    return {
      characterStartState: {
        name: null,
        id: '',
        image: null,
        experiencePoints: 0,
        species: null,
        classes: [],
        abilityScores: {
          genMethod: null,
          standard: {
            str: null,
            con: null,
            dex: null,
            wis: null,
            int: null,
            cha: null
          },
          buy: {
            str: null,
            con: null,
            dex: null,
            wis: null,
            int: null,
            cha: null
          },
          manual: {
            str: null,
            con: null,
            dex: null,
            wis: null,
            int: null,
            cha: null
          },
          other: {
            str: null,
            con: null,
            dex: null,
            wis: null,
            int: null,
            cha: null
          },
          override: {
            str: null,
            con: null,
            dex: null,
            wis: null,
            int: null,
            cha: null
          }
        },
        background: {
          name: '',
          feat: {
            name: '',
            type: 'Feat'
          }
        },
        characteristics: {
          alignment: '',
          'Personality Traits': '',
          Ideal: '',
          Bond: '',
          Flaw: '',
          Gender: '',
          'Place of Birth': '',
          Age: '',
          Height: '',
          Weight: '',
          Hair: '',
          Eyes: '',
          Skin: '',
          Appearance: '',
          Backstory: ''
        },
        credits: 0,
        equipment: [],
        currentStats: {
          hitPointsLost: 0,
          temporaryHitPoints: 0,
          techPointsUsed: 0,
          forcePointsUsed: 0,
          superiorityDiceUsed: 0,
          hitDiceUsed: {},
          deathSaves: {
            successes: 0,
            failures: 0
          },
          hasInspiration: false,
          featuresTimesUsed: {},
          conditions: [],
          exhaustion: 0,
          highLevelCasting: {
            level6: false,
            level7: false,
            level8: false,
            level9: false
          },
          shields: {
            value: 0,
            max: 5
          },
          barrier: {
            uses: {
              value: 5,
              max: 5
            },
            ticks: {
              value: 5,
              max: 5
            }
          }
        },
        selections: [],
        customProficiencies: [],
        customLanguages: [],
        customFeatures: [],
        customFeats: [],
        customTechPowers: [],
        customForcePowers: [],
        customEquipment: [],
        notes: '',
        builder: {
          currentStep: 1,
          showCharacterSheet: false
        },
        createdAt: 1615572574654,
        changedAt: 1615572574654
      }
    }
  },
  computed: {
    characters: {
      get () {
        return Object.keys(this.$store.getters['cb/characters'])
      },
      set (value) {
        return this.$store.commit('cb/UPDATE_CHARACTERS', value)
      }
    }
  },
  methods: {
    createNewCharacter () {
      const model = { ...this.characterStartState }
      model.createdAt = new Date().getTime()
      model.changedAt = new Date().getTime()
      model.id = model.createdAt
      this.characters = model
      this.$router.push({
        path: `/character-builder/${model.id}/edit`
      })
    },
    characterImage (character) {
      return character.image || require('~/assets/images/me5e_logo_450w.png')
    },
    characterName (character) {
      return character.name || 'Unnamed Character'
    }
  }
}
</script>
