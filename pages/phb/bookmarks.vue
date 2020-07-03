<template lang="pug">
  v-container(fluid grid-list-xl)
    v-speed-dial(v-model="fab" right bottom direction="top" fixed transition="slide-x-reverse-transition")
      v-btn(slot="activator" v-model="fab" color="primary" dark fab)
        v-icon apps
        v-icon close
      v-btn(v-for="group of grouped"
          v-bind:key="group.icon"
          v-on:click="goToMark(`#${group.icon}`)"
          v-bind:color="group.color"
          fab dark small
          v-if="group.marks.length > 0"
        )
        v-icon {{ group.icon }}

    h2.display-3.hidden-sm-and-down Bookmarks
    v-layout(row wrap v-for="group of grouped" v-bind:key="group.icon" v-if="group.marks.length > 0").mt-5
      v-flex(xs12)
        h3(:id="group.icon").display-2 {{ group.title }}
      v-flex(v-for="(mark, index) in group.marks" v-bind:key="index" xs12 lg6)
        v-card.ma-1
          v-card-text
            spell-info(:item="mark.card" v-if="mark.type === 'spell'")
            stat-block(:stats="mark.card" v-else-if="mark.type === 'npc'")
            weapon-info(:item="mark.card" v-else-if="mark.type === 'weapon'")
            grenade-info(:item="mark.card" v-else-if="mark.type === 'grenade'")
            weapon-mod-info(:item="mark.card" v-else-if="mark.type === 'weaponMod'")
            armor-mod-info(:item="mark.card" v-else-if="mark.type === 'armorMod'")
            armor-set-info(:item="mark.card" v-else-if="mark.type === 'armorSet'")
            vehicle-info(:item="mark.card" v-else-if="mark.type === 'vehicle'")
            program-info(:item="mark.card" v-else-if="mark.type === 'program'")
            div(v-else)
              p.headline {{ mark.card.name }}
              markdown-file(:id="mark.card.id" v-bind:itemType="mark.type" )
          v-card-actions
            bookmark-button(:card="mark.card" v-bind:type="mark.type" v-bind:props="{flat: true}")
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
import VehicleInfo from '~/components/vehicle/VehicleInfo.vue'
import ProgramInfo from '~/components/programs/ProgramInfo.vue'

export default {
  components: {
    GrenadeInfo,
    StatBlock,
    SpellInfo,
    WeaponInfo,
    WeaponModInfo,
    ArmorModInfo,
    ArmorSetInfo,
    VehicleInfo,
    ProgramInfo,
    BookmarkButton
  },
  data () {
    return {
      fab: false,
      groups: [
        {
          title: 'Equipment',
          icon: 'build',
          color: 'orange',
          group: ['tools', 'grenade', 'weapon', 'weaponMod', 'armorMod', 'armorSet', 'program'],
          marks: []
        },
        {
          title: 'Spells',
          icon: 'whatshot',
          color: 'cyan',
          group: ['spell'],
          marks: []
        },
        {
          title: 'Npcs',
          icon: 'pets',
          color: 'purple',
          group: ['npc'],
          marks: []
        },
        {
          title: 'Vehicles',
          icon: 'flight_takeoff',
          color: 'green',
          group: ['vehicle'],
          marks: []
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['bookmarks']),
    grouped () {
      const g = this.groups.map((g) => {
        g.marks = []
        return g
      })
      for (const bm of this.bookmarks) {
        for (const type of g) {
          if (type.group.includes(bm.type)) {
            type.marks.push(bm)
          }
        }
      }
      return g
    }
  },
  methods: {
    goToMark (id) {
      this.$vuetify.goTo(id, { offset: -68 })
    }
  },
  head () {
    return {
      title: 'Bookmarks | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Keep your favorite weapons, enemies, and spells close at hand with our nifty bookmark tool.' }
      ]
    }
  },
  layout: 'phb'
}
</script>
