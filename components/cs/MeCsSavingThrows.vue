<template>
  <div>
    <v-row no-gutters>
      <template v-for="(item, index) of items">
        <v-col :key="`st-${index}`" cols="6">
          <v-list>
            <div v-for="abilityItem in item" :key="abilityItem.ability" class="d-flex justify-space-between mx-3">
              <div class="d-flex align-center">
                <v-avatar :color="abilityItem.proficient ? 'primary' : 'transparent'" size="12" />
                <div class="text-body-2 pl-2">
                  {{ $t(`abilities.${abilityItem.ability}.abbr`) }}
                </div>
              </div>
              <div class="text-h6 d-flex align-center">
                <me-cs-ad-icons type="saving-throw" :value="abilityItem.ability" />
                <div class="pl-1 mb-1 text-center">
                  <me-cs-roll-card :roll="{ notation: `1d20${rollText(abilityItem.score)}`, detail: $t(`abilities.${abilityItem.ability}.abbr`), type: 'save' }">
                    <div class="py-1">
                      {{ abilityItem.score }}
                    </div>
                  </me-cs-roll-card>
                </div>
              </div>
            </div>
          </v-list>
        </v-col>
      </template>
    </v-row>
    <div v-if="hasAdditional" class="mx-3 mb-2">
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
    ...mapGetters({ mechanics: 'mechanics/mechanics', abilityBreakdown: 'abilities/abilityBreakdown', profBonus: 'profBonus', valueLookup: 'selections/valueLookup', mcBonus: 'mechanics/mcBonus', profs: 'profs/profs' }),
    savingThrowMechanics () {
      return this.mechanics.filter(i => i.type === 'saving-throw').map((i) => {
        if (i.valueLookup) {
          return {
            ...i,
            value: this.valueLookup(i.valueLookup)
          }
        }
        return i
      })
    },
    items () {
      const items = []
      const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha']
      for (const ability of abilities) {
        let proficient = this.savingThrowMechanics.find(i => i.value?.includes(ability) && !i.effect)
        if (!proficient) {
          proficient = this.profs.savingThrow.includes(ability)
        }
        const bonuses = this.savingThrowMechanics.filter(i => i.value?.includes(ability) && i.effect?.type === 'bonus')
        const bonus = bonuses.reduce((a, c) => a + this.mcBonus(c.effect.bonus), 0)
        let score = this.abilityBreakdown[ability].mod
        if (proficient) {
          score += this.profBonus
        }
        if (bonus) {
          score += bonus
        }
        items.push({
          ability,
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
      const bag = this.savingThrowMechanics.filter(i => i.effect?.type === type && !i.ability && i.against?.length)
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
