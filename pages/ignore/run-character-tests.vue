<template>
  <div v-if="!$fetchState.pending">
    <div v-if="!loadingCharacter">
      <me-cs-main-menu />
      <me-cs-apsi />
      <me-cs-health />
      <me-cs-saving-throws />
      <me-cs-senses />
      <me-cs-skills />
      <me-cs-powers-mods />
      <me-cs-actions />
      <template v-for="powerLevel in [0, 1, 2, 3, 4, 5]">
        <me-cs-powers-by-level :key="`powerLevel-${powerLevel}`" :level="powerLevel" />
      </template>
      <me-cs-equipment />
      <me-cs-features />
      <me-cs-details />
      <me-cs-notes />
      <me-cs-reputation />
      <me-cs-proficiencies />
      <me-cs-powers-manager />
      <me-cs-equipment-manager />
      <me-cs-rest-menu />
      <me-cs-character-preferences-side-nav />
      <me-cs-character-side-nav />
      <me-cs-equipment-credits />
      <me-cb-xp-interface />
    </div>
  </div>
</template>

<script>
import jsonpack from 'jsonpack/main'
const characters = require('~/static/characters.json')
export default {
  data () {
    return {
      characters,
      loadingCharacter: true
    }
  },
  async fetch () {
    await this.$store.dispatch('character/FETCH_CB_DATA')
    if (this.$route.query.id) {
      this.loadCharacter(this.$route.query.id)
    } else {
      this.runTests()
    }
  },
  watch: {
    error () {
      console.log('error')
    }
  },
  methods: {
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async runTests () {
      const start = parseInt(this.$route.query.start) || 0
      for (const char of this.characters.slice(start)) {
        if (this.$nuxt?.nuxt?.err?.statusCode) {
          return
        }
        try {
          this.loadCharacter(char.id)
          await this.sleep(2000)
        } catch (e) {
          console.log('error')
          return
        }
      }
    },
    loadCharacter (id) {
      this.loadingCharacter = true
      const index = this.characters.findIndex(i => i.id === id)
      if (index > -1) {
        const character = this.characters[index]
        const data = jsonpack.unpack(character.data)
        this.$store.commit('character/SET_CHARACTER', data)
        if (this.$store.getters['character/characterReady']) {
          console.log(index)
          console.log(character.id)
          if (this.$route.query.id) {
            console.log(data)
          }
          this.loadingCharacter = false
        }
      }
    }
  }
}
</script>
