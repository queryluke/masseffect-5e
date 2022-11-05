<template>
  <v-card v-if="item" flat tile>
    <v-card flat color="transparent">
      <div v-if="powerData.homebrew" class="text-caption pl-4 pt-1">
        <em>homebrew by {{ powerData.homebrew.createdBy }}</em>
      </div>
      <v-card-text class="d-flex justify-space-between align-center">
        <!-- CAST BTN -->
        <div>
          <me-cs-powers-cast-btn :item="item" />
        </div>

        <!-- LEVEL CHANGER -->
        <div v-if="powerLevel > 0">
          <div class="d-flex align-center">
            <v-btn
              v-if="levelOptions.length > 1"
              icon
              :disabled="powerLevel === minLevel"
              color="primary"
              @click="powerLevel--"
            >
              <v-icon>mdi-minus-box</v-icon>
            </v-btn>
            <div class="text-center" style="width: 30px">
              {{ $t(`ordinal_numbers[${powerLevel}]`) }}
            </div>
            <v-btn
              v-if="levelOptions.length > 1"
              icon
              :disabled="powerLevel === maxLevel"
              color="primary"
              @click="powerLevel++"
            >
              <v-icon>mdi-plus-box</v-icon>
            </v-btn>
          </div>
        </div>

        <!-- source changer -->
        <v-menu v-if="sources.length > 1" offset-y>
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              v-bind="attrs"
              x-small
              outlined
              :disabled="sources.length === 1"
              v-on="on"
            >
              {{ powerSource }}
              <v-icon right>
                mdi-menu-down
              </v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              v-for="sourceOption in sources"
              :key="sourceOption"
              @click="powerSource = sourceOption"
            >
              <v-list-item-title class="text-caption text-capitalize">
                {{ sourceOption }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div v-else class="text-button">
          <small>
            {{ powerSource }}
          </small>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <me-cs-action-resource v-if="item.resource" :id="item.resource.id" :resource="item.resource" />
        <v-spacer />
      </v-card-actions>
    </v-card>

    <!-- Hit/DC/Damage -->
    <div v-if="hit || damages.length || dc">
      <v-divider />
      <v-card-text class="d-flex justify-space-around text-center">
        <div v-if="hit">
          <div class="text-caption">
            To Hit
          </div>
          <me-cs-roll-card v-if="hit" :roll="hitRoll">
            <div class="my-1 text-body-1 font-weight-bold">
              {{ modText(hit.bonus) }}
            </div>
          </me-cs-roll-card>
        </div>

        <div v-if="dc">
          <div class="text-caption">
            DC
          </div>
          <me-cs-action-stat>
            <div class="text-body-1 font-weight-bold">
              {{ dc.target }}
            </div>
            <template #subtitle>
              <span class="text-uppercase">
                {{ dc.save }}
              </span>
            </template>
          </me-cs-action-stat>
        </div>

        <div v-if="damages.length">
          <div class="text-caption">
            Damage
          </div>
          <div class="d-flex justify-space-around">
            <me-cs-action-stat v-for="(damage, damageIndex) in damages" :key="`damage-${damageIndex}`" class="ma-1">
              <me-cs-action-damage :damage="damage" large />
            </me-cs-action-stat>
          </div>
        </div>
      </v-card-text>
    </div>

    <v-divider />
    <me-cs-powers-info :item="item" :html="powerData.html" :advancements="powerData.advancements" :selected-advancement="item.advancement.id" />
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { CsActions } from '~/mixins/character/csActions'
const { mapGetters } = createNamespacedHelpers('character/powers')

export default {
  name: 'MeCsPowersSideNav',
  mixins: [CsActions],
  computed: {
    ...mapGetters(['powers', 'powerList', 'powerSlots']),
    powerToDisplay () {
      return this.$store.getters['character/navigation/toDisplay']
    },
    id () {
      return this.powerToDisplay.id
    },
    powerSource: {
      get () {
        return this.powerToDisplay.source
      },
      set (value) {
        this.$store.commit('character/navigation/SET', { key: 'toDisplay', value: { id: this.id, source: value, level: this.powerLevel } })
      }
    },
    powerLevel: {
      get () {
        return this.powerToDisplay.level || this.minLevel
      },
      set (value) {
        this.$store.commit('character/navigation/SET', { key: 'toDisplay', value: { id: this.id, source: this.powerSource, level: value } })
      }
    },
    powerData () {
      return this.powerList.find(i => i.id === this.id)
    },
    matchingPowers () {
      return this.powers.filter(i => i.id === this.id)
    },
    sources () {
      return [...new Set(this.matchingPowers.map(i => i.source))]
    },
    matchingPowersFromSource () {
      return this.matchingPowers.filter(i => i.source === this.powerSource)
    },
    levelOptions () {
      return this.matchingPowersFromSource.map(i => i.level)
    },
    minLevel () {
      return Math.min(...this.levelOptions)
    },
    maxLevel () {
      return Math.max(...this.levelOptions)
    },
    item () {
      return this.matchingPowersFromSource.find(i => i.level === this.powerLevel)
    }
  }
}
</script>
