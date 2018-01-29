import abilityBonus from './abilityBonus';
import article from './article';
import ordinal from './ordinal';

const customFilters = {
  ordinal,
  abilityBonus,
  article
};

export const Filters = {
  install(Vue) {
    for (const filter in customFilters) {
      if (Object.prototype.hasOwnProperty.call(customFilters, filter)) {
        Vue.filter(filter, customFilters[filter]);
      }
    }
  }
};
