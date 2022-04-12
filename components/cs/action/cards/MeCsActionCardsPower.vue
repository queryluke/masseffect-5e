<template>
  <v-card outlined class="pa-1 px-md-1">
    <v-row no-gutters>
      <v-col cols="12" sm="9">
        <v-row no-gutters align="baseline">
          <v-col cols="5">
            <v-row no-gutters>
              <!-- CAST BUTTON -->
              <v-col v-if="$vuetify.breakpoint.smAndUp && item.level > 0" cols="4" align-self="center" class="pl-1">
                <v-badge
                  bordered
                  color="primary"
                  offset-y="5"
                  offset-x="5"
                  dot
                  :value="item.upcast"
                >
                  <v-btn
                    x-small
                    depressed
                    color="secondary"
                    :disabled="!castable"
                    @click.stop="castPower"
                  >
                    <small>cast</small>
                  </v-btn>
                </v-badge>
              </v-col>

              <!-- TITLE & PROPERTIES -->
              <v-col cols="8">
                <div class="d-flex align-center">
                  <v-card flat color="transparent">
                    <div class="mb-n1 text-body-1">
                      <small class="text-truncate font-weight-bold" :class="{'primary--text': item.upcast }">
                        {{ item.name }}
                      </small>
                    </div>
                    <div class="text-caption font-weight-light d-flex align-center">
                      <v-avatar size="16" class="pr-1">
                        <v-img :src="require(`~/assets/images/powers/${item.type}.svg`)" />
                      </v-avatar>
                      <small class="text-capitalize">
                        {{ properties }}
                      </small>
                    </div>
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </v-col>

          <!-- CASTING TIME -->
          <v-col class="text-center" cols="1">
            <me-cs-action-casting-time :casting-time="item.castingTime" :alt-casting="item.altCasting" />
          </v-col>

          <!-- RANGE -->
          <v-col cols="2" class="text-center">
            <me-cs-action-range :range="range" />
          </v-col>

          <!-- HIT/DC -->
          <v-col cols="1">
            <me-cs-action-stat v-if="hit">
              <me-cs-roll-card :roll="hitRoll" min-width="36">
                <div class="my-1">
                  {{ modText(hit.bonus) }}
                </div>
              </me-cs-roll-card>
            </me-cs-action-stat>
            <me-cs-action-stat v-else>
              {{ dc.target }}
              <template #subtitle>
                <span class="text-uppercase">
                  {{ dc.save }}
                </span>
              </template>
            </me-cs-action-stat>
          </v-col>

          <!-- DAMAGE -->
          <v-col cols="3">
            <div v-if="damages.length">
              <me-cs-action-stat>
                <me-cs-action-damage :damage="damages[0]" />
              </me-cs-action-stat>
            </div>
            <me-cs-action-stat v-else>
              <span class="text-caption text-capitalize">
                {{ (item.effect || []).join(', ') }}
              </span>
            </me-cs-action-stat>
          </v-col>
        </v-row>
        <!-- resource -->
        <v-row v-if="item.resource" no-gutters>
          <v-col cols="9">
            <me-cs-action-resource :id="item.resource.id" :resource="item.resource" />
          </v-col>
          <v-col cols="3">
            <div v-if="damages.length > 1">
              <me-cs-action-stat>
                <me-cs-action-damage :damage="damages[1]" />
              </me-cs-action-stat>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <!-- NOTES -->
      <v-col v-if="$vuetify.breakpoint.smAndUp" cols="3" align-self="center">
        <me-cs-action-notes-list :notes="notesList" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { CsActions } from '~/mixins/character/csActions'
const { mapGetters } = createNamespacedHelpers('character/powers')

export default {
  name: 'MeCsActionCardsPower',
  mixins: [CsActions],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['klassPowercastingMaxes', 'techPoints', 'powerSlots']),
    properties () {
      const level = this.item.level === 0 ? 'Cantrip' : this.$t(`ordinal_numbers[${this.item.level}]`)
      return [level, this.item.source].join(' ∙ ')
    },
    notesList () {
      const notes = this.notes.slice()
      if (this.item.duration?.length) {
        notes.unshift({
          type: 'duration',
          duration: this.item.duration,
          concentration: this.item.concentration || false
        })
      }
      if (this.item.primes) {
        notes.unshift({
          type: 'tooltip',
          tooltipText: `Primes (${this.item.primes})`,
          text: `P: ${this.item.primes}`
        })
      }
      if (this.item.detonates) {
        notes.unshift({
          type: 'icon',
          text: 'Detonates',
          icon: 'mdi-alert-octagram',
          color: 'red darken-4'
        })
      }
      if (this.item.advancement) {
        notes.unshift({
          type: 'tooltip',
          text: `Adv: ${this.item.advancement.name}`,
          tooltipText: this.item.advancement.text,
          isHtml: true
        })
      }
      return notes
    },
    powercastingType () {
      return this.klassPowercastingMaxes[this.item.source]?.powercastingType || this.item.resource?.id
    },
    powerSlotAtLevel () {
      return this.powerSlots[this.item.level]
    },
    castable () {
      if (!this.powercastingType) {
        return false
      }
      switch (this.powercastingType) {
        case 'slots':
          return this.powerSlotAtLevel.used < this.powerSlotAtLevel.max
        case 'points':
          return this.techPoints.used + this.item.level <= this.techPoints.max
        default:
          return false
      }
    }
  },
  methods: {
    castPower () {
      if (!this.powercastingType) {
        return
      }
      let value = 0
      switch (this.powercastingType) {
        case 'slots':
          value = this.powerSlotAtLevel.used + 1
          this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `currentStats.psUsed.${this.item.level - 1}`, value })
          break
        case 'points':
          value = this.techPoints.used + this.item.level
          this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'currentStats.tpUsed', value })
          break
        default:
          break
      }
    }
  }
}
</script>
