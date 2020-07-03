<template lang="pug">
  v-container
    h2.display-1.hidden-sm-and-down Backgrounds

    p.
      The sample backgrounds presented here provide both concrete benefits (features, proficiencies, and languages) and
      roleplaying suggestions.
    v-expansion-panel.mb-2
      v-expansion-panel-content(v-for="item in backgrounds" v-bind:key="item.id").large-panel
        div(slot="header") {{ item.name }}
        v-card.grey.lighten-3
          v-card-text
            p.display-1.font-weight-thin {{ item.name }}
            markdown-file(:id="item.id" itemType="backgrounds")
</template>

<script>
import backgrounds from '~/static/data/backgrounds.json'
import BookmarkButton from '~/components/BookmarkButton.vue'

export default {
  components: {
    BookmarkButton
  },
  data () {
    return {
      backgrounds
    }
  },
  head () {
    return {
      title: 'Backgrounds | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Backgrounds provide additional flavor and benefits to your character.' }
      ]
    }
  },
  layout: 'phb'
}
</script>
