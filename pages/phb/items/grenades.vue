<template lang="pug">
  v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )
    h2.display-1.hidden-sm-and-down Grenades
    v-expansion-panel.mb-2
      v-expansion-panel-content(v-for="grenade in items" v-bind:key="grenade.id")
        div(slot="header")
          v-layout
            v-flex.xs12.sm5.md4 {{ grenade.name }}
            v-flex.hidden-xs-only.sm3.md2 {{ grenade.damage_amount }}{{ grenade.dd }}
            v-flex.hidden-xs-only.sm4.md2 {{ grenade.damage_type }}
            v-flex.hidden-sm-and-down.md2 {{ grenade.range }}
            v-flex.hidden-sm-and-down.md2 {{ grenade.blast }}
        v-card.grey.lighten-3
          v-card-text
            grenade-info(:grenade="grenade")
          v-card-actions
            bookmark-button(:card="grenade" type="grenade" v-bind:props="{flat: true}")
</template>

<script>
  import GrenadeInfo from '~/components/GrenadeInfo.vue'
  import BookmarkButton from '~/components/BookmarkButton.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      GrenadeInfo,
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
      this.items = this.getData('grenades')
      console.log(this.items)
    },
    head () {
      return {
        title: 'Mass Effect 5e | Equipment - Grenades & Mines',
        meta: [
          { hid: 'description', name: 'description', content: 'Grenades offer an offensive boost while mines can be used like D&D traps.' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
