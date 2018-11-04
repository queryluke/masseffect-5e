<template lang="pug">
  v-container
    h2.display-1.hidden-sm-and-down Feats
    p.
      A feat represents a talent or an area of expertise that gives a character special capabilities. It embodies
      training, experience, and abilities beyond what a class provides. Mass Effect 5e uses a number of feats in the
      Player's Manual, providing page numbers for reference.
    p.
      At certain levels, your class gives you the Ability Score Improvement feature. Using the optional feats rule, you
      can forgo taking that feature to take a feat of your choice instead. You can take each feat only once, unless
      the feat’s description says otherwise.
    p.
      You must meet any prerequisite specified in a feat to take that feat. If you ever lose a feat’s prerequisite,
      you can’t use that feat until you regain the prerequisite.
    v-expansion-panel.my-5
      v-expansion-panel-content(v-for="feat in items" v-bind:feat="feat" v-bind:key="feat.name").large-panel
        div(slot="header")
          v-layout
            v-flex.xs2.sm1
              v-avatar(:class="[feat.new ? 'deep-purple' : 'deep-orange']" size="30px")
                span(v-if="feat.new").white--text New
                span(v-else).white--text PHB
            v-flex.xs10.sm5.lg2.pt-1
              strong {{ feat.name }}
            v-flex.hidden-md-and-down.lg3
              div(v-if="feat.prerequisite") {{ feat.prerequisite }}
              div(v-else) -
            v-flex.hidden-xs-only.sm6.lg6 {{ feat.note }}
        v-card
          v-card-text.grey.lighten-3
            markdown-file(:id="feat.id" itemType="feats")
</template>

<script>
  import items from '~/static/data/feats.json'

  export default {
    data () {
      return {
        items
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Feats',
        meta: [
          { hid: 'description', name: 'description', content: 'New feats available! Plus a curated list of D&D 5th edition feats.' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
