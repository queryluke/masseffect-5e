<template lang="pug">
  v-container(fluid)
    h2.display-3 Bookmarks
    v-layout(row wrap v-for="(cards, type) of bookmarksGroupedByType")
      v-flex(xs12)
        h3.display-1 {{ 2 | pluralize(type) | capitalize }}
      v-flex(v-for="(card, index) in cards" v-bind:key="index" xs12 lg6)
        v-card.ma-1
          v-card-text.grey.lighten-3
            spell-info(:spell="card" v-if="type === 'spell'")
            weapon-info(:weapon="card" v-if="type === 'weapon'")
            bookmark-button(:card="card" v-bind:type="type")
</template>

<script>
  import { mapGetters } from 'vuex';
  import SpellInfo from '../components/SpellInfo.vue';
  import WeaponInfo from '../components/WeaponInfo.vue';
  import BookmarkButton from '../components/BookmarkButton.vue';

  export default {
    components: {SpellInfo, WeaponInfo, BookmarkButton},
    name: 'Bookmarks',
    computed: {
      ...mapGetters(['bookmarksGroupedByType']),
    },
  };
</script>
