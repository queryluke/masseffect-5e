<template>
  <small>
    <me-html v-if="!loading" :content="shortDesc" classes="text-caption" />
  </small>
</template>
<script>

export default {
  name: 'MeCsActionShortDesc',
  props: {
    shortDesc: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false
    }
  },
  watch: {
    shortDesc () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 100)
    }
  }
}
</script>
