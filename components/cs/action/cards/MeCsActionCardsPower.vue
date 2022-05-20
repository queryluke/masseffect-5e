<template>
  <v-card outlined class="pa-1 px-md-1" min-height="64" @click="showPower">
    <v-row no-gutters align="baseline">
      <v-col cols="4">
        <v-row no-gutters align="center">
          <!-- CAST BUTTON -->
          <v-col v-if="$vuetify.breakpoint.smAndUp" cols="4" class="pl-1">
            <me-cs-powers-cast-btn :item="item" small />
          </v-col>

          <!-- TITLE & PROPERTIES -->
          <v-col cols="12" sm="8">
            <div class="d-flex">
              <v-card flat color="transparent">
                <div class="mb-n1 text-body-1">
                  <small class="text-truncate font-weight-bold" :class="{'primary--text': item.upcast }">
                    {{ item.name }}
                  </small>
                  <v-icon v-if="item.concentration" size="12" style="position: absolute; top: 2px;">
                    mdi-alpha-c-circle
                  </v-icon>
                </div>
                <div class="text-caption font-weight-light d-flex align-center">
                  <v-avatar v-if="$vuetify.breakpoint.smAndUp" size="16" class="pr-1">
                    <v-img :src="require(`~/assets/images/powers/${item.type}.svg`)" />
                  </v-avatar>
                  <small class="text-capitalize text-truncate">
                    {{ properties }}
                  </small>
                </div>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <!-- CASTING TIME -->
      <v-col cols="1" class="text-center">
        <me-cs-action-casting-time :casting-time="item.castingTime" :alt-casting="item.altCasting" />
      </v-col>

      <!-- RANGE -->
      <v-col cols="2" sm="1" class="text-center">
        <me-cs-action-range :range="range" />
      </v-col>

      <!-- HIT/DC -->
      <v-col cols="2" sm="1" class="pt-2">
        <me-cs-action-stat v-if="hit">
          <me-cs-roll-card :roll="hitRoll" min-width="36">
            <div class="my-1">
              {{ modText(hit.bonus) }}
            </div>
          </me-cs-roll-card>
        </me-cs-action-stat>
        <me-cs-action-stat v-if="!hit && dc">
          {{ dc.target }}
          <template #subtitle>
            <span class="text-uppercase">
              {{ dc.save }}
            </span>
          </template>
        </me-cs-action-stat>
        <me-cs-action-stat v-if="!dc && !hit">
          --
        </me-cs-action-stat>
      </v-col>

      <!-- Damages -->
      <v-col cols="3" sm="2">
        <div v-if="damages.length">
          <div v-for="(damage, index) in damages" :key="`damage-${index}`" style="min-height: 30px">
            <me-cs-action-stat>
              <me-cs-action-damage :damage="damage" />
            </me-cs-action-stat>
          </div>
        </div>
        <me-cs-action-stat v-else>
          <span class="text-caption text-capitalize">
            {{ (item.conditions || item.effect || []).join(', ') }}
          </span>
        </me-cs-action-stat>
      </v-col>

      <!-- NOTES -->
      <v-col v-if="$vuetify.breakpoint.smAndUp" cols="3" align-self="start" class="pt-1">
        <me-cs-action-notes-list :notes="notesList" />
      </v-col>
    </v-row>
    <v-card v-if="item.resource" style="position: absolute; bottom: -9px" outlined @click.stop>
      <me-cs-action-resource :id="item.resource.id" :resource="item.resource" />
    </v-card>
  </v-card>
</template>

<script>
import { CsActions } from '~/mixins/character/csActions'

export default {
  name: 'MeCsActionCardsPower',
  mixins: [CsActions],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showInfo: false
    }
  },
  computed: {
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
      if (this.item.advancement) {
        notes.unshift({
          type: 'tooltip',
          text: `Adv: ${this.item.advancement.name}`,
          tooltipText: this.item.advancement.text,
          isHtml: true
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
      return notes
    }
  },
  methods: {
    showPower () {
      this.$store.commit('character/navigation/SET', { key: 'toDisplay', value: { id: this.item.id, source: this.item.source, level: this.item.level } })
      this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', 'me-cs-powers-side-nav')
    }
  }
}
</script>
