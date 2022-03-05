<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-list dense class="pb-0">
        <v-list-item v-for="passive in passiveScores" :key="passive.skill" class="mt-n2">
          <v-list-item-avatar size="17" tile>
            {{ passive.score }}
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ passive.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col cols="12" class="pb-4">
      <div class="d-flex justify-space-around flex-wrap">
        <template v-for="(sense, index) in senses">
          <v-btn
            v-if="sense.distance"
            :key="`sense-${index}`"
            text
            x-small
            plain
            class="px-0"
            @click="showSense(sense)"
          >
            {{ sense.title }} <me-distance :length="sense.distance" abbr class="ml-1" />
          </v-btn>
        </template>
      </div>
    </v-col>
    <me-standard-dialog :title="selectedSense.title" :content="selectedSense.html" :shown="senseDialog" @close="senseDialog = false" />
  </v-row>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  data () {
    return {
      senseDialog: false,
      selectedSense: {
        title: '',
        html: ''
      },
      sensesList: [
        {
          id: 'darkvision',
          title: this.$t('senses.darkvision_title'),
          html: (distance) => {
            return `
              You can see in dim light within <me-distance :length="${distance}" /> of you as if it were bright
              light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.
            `
          }
        },
        {
          id: 'tremorsense',
          title: this.$t('senses.tremorsense_title'),
          html: (distance) => {
            return `
              You can detect and pinpoint creatures and the origin of vibrations within within <me-distance :length="${distance}" />,
              provided that the creature and the source of the vibrations are in contact with the same ground or
              substance.
            `
          }
        },
        {
          id: 'blindsight',
          title: this.$t('senses.blindsight_title'),
          html: (distance) => {
            return `You can perceive your surroundings without relying on sight within <me-distance :length="${distance}" />.`
          }
        },
        {
          id: 'infrared-vision',
          title: this.$t('senses.infrared_vision_title'),
          html: (distance) => {
            return `
              Your sight becomes a gradient map of the heat produced by your surroundings (hotter
              objects appear brighter and cooler objects appear darker; you cannot discern color). You can see creatures and objects
              in darkness as well as creatures and objects hidden by technological means within <me-distance :length="${distance}" />,
              as long those elements are few degrees cooler or warmer than its surroundings.
            `
          }
        },
        {
          id: 'truesight',
          title: this.$t('senses.truesight_title'),
          html: (distance) => {
            return `
              Within <me-distance :length="${distance}" /> you can see in normal darkness see invisible creatures and objects that
              are hidden by technological means.
            `
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters({ skills: 'skills/skills', character: 'character', mechanics: 'mechanics/mechanics' }),
    passiveScores () {
      return [
        { skill: 'perception', title: 'Passive Perception (Wisdom)' },
        { skill: 'investigation', title: 'Passive Investigation (Intelligence)' },
        { skill: 'insight', title: 'Passive Insight (Wisdom)' }
      ].map((i) => {
        return {
          ...i,
          score: this.skills[i.skill].passive
        }
      })
    },
    senses () {
      const senses = []
      const mechanics = this.mechanics.filter(i => i.type === 'sense')
      for (const sense of this.sensesList) {
        const senseDistances = mechanics.filter(i => i.sense === sense.id).map(i => i.distance)
        const highest = Math.max(0, this.character.settings.senses[sense.id], ...senseDistances)
        senses.push({ ...sense, distance: highest, html: sense.html(highest) })
      }
      return senses
    }
  },
  methods: {
    showSense (sense) {
      this.senseDialog = true
      this.selectedSense = sense
    },
    closeSense () {
      this.senseDialog = false
      this.selectedSense = { title: '', html: '' }
    }
  }
}
</script>
