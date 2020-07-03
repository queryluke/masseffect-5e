<template lang="pug">
  v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )

    div.text-md-right
      v-btn(to="/phb/rules/equipment#tools-kits" nuxt outline color="secondary") Tools & Kits Rules

    // Search functions for large screens
    div.mb-5.hidden-sm-and-down
      h2.display-1 Tools & Kits
      div.hr.mb-0

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
import tools from '~/static/data/tools.json'
import BookmarkButton from '~/components/BookmarkButton.vue'

export default {
  components: {
    BookmarkButton
  },
  data () {
    return {
      items: tools
    }
  },
  head () {
    return {
      title: 'Tools & Kits - Equipment | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Tools and Kits provide a wide variety of combat flavor and uses' }
      ]
    }
  },
  layout: 'phb'
}
</script>
