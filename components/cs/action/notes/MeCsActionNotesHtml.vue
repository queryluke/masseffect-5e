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
    },
    hasNext: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    text () {
      return this.hasNext ? `${this.note.text},` : this.note.text
    }
  },
  watch: {
    text () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 100)
    }
  }
}
</script>
