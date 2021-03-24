<template>
  <div>
    <v-container>
      <v-row v-if="!Object.keys(characters).length">
        <v-col
          cols="12"
          class="text-center"
        >
          <h3>Welcome to the ME5e Character Builder!</h3>
          <p>Click the button below to get started</p>
        </v-col>
      </v-row>
      <v-row
        v-else
      >
        <v-col
          cols="6"
          v-for="(char, index) in characters"
          :key="index"
        >
          <v-sheet
            class="d-flex flex-wrap"
            elevation="1"
          >
            <div
              @click="goToCharacter(char.character.id)"
              class="d-flex justify-left pa-3 ma-3 text-left"
            >
              <v-img
                v-if="char.character.image"
                :src="char.character.image"
                max-width="100px"
                height="80px"
                lazy-src="https://static.wikia.nocookie.net/masseffect/images/"
              />
              <div class="text-left ps-3">
                <h3>
                  {{char.character.name || "New Character"}}
                </h3>
              </div>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn
            @click="createNewCharacter()"
          >
            Create a New Character
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  methods: {
    createNewCharacter () {
      const model = { ...this.characterModel }
      model.id = this.createRandomId()
      model.createdAt = new Date().getTime()
      model.changedAt = new Date().getTime()
      this.characters = model
      this.goToCharacter(model.id)
    },
    createRandomId () {
      let rid = 0
      for (const char in this.characters) {
        if (char + '' === rid + '') {
          rid++
        }
      }
      return rid
    },
    goToCharacter (charId) {
      this.$router.push({ query: { cid: charId } })
    }
  },
  computed: {
    characterModel () {
      return this.$store.getters['cb/characterStartState']
    },
    characters: {
      get () {
        return this.$store.getters['cb/characters']
      },
      set (obj) {
        return this.$store.commit('cb/UPDATE_CHARACTERS', obj)
      }
    }
  }
}
</script>
