<template>
  <v-card outlined class="pa-1 px-md-1">
    <v-row align="baseline" no-gutters>
      <v-col v-if="$vuetify.breakpoint.smAndUp" cols="1" align-self="center">
        <v-badge
          bordered
          color="primary"
          offset-y="5"
          offset-x="5"
          dot
          :value="item.upcast"
        >
          <v-btn x-small depressed color="secondary">
            <small>cast</small>
          </v-btn>
        </v-badge>
      </v-col>
      <v-col cols="5" sm="3">
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
      <v-col class="text-center" cols="1">
        <me-cs-action-casting-time :casting-time="item.castingTime" :alt-casting="item.altCasting" />
      </v-col>
      <v-col :cols="$vuetify.breakpoint.smAndUp ? 1 : 2" class="text-center">
        <me-cs-action-range :range="range" />
      </v-col>
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
      <v-col cols="3" sm="2">
        <div v-if="damages.length" class="d-flex flex-column">
          <template v-for="(damage, index) in damages">
            <me-cs-action-stat :key="`damage-${index}`">
              <me-cs-action-damage :damage="damage" />
            </me-cs-action-stat>
          </template>
        </div>
        <me-cs-action-stat v-else>
          <span class="text-caption text-capitalize">
            {{ (item.effect || []).join(', ') }}
          </span>
        </me-cs-action-stat>
      </v-col>
      <v-col v-if="$vuetify.breakpoint.smAndUp" cols="3">
        <me-cs-action-notes-list :notes="notesList" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <slot name="resource" />
      </v-col>
    </v-row>
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
  computed: {
    properties () {
      return [this.$t(`ordinal_numbers[${this.item.level}]`), this.item.source].join(' ∙ ')
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
      return notes
    }
  }
}
</script>
