<template lang="pug">
  v-card(hover @click="show()").search-result
    v-card-text
      div.body-2
        span(:class="textColor").text-uppercase {{ subType }}
          span(v-for="q in doc.qualifiers" v-bind:key="q").pl-1 #[v-icon(small) keyboard_arrow_right] {{ q }}
      div.headline {{ doc.title }}
        // div.mb-5 {{ result }}
        // div.mb-5 {{ snippets }}
      div(v-show="!showFull")
        p(v-html="description")
      div(v-show="showFull")
        markdown-file(v-if="mdComponents.includes(doc.subType)" v-bind:id="doc.id" v-bind:itemType="doc.subType")
        markdown-file(v-if="doc.subType === 'class_features'" v-bind:id="doc.id.split('---')[0]" itemType="class_features" v-bind:context="levelContext")
        component(v-if="infoComponents.includes(doc.subType)" v-bind:is="component" v-bind="infoItem")
        stat-block(v-if="doc.subType === 'bestiary'" v-bind:stats="infoItem")

</template>

<script>
import { mapGetters } from 'vuex'
import SpellInfo from '~/components/spell/SpellInfo.vue'
import WeaponInfo from '~/components/weapon/WeaponInfo.vue'
import StatBlock from '~/components/npc/StatBlock.vue'
import GrenadeInfo from '~/components/grenade/GrenadeInfo.vue'
import WeaponModInfo from '~/components/weapon_mod/WeaponModInfo.vue'
import ArmorModInfo from '~/components/armor_mod/ArmorModInfo.vue'
import ArmorSetInfo from '~/components/armor_set/ArmorSetInfo.vue'
import VehicleInfo from '~/components/vehicle/VehicleInfo.vue'
import ProgramInfo from '~/components/programs/ProgramInfo.vue'

export default {
  name: 'SearchResult',
  components: {
    GrenadeInfo,
    StatBlock,
    SpellInfo,
    WeaponInfo,
    WeaponModInfo,
    ArmorModInfo,
    ArmorSetInfo,
    VehicleInfo,
    ProgramInfo
  },
  props: {
    doc: {
      type: Object,
      default: () => {}
    },
    result: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showFull: false,
      subTypeNames: {
        traits: 'racial traits',
        subraces: 'races',
        programs: 'omni-tool programs',
        tools: 'tools & kits',
        armor_mods: 'armor mods',
        armor_sets: 'armor mods',
        weapon_mods: 'weapon mods',
        class_features: 'class features'
      },
      mdComponents: ['backgrounds', 'conditions', 'feats', 'tools'],
      infoComponents: ['grenades', 'programs', 'spells', 'vehicles', 'armor_mods', 'armor_sets', 'weapons', 'weapon_mods']
    }
  },
  computed: {
    ...mapGetters(['searchFilters']),
    textColor () {
      return this.searchFilters.find(sf => sf.id === this.doc.type).textColor
    },
    infoItem () {
      if (this.doc.subType === 'bestiary') {
        // TODO
        return '' // require(`~/static/data/bestiary/${this.doc.id}.json`)
      } else {
        // TODO
        // const items = require(`~/static/data/${this.doc.subType}.json`)
        return ''
        /*
        return {
          item: items.find(i => i.id === this.doc.id),
          title: false
        }
        */
      }
    },
    component () {
      const name = this.doc.subType.substring(0, this.doc.subType.length - 1).replace('_', '-')
      return `${name}-info`
    },
    description () {
      if (this.snippets.length === 0) {
        return this.$options.filters.truncate(this.doc.body, 156)
      }
      const mark = '<span class="yellow yellow-accent-2">'
      const endMark = '</span>'
      let text = this.snippets.map((s) => {
        let string = this.doc.body.substring(s.start, s.end)
        let totalIncrease = 0
        for (const p of s.positions) {
          const hlStart = p[0] - s.start + totalIncrease
          string = string.slice(0, hlStart) + mark + string.slice(hlStart)
          const hlEnd = hlStart + mark.length + p[1]
          string = string.slice(0, hlEnd) + endMark + string.slice(hlEnd)
          totalIncrease += mark.length + endMark.length
        }
        return string
      }).join('...')
      if (this.snippets[0] && this.snippets[0].start > 0) {
        text = '...' + text
      }
      return text
    },
    snippets () {
      const snippets = []
      Object.entries(this.result.matchData.metadata).forEach(([word, fields]) => {
        Object.entries(fields).forEach(([field, data]) => {
          if (field === 'body') {
            for (const position of data.position) {
              const resultStart = position[0]
              const resultLength = position[1]

              const start = resultStart - 30 <= 0 ? 0 : this.doc.body.indexOf(' ', (resultStart - 30))
              let end = this.doc.body.indexOf(' ', (resultStart + resultLength + 100))
              if (end < 0) {
                end = 1000000
              }

              // check for existing snippet
              let skip = false
              snippets.forEach((s, index) => {
                // If the start of the result is within an existing snippet
                if (resultStart >= s.start && resultStart <= s.end) {
                  // extend the length of the snippet only if the length of the result exceeds the snippets end
                  if ((resultStart + resultLength) > s.end) {
                    snippets[index].end = this.doc.body.indexOf(' ', (s.end + resultLength))
                  }
                  snippets[index].positions.push(position)
                  skip = true
                  return
                }
                // If the calculated start is within an existing snippet
                if (start >= s.start && start <= s.end) {
                  // extend the length of the snippet only to the resultStart
                  if (resultStart >= s.end) {
                    snippets[index].end = this.doc.body.indexOf(' ', (resultStart + resultLength))
                  }
                  snippets[index].positions.push(position)
                  skip = true
                  return
                }
                // If the calculated end if within an existing snippet
                if (end >= s.start && end <= s.end) {
                  // extend the start of teh snippet only to the resultStart
                  if (resultStart <= s.start) {
                    snippets[index].start = resultStart
                  }
                  snippets[index].positions.push(position)
                  skip = true
                }
              })
              if (!skip) {
                const snippet = { start, end, positions: [position] }
                snippets.push(snippet)
              }
            }
          }
        })
      })
      return snippets
    },
    subType () {
      return this.subTypeNames[this.doc.subType] || this.doc.subType
    },
    levelContext () {
      if (this.doc.subType === 'class_features') {
        const level = this.doc.qualifiers[this.doc.qualifiers.length - 1].replace(/\D/g, '')
        return { level }
      }
      return { level: 'test' }
    }
  },
  methods: {
    show () {
      if (this.doc.link) {
        this.$router.push({
          path: this.doc.link
        })
      } else {
        this.showFull = !this.showFull
      }
    }
  }
}
</script>

<style lang="scss">

  .search-result {

    p {
      margin-bottom: .5em;
    }
    a {
      text-decoration: none;
      &:hover, &:focus  {
        text-decoration: underline;
      }
    }

  }
</style>
