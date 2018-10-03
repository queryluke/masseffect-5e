<template lang="pug">
  v-container
    h2.display-1.hidden-sm-and-down Backgrounds
    p.
      The sample backgrounds presented here provide both concrete benefits (features, proficiencies, and languages) and
      roleplaying suggestions. If you create new backgrounds for your campaign, #[a(mailto="info@n7.world") let us know]
      so we can include them and give you credit!
    v-expansion-panel.mb-2
      v-expansion-panel-content(v-for="item in backgrounds" v-bind:key="item.id").large-panel
        div(slot="header") {{ item.name }}
        v-card.grey.lighten-3
          v-card-text
            p.title {{ item.name }}
            markdown-file(:id="item.id" itemType="backgrounds")
          // v-card-actions
            bookmark-button(:card="item" type="backgrounds" v-bind:props="{flat: true}")
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
        title: 'Mass Effect 5e | Backgrounds',
        meta: [
          { hid: 'description', name: 'description', content: 'Backgrounds provide additional flavor and benefits to your character.' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
