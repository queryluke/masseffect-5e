<template>
  <div>
    <input ref="file" type="file" style="display: none" @load="character = $event" @change="loadTextFromFile">
    <v-btn color="primary" @click="$refs.file.click()">
      <v-icon left>
        mdi-upload
      </v-icon>
      Import
    </v-btn>
  </div>
</template>

<script>
export default {
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
          await this.$store.dispatch('characters/CREATE_CHARACTER', char)
        }
      }
    }
  }

}
</script>
