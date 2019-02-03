import Vue from 'vue'

import article from './article'
import featureTitle from './featureTitle'
import formatDate from './formatDate'
import groupDigits from './groupDigits'
import listOfChoices from './listOfChoices'
import ordinal from './ordinal'
import removeActionId from './removeActionId'
import titlecase from './titlecase'
import fidtt from './fidtt'
import weaponRange from './weaponRange'

const customFilters = {
  article,
  featureTitle,
  formatDate,
  groupDigits,
  listOfChoices,
  ordinal,
  removeActionId,
  titlecase,
  fidtt,
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
