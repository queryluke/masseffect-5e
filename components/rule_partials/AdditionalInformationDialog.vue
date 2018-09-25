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
            rule-text(v-if="item" v-bind:component="item.vue")
</template>

<script>
  import RuleText from '~/components/RuleText.vue'
  import AbilityScoreModifiers from './AbilityScoreModifiers.vue'
  import AbilityScorePointCost from './AbilityScorePointCost.vue'
  import AbilityScoreSummary from './AbilityScoreSummary.vue'
  import CharacterAdvancementTable from './CharacterAdvancementTable.vue'
  import MulticlassingBarrierTable from './MulticlassingBarrierTable.vue'
  import MulticlassingBioticsTable from './MulticlassingBioticsTable.vue'
  import MulticlassingPrereqsTable from './MulticlassingPrereqsTable.vue'
  import MulticlassingProfsTable from './MulticlassingProfsTable.vue'
  import MulticlassingTechTable from './MulticlassingTechTable.vue'

  export default {
    components: {
      AbilityScoreModifiers,
      AbilityScorePointCost,
      AbilityScoreSummary,
      CharacterAdvancementTable,
      MulticlassingBarrierTable,
      MulticlassingBioticsTable,
      MulticlassingPrereqsTable,
      MulticlassingProfsTable,
      MulticlassingTechTable,
      RuleText
    },
    computed: {
      item () {
        if (this.otherRule) {
          return require(`~/static/data/rules/${this.otherRule}.md`)
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
      otherRule: String
    }
  }
</script>

