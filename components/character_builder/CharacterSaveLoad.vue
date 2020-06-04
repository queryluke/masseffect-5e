<template lang="pug">
  div
    v-btn(@click="saveFile()") Save Character Sheet
    input(type="file" ref="file" style="display: none" @change="loadTextFromFile" @load="character = $event")
    v-btn(@click="$refs.file.click()") Load Character Sheet
</template>

<script>
  export default {
    props: {
      character: {
        type: Object,
        default: () => {return {} }
      }
    },
    methods: {
      saveFile: function() {
        const data = JSON.stringify(this.character);
        const blob = new Blob([data], {type: 'text/plain'})
        const e = document.createEvent('MouseEvents');
        const a = document.createElement('a');
        const filename = this.character.name.replace(/[^a-z0-9]/gi, '');//.toLowerCase()

        a.download = filename + ".json";
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
      },
      loadTextFromFile(ev) {
        const file = ev.target.files[0];
        const reader = new FileReader();
        
        console.log(file);
        if (!file) return;
        reader.readAsText(file);
        
        reader.onload = e => {
          console.log(e.target.result);
          const dataDump = e.target.result;
          if (dataDump && dataDump != '') {
            console.log("[bdc4] - triggering load event...")
            var char = JSON.parse(e.target.result);
            this.$emit("load", char);
          }
        }
        
      }
    }

  }
</script>