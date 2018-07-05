<template lang="pug">
  div
    div.pb-0
      p.red--text.text--darken-4.headline.small-caps.mb-0 #[strong {{ stats.name }}]
      p #[em {{ stats.size }} {{ stats.type }}, {{ stats.alignment }}]
    div(style="position:relative;").pt-0
      div.hr
      ul.list-unstyled
        li #[strong Armor Class] {{ stats.ac }}
        li #[strong Hit Points] {{ renderPoints(stats.hp) }}
        li(v-if="stats.sp") #[strong Shield Points] {{ stats.sp.shields }} ({{ stats.sp.regen }} regen)
        li(v-if="stats.barrier") #[strong Barrier] {{ stats.barrier }} {{ stats.barrier | pluralize('tick') }}
        li #[strong Speed] {{ stats.speed }}
      div.hr
      v-container.py-0
        v-layout
          v-flex(xs2 v-for="(score, ability) in stats.abilityScores" v-bind:key="ability").text-xs-center
            p.ma-0 #[strong {{ ability.toUpperCase() }}]
            p.ma-0 {{ score }} ({{ score | abilityBonus }})
      div.hr
      ul.list-unstyled
        li(v-if="hasFeature('savingThrows')") #[strong Saving Throws] {{ stats | npcSavingThrows }}
        li(v-if="skills") #[strong Skills] {{ skills }}
        li(v-if="hasFeature('damageVulnerabilities')") #[strong Damage Vulnerabilities] {{ stats.damageVulnerabilities.join(', ') }}
        li(v-if="hasFeature('damageResistances')") #[strong Damage Resistances] {{ stats.damageResistances.join(', ') }}
        li(v-if="hasFeature('damageImmunities')") #[strong Damage Immunities] {{ stats.damageImmunities.join(', ') }}
        li(v-if="hasFeature('conditionImmunities')") #[strong Condition Immunities] {{ stats.conditionImmunities.join(', ') }}
        li(v-if="hasFeature('senses')") #[strong Senses] {{ stats.senses.join(', ') }}
        li #[strong Challenge] {{ stats.cr }} ({{ stats.xp }} XP)
      div.hr
      p(v-for="feature in stats.features" v-bind:key="feature.id")
        npc-common-feature(:feature="feature" v-bind:npc="stats")
      npc-biotics(v-if="stats.spellcasting" v-bind:stats="stats")
      npc-tech(v-if="stats.techcasting" v-bind:stats="stats")
      p(v-if="hasFeature('actions')").title.underline-heading.small-caps Actions
      div(v-for="(action, index) in stats.actions" v-bind:key="index")
        div(v-if="action.type === 'attack'")
          npc-attack(:feature="action" v-bind:npc="stats")
        p(v-else-if="action.type === 'common'")
          npc-common-feature(:feature="action" v-bind:npc="stats")
      div(v-if="hasFeature('legendaryActions')")
        p.title.underline-heading.small-caps Legendary Actions
        p.
          The {{ stats.name | removeActionId }} can take 3 legendary actions, choosing from the options below. Only one legendary action can
          be used at a time and only at the end of another creature's turn. The {{ stats.name }} regains spent legendary
          actions at the start of his turn.
        p(v-for="la in stats.legendaryActions" v-bind:key="la.id")
          npc-common-feature(:feature="la" v-bind:npc="stats")
      div(v-if="hasFeature('reactions')")
        p.title.underline-heading.small-caps Reactions
        p(v-for="reaction in stats.reactions" v-bind:key="reaction.id")
          npc-common-feature(:feature="reaction" v-bind:npc="stats")
</template>

<script>
  import {AbilityScoreBonus} from '~/mixins/abilityScoreBonus'
  import {DieFromAverage} from '~/mixins/dieFromAverage'
  import NpcCommonFeature from '~/components/npc/NpcCommonFeature.vue'
  import NpcAttack from '~/components/npc/NpcAttack.vue'
  import NpcBiotics from '~/components/npc/NpcBiotics.vue'
  import NpcTech from '~/components/npc/NpcTech.vue'

  export default {
    components: {
      NpcAttack,
      NpcCommonFeature,
      NpcBiotics,
      NpcTech
    },
    computed: {
      skills () {
        if (this.stats.skills && this.stats.skills.length) {
          return this.stats.skills.map(skill => {
            return `${skill.name} +${skill.bonus}`
          }).join(', ')
        }
        return false
      }
    },
    methods: {
      renderPoints (pointObject) {
        if (pointObject) {
          let mod = ''
          if (pointObject.mod > 0) {
            mod = ` + ${pointObject.mod}`
          } else if (pointObject.mod < 0) {
            mod = ` - ${pointObject.mod * -1}`
          }
          return `${pointObject.average} (${pointObject.numDice}d${pointObject.die}${mod})`
        } else {
          return '0'
        }
      },
      hasFeature (feature) {
        return this.stats[feature] && this.stats[feature].length > 0
      }
    },
    mixins: [
      AbilityScoreBonus,
      DieFromAverage
    ],
    props: ['stats']
  }
</script>

