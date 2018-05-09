<template lang="pug">
  v-container
    h2.display-3 Feats
    p.
      Feats are part of the official #[em Dungeons & Dragons Players Handbook] (PHB). Due to copyright reasons, I can only note any changed or new feats
      available in this system. Hence, if a feat doesn't have a description, you can look it up in your copy of the PHB with the page number provided.
    p.
      The following feats from the PHB are not available: {{ notAvailable }}
    div.mt-3
      v-expansion-panel(popout).mb-2
        v-expansion-panel-content(v-for="feat in items" v-bind:feat="feat" v-bind:key="feat.name").large-panel
          div(slot="header")
            v-layout
              v-flex.xs2.md1
                v-avatar(:class="[feat.page_number ? 'deep-purple' : 'deep-orange']" size="30px")
                  span(v-if="feat.page_number").white--text PHB
                  span(v-else).white--text New
              v-flex.xs10.md3.pt-1
                strong {{ feat.name }}
              v-flex.hidden-sm-and-down.md-8.pt-1 {{ feat.notes }}
          v-card
            v-card-text.grey.lighten-3
              p(v-if="feat.page_number") p. {{ feat.page_number }}
              p(v-if="feat.description")
                me-element(:text="feat.description")
    page-footer(:list="listName")
</template>

<script>
  import MeElement from '~/components/shared/MeElement.vue'
  import PageFooter from '~/components/phb/PageFooter.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      MeElement,
      PageFooter
    },
    computed: {
      ...mapGetters(['getData'])
    },
    created () {
      const data = this.getData('feats')
      this.items = data.filter((value) => {
        return value.not_available === null
      })
      const notAvailable = data.filter((value) => {
        return value.not_available !== null
      })
      this.notAvailable = notAvailable.map(value => value.name).join(', ')
    },
    data () {
      return {
        items: [],
        listName: 'feats',
        notAvailable: ''
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
