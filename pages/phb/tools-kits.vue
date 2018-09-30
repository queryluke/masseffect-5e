<template lang="pug">
  v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )
    h2.display-1.hidden-sm-and-down Tools & Kits
    v-expansion-panel.my-5
      v-expansion-panel-content(v-for="item in items" v-bind:key="item.id")
        div(slot="header") {{ item.name }}
        v-card.grey.lighten-3
          v-card-text
            p.title {{ item.name }}
            p.body-1 Cost: {{ item.cost }}
            markdown-file(:id="item.id" itemType="tools")
          v-card-actions
            bookmark-button(:card="item" type="tools" v-bind:props="{flat: true}")
</template>

<script>
  import tools from '~/static/data/tools/index.json'
  import MarkdownFile from '~/components/MarkdownFile.vue'
  import BookmarkButton from '~/components/BookmarkButton.vue'

  export default {
    components: {
      MarkdownFile,
      BookmarkButton
    },
    data () {
      return {
        items: tools
      }
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
