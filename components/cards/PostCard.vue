<template lang="pug">
  v-card(hover v-bind:to="post.url" nuxt).post__card
    v-img(:src="post.image" v-bind:height="height")
      div.date-grid.text-xs-center
        span.month.date-part {{ post.date | formatDate('MMM') }}
        span.day.date-part {{ post.date | formatDate('DD') }}
        span.year.date-part {{ post.date | formatDate('YYYY') }}
    v-card-title.mb-0.pb-0
      p.headline.mb-0 {{ post.title }}
    v-card-text.pt-0
      p {{ post.description }}

</template>

<script>
  export default {
    props: ['post', 'height']
  }
</script>

<style lang="scss">
  .post__card {
    .card__media__content {
      background: rgba(0, 0, 0, 0.2);
      -webkit-transition: background 150ms ease-out;
      -moz-transition: background 150ms ease-out;
      -o-transition: background 150ms ease-out;
      transition: background 150ms ease-out;
    }

    &:hover {
      .card__media__content {
        background: rgba(0, 0, 0, 0);
      }
    }
  }
</style>