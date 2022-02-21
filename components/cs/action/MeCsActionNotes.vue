<template>
  <div class="text-caption font-weight-light">
    <template v-for="(note, index) of notes">
      <me-html v-if="!loading" :key="index" :content="note" inline classes="text-caption" />
      <span v-if="index < notes.length - 1" :key="`note-comma-${index}`" class="ml-n1">, </span>
    </template>
  </div>
</template>
<script>

export default {
  name: 'MeCsActionNotes',
  props: {
    notes: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      loading: false
    }
  },
  watch: {
    notes () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 100)
    }
  }
}
</script>
