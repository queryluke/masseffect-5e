<template lang="pug">
  v-container.mt-5
    v-row(justify="space-around")
      v-col(v-for="item in items" :key="item.id" cols="12" md="4")
        me-news-card(:news="item" height="200px")
</template>

<script>

export default {
  async fetch () {
    this.changelog = await this.$store.dispatch('FETCH_DATA', 'changelog')
  },
  data () {
    return {
      changelog: []
    }
  },
  computed: {
    items () {
      return this.changelog.slice().reverse()
    }
  },
  head () {
    return {
      title: 'Changelog | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Keep up-to-date with all the Mass Effect 5e system rule additions and updates.' }
      ]
    }
  }
}
</script>
