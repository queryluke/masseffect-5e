<template lang="pug">
  v-container
    h2.display-3 Backgrounds
    div.mt-3
      v-expansion-panel(popout).mb-2
        v-expansion-panel-content(v-for="item in items" v-bind:key="item.id" hide-actions).large-panel
          div(slot="header") {{ item.name }}
          v-card.grey.lighten-3
            v-card-text
              p.title {{ item.name }}
              markdown-file(:id="item.id" itemType="backgrounds")
            v-card-actions
              bookmark-button(:card="item" type="backgrounds" v-bind:props="{flat: true}")
</template>

<script>
  import {mapGetters} from 'vuex'
  import MarkdownFile from '~/components/MarkdownFile.vue'
  import BookmarkButton from '~/components/shared/BookmarkButton'

  export default {
    components: {
      MarkdownFile,
      BookmarkButton
    },
    computed: {
      ...mapGetters(['getData'])
    },
    created () {
      this.items = this.getData('backgrounds')
    },
    data () {
      return {
        items: []
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Backgrounds',
        meta: [
          { hid: 'description', name: 'description', content: 'Backgrounds provide additional flavor and benefits to your character.' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
