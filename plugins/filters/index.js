import Vue from 'vue'

import abilityBonus from './abilityBonus'
import article from './article'
import featureTitle from './featureTitle'
import npcDamage from './npcDamage'
import npcDc from './npcDc'
import npcName from './npcName'
import npcSavingThrows from './npcSavingThrows'
import ordinal from './ordinal'

const customFilters = {
  abilityBonus,
  article,
  featureTitle,
  npcDamage,
  npcDc,
  npcName,
  npcSavingThrows,
  ordinal
}

const Filters = {
  install (Vue) {
    for (const filter in customFilters) {
      if (Object.prototype.hasOwnProperty.call(customFilters, filter)) {
        Vue.filter(filter, customFilters[filter])
      }
    }
  }
}

Vue.use(Filters)
