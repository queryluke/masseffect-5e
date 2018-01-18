<template lang="pug">
  span
    v-btn(dark @click="removeBookmark({card, type})" color="grey darken-3" v-if="isBookmarked(card)")
      v-icon(left) delete
      span Remove Bookmark
    v-btn(dark @click="addBookmark({card, type})" color="primary" v-else)
      v-icon(left) bookmark
      span Bookmark
</template>

<script>
  import {mapActions} from 'vuex';
  import {mapGetters} from 'vuex';

  export default {
    name: 'BookmarkButton',
    props: ['card', 'type'],
    methods: {
      ...mapActions(['addBookmark', 'removeBookmark'])
    },
    computed: {
      ...mapGetters(['isBookmarked'])
    }
  };
</script>

