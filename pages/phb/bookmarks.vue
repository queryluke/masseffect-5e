<template lang="pug">
  v-container(fluid)
    h2.display-3 Bookmarks
    v-layout(row wrap v-for="(cards, type) of bookmarksGroupedByType" v-bind:key="type")
      v-flex(xs12)
        h3.display-1 {{ headers[type] }}
      v-flex(v-for="(card, index) in cards" v-bind:key="index" xs12 lg6)
        v-card.ma-1
          v-card-text
            spell-info(:spell="card" v-if="type === 'spell'")
            weapon-info(:weapon="card" v-if="type === 'weapon'")
            grenade-info(:grenade="card" v-if="type === 'grenade'")
            stat-block(:stats="card" v-if="type === 'npc'")
            markdown-file(:id="card.id" v-bind:itemType="type")
          v-card-actions
            bookmark-button(:card="card" v-bind:type="type" v-bind:props="{flat: true}")
</template>

<script>
  import { mapGetters } from 'vuex'
  import SpellInfo from '~/components/shared/SpellInfo.vue'
  import WeaponInfo from '~/components/shared/WeaponInfo.vue'
  import BookmarkButton from '~/components/shared/BookmarkButton.vue'
  import StatBlock from '~/components/shared/StatBlock.vue'
  import GrenadeInfo from '~/components/shared/GrenadeInfo.vue'
  import MarkdownFile from '~/components/shared/MarkdownFile.vue'

  export default {
    components: {
      GrenadeInfo,
      StatBlock,
      SpellInfo,
      WeaponInfo,
      BookmarkButton,
      MarkdownFile
    },
    computed: {
      ...mapGetters(['bookmarksGroupedByType'])
    },
    data () {
      return {
        headers: {
          kits: 'Tools & Kits',
          backgrounds: 'Backgrounds',
          spell: 'Spells',
          grenade: 'Grenades & Mines',
          weapon: 'Weapons',
          npc: 'Npcs'
        }
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Player\'s Handbook - Bookmarks',
        meta: [
          { hid: 'description', name: 'description', content: 'Keep your favorite weapons, enemies, and spells close at hand with our nifty bookmark tool.' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
