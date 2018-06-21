import Vue from 'vue'

import abilityBonus from './abilityBonus'
import article from './article'
import featureTitle from './featureTitle'
import formatDate from './formatDate'
import groupDigits from './groupDigits'
import listOfChoices from './listOfChoices'
import npcBarrier from './npcBarrier'
import npcDamage from './npcDamage'
import npcDc from './npcDc'
import npcName from './npcName'
import npcSavingThrows from './npcSavingThrows'
import ordinal from './ordinal'
import removeActionId from './removeActionId'
import weaponRange from './weaponRange'

const customFilters = {
  abilityBonus,
  article,
  featureTitle,
  formatDate,
  groupDigits,
  listOfChoices,
  npcBarrier,
  npcDamage,
  npcDc,
  npcName,
  npcSavingThrows,
  ordinal,
  removeActionId,
  weaponRange
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
