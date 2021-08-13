<template>
  <v-container>
    <me-character-builder-psa />
    <v-row v-if="characters.length === 0">
      <v-col cols="12" class="text-center">
        <div class="text-h4">
          Welcome to the ME5e Character Builder!
        </div>
      </v-col>
    </v-row>
    <v-row v-else class="d-flex justify-center">
      <v-col cols="12" class="text-center">
        <div class="text-h5">
          My Characters
        </div>
      </v-col>
      <v-col v-for="characterId in characters" :key="characterId" sm="8" lg="6">
        <div class="text-right mb-2">
          <me-character-builder-import />
        </div>
        <me-character-builder-index-card :character-id="characterId" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center d-flex justify-space-around">
        <v-btn @click="createNewCharacter">
          Create a New Character
        </v-btn>
        <me-character-builder-import v-if="characters.length === 0" />
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
          genMethod: {
            text: 'Standard Array',
            value: 'standard'
          },
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
        background: null,
        characteristics: {
          alignment: '',
          personality_traits: '',
          ideal: '',
          bond: '',
          flaw: '',
          gender: '',
          place_of_birth: '',
          age: '',
          height: '',
          weight: '',
          hair: '',
          eyes: '',
          skin: '',
          appearance: '',
          backstory: ''
        },
        credits: 0,
        omnigel: 0,
        medigel: 0,
        equipment: [],
        powers: [],
        selections: [],
        currentStats: {
          hitPointsLost: 0,
          tempHp: {
            max: 0,
            value: 0
          },
          shields: {
            value: 0,
            max: 0
          },
          barrier: {
            used: 0,
            ticksUsed: 0
          },
          hitDiceUsed: {},
          deathSaves: {
            successes: 0,
            failures: 0
          },
          tpUsed: 0,
          psUsed: [0, 0, 0, 0, 0],
          hasInspiration: false,
          featuresTimesUsed: {},
          conditions: [],
          exhaustion: 0,
          indoctrination: 0
        },
        settings: {
          acOverride: null,
          acBonus: 0,
          shields: 5,
          regen: 5,
          speeds: {
            walk: 0,
            swim: 0,
            fly: 0,
            burrow: 0,
            climb: 0
          },
          senses: {
            darkvision: 0,
            tremorsense: 0,
            blindsight: 0,
            infrared_vision: 0,
            truesight: 0
          },
          attackMod: 0,
          attackMeleeMod: 0,
          attackRangedMod: 0,
          attackSpellMod: 0,
          damageMod: 0,
          damageMeleeMod: 0,
          damageRangedMod: 0,
          damageSpellMod: 0,
          damageRes: [],
          damageImm: [],
          damageVul: [],
          conditionImm: [],
          powerModAbility: null,
          skills: [],
          expertise: []
        },
        notes: '',
        brews: [],
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
        path: `/characters/builder?id=${model.id}`
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
