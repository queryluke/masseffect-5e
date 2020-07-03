<template lang="pug">
  div
    v-btn(@click="saveFile()") Export Character Sheet
    input(type="file" ref="file" style="display: none" @change="loadTextFromFile" @load="character = $event")

    v-dialog(v-model="dialog" width="500")
      template(v-slot:activator="{on}")
        v-btn(v-on="on") Import Character Sheet

      v-card
        v-card-title(primary-title)
          h1 Warning!!
        v-card-text()
         p Importing a character will overwrite your currently open character.
         p Are you sure you want to continue?
        v-divider
        v-card-actions
          v-btn(color="primary" @click="dialog = false;") No
          v-btn(@click="$refs.file.click(); dialog = false;") Yes

</template>

<script>
export default {
  props: {
    character: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      dialog: false
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

      console.log(file)
      if (!file) { return }
      reader.readAsText(file)

      reader.onload = (e) => {
        console.log(e.target.result)
        const dataDump = e.target.result
        if (dataDump && dataDump !== '') {
          console.log('[bdc4] - triggering load event...')
          const char = JSON.parse(e.target.result)
          this.$emit('load', char)
        }
      }
    }
  }

}
</script>
