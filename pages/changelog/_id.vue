<template>
  <v-container>
    <div class="news-post mb-5">
      <h1 class="text-h2">
        {{ item.title }}
      </h1>
      <p class="text-subtitle-1">
        <em>
          {{ parsedDate }}
        </em>
      </p>
      <me-html :content="item.html" />
    </div>
    <v-btn :to="localePath('/changelog')" nuxt color="secondary">
      <v-icon>
        mdi-arrow-left
      </v-icon>
      {{ $t('buttons.back_to_changelog') }}
    </v-btn>
  </v-container>
</template>

<script>
export default {
  async asyncData ({ store }) {
    await store.dispatch('FETCH_DATA', 'changelog')
  },
  computed: {
    item () {
      return this.$store.getters.getItem('changelog', this.$route.params.id)
    },
    parsedDate () {
      return this.$moment(this.item.date).format('dddd, MMMM Do, YYYY')
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: this.item.title,
      subTitle: this.$t('changelog_title'),
      description: this.item.description
    })
  }
}
</script>

<style lang="scss">
  .news-post .markdown-content {
    h2 {
      border-bottom: 1px solid gray;
      margin-top: 2em;
    }

    ul {
      margin-top: 0;
    }
  }
</style>
