<template>
  <v-row>
    <v-col cols="12" xl="6">
      <v-btn @click="saveFile()">
        Export Character Sheet
      </v-btn>
      <input
        ref="file"
        type="file"
        style="display: none"
        @change="loadTextFromFile"
        @load="character = $event"
      >
    </v-col>
    <v-col cols="12" xl="6">
      <v-dialog v-model="dialog" :max-width="500">
        <template #activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">
            Import Character Sheet
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5">
            Warning!
          </v-card-title>
        </v-card>
        <v-card-text>
          <p>Importing a character will overwrite your currently open character.</p>
          <p>Are you sure you want to continue?</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="dialog = false">
            No
          </v-btn>
          <v-btn @click="$refs.file.click(); dialog = false">
            Yes
          </v-btn>
        </v-card-actions>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    character () {
      return this.$store.getters['user/character']
    }
  },
  methods: {
    saveFile () {
      const data = JSON.stringify(this.character)
      const blob = new Blob([data], { type: 'text/plain' })
      const e = document.createEvent('MouseEvents')
      const a = document.createElement('a')
      const filename = this.character.name.replace(/[^a-z0-9]/gi, '')// .toLowerCase()

      a.download = filename + '.json'
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    },
    loadTextFromFile (ev) {
      const file = ev.target.files[0]
      const reader = new FileReader()
      // eslint-disable-next-line
      console.log(file)
      if (!file) { return }
      reader.readAsText(file)

      reader.onload = (e) => {
        // eslint-disable-next-line
        console.log(e.target.result)
        const dataDump = e.target.result
        if (dataDump && dataDump !== '') {
          // eslint-disable-next-line
          console.log('[bdc4] - triggering load event...')
          const char = JSON.parse(e.target.result)
          this.$store.commit('user/LOAD_CHARACTER_FROM_FILE', char)
        }
      }
    }
  }

}
</script>
