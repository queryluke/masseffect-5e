<template>
  <div>
    <me-cs-card-title>
      Saving Throws
    </me-cs-card-title>
    <v-row no-gutters>
      <template v-for="(item, index) of items">
        <v-col :key="`st-${index}`" cols="6">
          <v-list dense class="pa-0">
            <v-list-item v-for="abilityItem in item" :key="abilityItem.ability" style="min-height: 28px">
              <v-list-item-avatar :color="abilityItem.proficient ? `blue` : 'transparent'" size="12" class="my-1" />
              <v-list-item-content class="ml-n2 py-1">
                <v-list-item-title>
                  {{ $t(`abilities.${abilityItem.ability}.abbr`) }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action class="my-1">
                <v-list-item-action-text class="d-flex align-center">
                  <me-cs-ad-icon v-if="abilityItem.ad" small />
                  <me-cs-ad-icon v-if="abilityItem.dis" small type="d" />
                  <span class="pl-1">
                    {{ abilityItem.score }}
                  </span>
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </template>
    </v-row>
    <div v-if="hasAdditional" class="mr-4 ml-8 mb-2">
      <div v-for="aord of ['a','d']" :key="`stAd-${aord}`">
        <v-divider v-if="aord === 'd' && additionalBag.d" />
        <div v-for="(aordItem, index) of additionalBag[aord]" :key="`stAdItem-${index}`" class="d-flex align-center">
          <me-cs-ad-icon :type="aord" small />
          <span class="text-caption pl-1">
            {{ aordItem }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { ScoreText } from '~/mixins/character/scoreText'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  mixins: [ScoreText],
  computed: {
    // TODO: this may be better off in the store
    ...mapGetters({ mechanics: 'mechanics/mechanics', abilityBreakdown: 'abilities/abilityBreakdown', profBonus: 'profBonus' }),
    savingThrowMechanics () {
      return this.mechanics.filter(i => i.type === 'savingThrow')
    },
    items () {
      const items = []
      const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha']
      for (const ability of abilities) {
        const proficient = this.savingThrowMechanics.find(i => i.value === ability && !i.effect)
        const ad = this.savingThrowMechanics.find(i => i.value === ability && i.effect?.type === 'advantage')
        const dis = this.savingThrowMechanics.find(i => i.value === ability && i.effect?.type === 'disadvantage')
        let score = this.abilityBreakdown[ability].mod
        if (proficient) {
          score += this.profBonus
        }
        items.push({
          ability,
          ad: ad && !dis,
          dis: !ad && dis,
          proficient,
          score: this.modText(score)
        })
      }
      return [items.slice(0, 3), items.slice(3)]
    },
    hasAdditional () {
      return this.additionalBag.a || this.additionalBag.d
    },
    additionalBag () {
      const bag = {
        a: false,
        d: false
      }
      for (const type of ['advantage', 'disadvantage']) {
        const sub = []
        sub.push(this.adsOrDisesAgainstText(type))
        sub.push(...this.specialAdOrDis(type))
        const filtered = sub.filter(i => i)
        if (filtered.length > 0) {
          bag[type.slice(0, 1)] = filtered
        }
      }
      return bag
    }
  },
  methods: {
    adsOrDisesAgainst (type) {
      const bag = this.savingThrowMechanics.filter(i => i.effect === type && !i.ability && i.against?.length > 0)
      const reducedBag = bag.reduce((acc, curr) => acc.concat(curr.against), [])
      return [...new Set(reducedBag)]
    },
    adsOrDisesAgainstText (type) {
      const array = this.adsOrDisesAgainst(type)
      const length = array.length
      if (length === 0) {
        return false
      }
      return `against being ${this.$t(`lists.or_list[${length}]`, array)}`
    },
    specialAdOrDis (type) {
      return this.savingThrowMechanics.filter(i => i.effect === type && !i.ability && !i.against).map(i => i.note)
    }
  }
}
</script>
