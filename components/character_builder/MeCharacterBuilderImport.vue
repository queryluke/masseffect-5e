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
    <v-btn @click="saveAllCharacters" class="ml-2">
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

      reader.onload = (e) => {
        const dataDump = e.target.result
        if (dataDump && dataDump !== '') {
          const char = JSON.parse(e.target.result)
          if (this.multiple) {
            for (const character of Object.values(char)) {
              this.$store.commit('cb/UPDATE_CHARACTERS', character)
            }
          } else {
            this.$store.commit('cb/UPDATE_CHARACTERS', char)
          }
        }
      }
    },
    saveAllCharacters () {
      const characters = this.$store.getters['cb/characters']
      const data = JSON.stringify(characters)
      const blob = new Blob([data], { type: 'text/plain' })
      const e = document.createEvent('MouseEvents')
      const a = document.createElement('a')

      const filename = Object.keys(characters).join('-')
      a.download = `ME5e_Characters-${filename}.json`
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    }
  }

}
</script>
