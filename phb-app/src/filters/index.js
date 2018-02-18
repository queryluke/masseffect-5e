import abilityBonus from './abilityBonus';
import article from './article';
import dc from './dc';
import featureTitle from './featureTitle';
import npcDamage from './npcDamage';
import npcName from './npcName';
import ordinal from './ordinal';

const customFilters = {
  abilityBonus,
  article,
  dc,
  featureTitle,
  npcDamage,
  npcName,
  ordinal
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
