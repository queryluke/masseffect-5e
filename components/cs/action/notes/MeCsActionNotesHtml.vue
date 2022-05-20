<template>
  <me-html v-if="!loading" :content="note.text" inline classes="text-caption" />
</template>
<script>

export default {
  name: 'MeCsActionNotesHtml',
  props: {
    note: {
      type: Object,
      default: () => {
        return {
          text: ''
        }
      }
    }
  },
  data () {
    return {
      loading: false
    }
  },
  watch: {
    note () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 100)
    }
  }
}
</script>
