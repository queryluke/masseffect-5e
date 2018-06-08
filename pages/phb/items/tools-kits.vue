<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex(xs12)
        h2.display-3 Tools & Kits
      v-flex(xs12)
        div.mt-3
          v-expansion-panel(popout).mb-2
            v-expansion-panel-content(v-for="item in items" v-bind:key="item.id" hide-actions).large-panel
              div(slot="header") {{ item.name }}
              v-card.grey.lighten-3
                v-card-text
                  markdown-file(:id="item.id" itemType="kits")
                v-card-actions
                  bookmark-button(:card="item" type="kits" v-bind:props="{flat: true}")
</template>

<script>
  import MarkdownFile from '~/components/shared/MarkdownFile.vue'
  import BookmarkButton from '~/components/shared/BookmarkButton'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      MarkdownFile,
      BookmarkButton
    },
    computed: {
      ...mapGetters(['getData'])
    },
    data () {
      return {
        items: []
      }
    },
    created () {
      this.items = this.getData('kits')
    },
    head () {
      return {
        title: 'Mass Effect 5e | Equipment - Tools & Kits',
        meta: [
          { hid: 'description', name: 'description', content: 'Tools and Kits provide a wide variety of combat flavor and uses' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
