<template lang="pug">
  v-container(fluid)
    h2.display-1.hidden-sm-and-down Bookmarks
    v-layout(row wrap v-for="(cards, type) of bookmarksGroupedByType" v-bind:key="type")
      v-flex(xs12)
        h3.headline {{ headers[type] }}
      v-flex(v-for="(card, index) in cards" v-bind:key="index" xs12 lg6)
        v-card.ma-1
          v-card-text
            spell-info(:spell="card" v-if="type === 'spell'")
            weapon-info(:weapon="card" v-else-if="type === 'weapon'")
            grenade-info(:grenade="card" v-else-if="type === 'grenade'")
            stat-block(:stats="card" v-else-if="type === 'npc'")
            weapon-mod-info(:mod="card" v-else-if="type === 'weaponMod'")
            armor-mod-info(:mod="card" v-else-if="type === 'armorMod'")
            armor-set-info(:mod="card" v-else-if="type === 'armorSet'")
            markdown-file(:id="card.id" v-bind:itemType="type" v-else)
          v-card-actions
            bookmark-button(:card="card" v-bind:type="type" v-bind:props="{flat: true}")
</template>

<script>
  import { mapGetters } from 'vuex'
  import SpellInfo from '~/components/spell/SpellInfo.vue'
  import WeaponInfo from '~/components/weapon/WeaponInfo.vue'
  import BookmarkButton from '~/components/BookmarkButton.vue'
  import StatBlock from '~/components/npc/StatBlock.vue'
  import GrenadeInfo from '~/components/grenade/GrenadeInfo.vue'
  import WeaponModInfo from '~/components/weapon_mod/WeaponModInfo.vue'
  import ArmorModInfo from '~/components/armor_mod/ArmorModInfo.vue'
  import ArmorSetInfo from '~/components/armor_set/ArmorSetInfo.vue'
  import MarkdownFile from '~/components/MarkdownFile.vue'

  export default {
    components: {
      GrenadeInfo,
      StatBlock,
      SpellInfo,
      WeaponInfo,
      WeaponModInfo,
      ArmorModInfo,
      ArmorSetInfo,
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
          weaponMod: 'Weapon Mods',
          armorMod: 'Armor Mods',
          armorSet: 'Armor Sets',
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
