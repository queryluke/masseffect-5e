<template lang="pug">
  span
    v-btn(color="primary" dark @click.stop="showAddInfoDialog = true") {{ title }}
    v-dialog(v-model="showAddInfoDialog" v-bind:fullscreen="this.$vuetify.breakpoint.xsOnly" transition="dialog-bottom-transition" width="70vw" scrollable hide-overlay)
      v-card(tile)
        v-toolbar(card dark color="primary")
          v-btn(icon dark @click.native="showAddInfoDialog = false")
            v-icon close
          v-toolbar-title {{ title }}
        v-card-text
          v-container(grid-list-lg fluid)
            component(v-if="component" v-bind:is="component")
            markdown-file(v-if="item" v-bind:itemType="item[0]" v-bind:id="item[1]")
</template>

<script>
  import MarkdownContent from '~/components/MarkdownContent.vue'
  import AbilityScoreModifiers from './AbilityScoreModifiers.vue'
  import AbilityScorePointCost from './AbilityScorePointCost.vue'
  import AbilityScoreSummary from './AbilityScoreSummary.vue'
  import ArmorAc from './ArmorAc.vue'
  import ArmorBonusesLimitations from './ArmorBonusesLimitations.vue'
  import ArmorPieceWeights from './ArmorPieceWeights.vue'
  import CharacterAdvancementTable from './CharacterAdvancementTable.vue'
  import CustomizableArmorCosts from './CustomizableArmorCosts.vue'
  import DamageTypes from './DamageTypes.vue'
  import GrenadeList from '~/components/grenade/GrenadeList.vue'
  import LifestyleExpenses from './LifestyleExpenses.vue'
  import MediGelTypes from './MediGelTypes.vue'
  import MulticlassingBarrierTable from './MulticlassingBarrierTable.vue'
  import MulticlassingBioticsTable from './MulticlassingBioticsTable.vue'
  import MulticlassingPrereqsTable from './MulticlassingPrereqsTable.vue'
  import MulticlassingProfsTable from './MulticlassingProfsTable.vue'
  import MulticlassingTechTable from './MulticlassingTechTable.vue'
  import OmniGelYield from './OmniGelYield.vue'
  import ShipUpgrades from './ShipUpgrades.vue'
  import SizeCategory from './SizeCategory.vue'
  import TypicalDifficultyClassesTable from './TypicalDifficultyClassesTable.vue'
  import TravelPace from './TravelPace.vue'
  import WeaponProperties from './WeaponProperties.vue'
  import WithoutMaintenance from './WithoutMaintenance.vue'
  import DisgruntledCrew from './DisgruntledCrew.vue'
  import GalaxyMap from './GalaxyMap.vue'

  export default {
    components: {
      AbilityScoreModifiers,
      AbilityScorePointCost,
      AbilityScoreSummary,
      ArmorAc,
      ArmorBonusesLimitations,
      ArmorPieceWeights,
      CharacterAdvancementTable,
      CustomizableArmorCosts,
      DamageTypes,
      GrenadeList,
      LifestyleExpenses,
      MediGelTypes,
      MulticlassingBarrierTable,
      MulticlassingBioticsTable,
      MulticlassingPrereqsTable,
      MulticlassingProfsTable,
      MulticlassingTechTable,
      OmniGelYield,
      ShipUpgrades,
      SizeCategory,
      TypicalDifficultyClassesTable,
      TravelPace,
      WeaponProperties,
      WithoutMaintenance,
      DisgruntledCrew,
      GalaxyMap,
      MarkdownContent
    },
    computed: {
      item () {
        if (this.mdFile) {
          return this.mdFile.split('/')
        }
      }
    },
    data () {
      return {
        showAddInfoDialog: false
      }
    },
    props: {
      title: String,
      component: String,
      mdFile: String
    }
  }
</script>

