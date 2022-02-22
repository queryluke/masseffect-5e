<template>
  <v-container style="max-width: 1200px">
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
        <me-tpg s="h2">
          My Characters
        </me-tpg>
      </v-col>
      <v-col v-for="character in characters" :key="character.id" sm="8" lg="6">
        <me-character-card :character="character" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn :loading="loading" @click="createNewCharacter">
          New Character
        </v-btn>
      </v-col>
      <v-col class="text-center d-flex justify-space-around">
        <me-character-import-btn />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData ({ store }) {
    await store.dispatch('characters/FETCH_CHARACTERS')
    await store.dispatch('FETCH_LOTS', ['species', 'classes', 'subclasses'])
    store.dispatch('SET_META', {
      title: 'Character Builder',
      description: 'Build your own ME5e Character'
    })
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    characters () {
      return this.$store.getters['characters/characters']
    }
  },
  methods: {
    async createNewCharacter () {
      this.loading = true
      const id = await this.$store.dispatch('characters/NEW_CHARACTER')
      this.$router.push({
        path: '/characters/builder',
        query: {
          id
        }
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
