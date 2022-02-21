<template>
  <div class="d-flex">
    <input ref="file" type="file" style="display: none" @load="character = $event" @change="loadTextFromFile">
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on">
          Import
          <v-icon right>
            mdi-menu-down
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="multiple = false; $refs.file.click()">
          <v-list-item-title>Single Character</v-list-item-title>
        </v-list-item>
        <v-list-item @click="multiple = true; $refs.file.click()">
          <v-list-item-title>Multiple (in a single file)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn v-if="$store.getters['characters/characters'].length" class="ml-2" @click="saveAllCharacters">
      Export All
    </v-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      multiple: false
    }
  },
  methods: {
    loadTextFromFile (ev) {
      const file = ev.target.files[0]
      const reader = new FileReader()

      if (!file) { return }
      reader.readAsText(file)
      reader.onload = async (e) => {
        const dataDump = e.target.result
        if (dataDump && dataDump !== '') {
          const char = JSON.parse(e.target.result)
          if (this.multiple) {
            if (Array.isArray(char)) {
              for (const character of char) {
                await this.$store.dispatch('characters/CREATE_CHARACTER', character)
              }
            } else {
              // TEMP for pre-v140 characters
              for (const character of Object.values(char)) {
                await this.$store.dispatch('characters/CREATE_CHARACTER', character)
              }
            }
          } else {
            await this.$store.dispatch('characters/CREATE_CHARACTER', char)
          }
        }
      }
    },
    saveAllCharacters () {
      const characters = this.$store.getters['characters/characters']
      const data = JSON.stringify(characters)
      const blob = new Blob([data], { type: 'text/plain' })
      const e = document.createEvent('MouseEvents')
      const a = document.createElement('a')

      const date = new Date()
      a.download = `ME5e_Characters-${date.getTime()}.json`
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    }
  }

}
</script>
