<template>
  <div v-if="!$fetchState.pending">
    <!-- TITLE -->
    <me-npc-title v-if="title" :item="stats" />
    <v-row>
      <v-col cols="12" :md="stats.image ? 8 : 12">
        <!-- BASE STATS -->
        <me-hr />
        <me-stat-list>
          <me-stat-list-item :label="$t('ac_title')">
            {{ stats.ac }}
          </me-stat-list-item>
          <me-stat-list-item :label="$t('hit_points_title')">
            {{ hitPoints }}
          </me-stat-list-item>
          <me-stat-list-item v-if="stats.shields" :label="$t('shields_title')">
            {{ shields }}
          </me-stat-list-item>
          <me-stat-list-item v-if="stats.speed" :label="$t('speed_title')">
            <me-html :content="speeds" inline />
          </me-stat-list-item>
        </me-stat-list>

        <!-- ABILITIES -->
        <me-hr />
        <v-row>
          <v-col
            v-for="(score, ability) in stats.abilityScores"
            :key="ability"
            cols="6"
            sm="2"
            class="text-center"
          >
            <div class="text-button">
              {{ $t(`abilities.${ability}.abbr`) }}
            </div>
            <div class="text-body-2">
              {{ score }} ({{ abilityBonus(score) }})
            </div>
          </v-col>
        </v-row>

        <!-- SKILLS -->
        <me-hr />
        <me-stat-list>
          <me-stat-list-item v-if="stats.savingThrows" :label="$t('saving_throws_title')">
            {{ savingThrows }}
          </me-stat-list-item>
          <me-stat-list-item v-if="stats.skills" :label="$t('skills_title')">
            {{ skills }}
          </me-stat-list-item>
          <me-stat-list-item v-if="hasIrv('vul')" :label="$t('npc.damage_vulnerabilities')">
            {{ damageList(stats.irv.vul) }}
          </me-stat-list-item>
          <me-stat-list-item v-if="hasIrv('res')" :label="$t('npc.damage_resistances')">
            {{ damageList(stats.irv.res) }}
          </me-stat-list-item>
          <me-stat-list-item v-if="hasIrv('damImm')" :label="$t('npc.damage_immunities')">
            {{ damageList(stats.irv.damImm) }}
          </me-stat-list-item>
          <me-stat-list-item v-if="hasIrv('conImm')" :label="$t('npc.condition_immunities')">
            {{ conditionImmunities }}
          </me-stat-list-item>
          <me-stat-list-item :label="$t('senses_title')">
            <me-html :content="senses" inline />
          </me-stat-list-item>
          <me-stat-list-item :label="$t('cr_title')">
            {{ crXp }}
          </me-stat-list-item>
        </me-stat-list>

        <!-- FEATURES -->
        <me-hr />
        <div v-if="stats.entries.features">
          <div v-for="feature in stats.entries.features" :key="feature.id">
            <me-npc-feature :feature="feature" />
            <me-npc-powercasting-list v-if="feature.id === 'powercasting'" :feature="feature" />
            <me-npc-powercasting-list v-if="feature.id === 'innate-powercasting'" :feature="feature" innate />
            <me-npc-grenade-list v-if="feature.id === 'grenades'" :feature="feature" />
          </div>
        </div>

        <!-- ACTIONS -->
        <div v-if="stats.entries.actions">
          <me-npc-set-title>
            {{ $t('npc.actions_title') }}
          </me-npc-set-title>
          <div v-for="action in sortedActions" :key="action.id">
            <me-npc-weapon-attack
              v-if="action.ref && action.ref === 'weapon'"
              :feature="action"
              :ability-scores="stats.abilityScores"
              :prof-bonus="stats.profBonus"
            />
            <me-npc-attack
              v-else-if="action.attack"
              :feature="action"
              :ability-scores="stats.abilityScores"
              :prof-bonus="stats.profBonus"
            />
            <me-npc-feature v-else :feature="action" />
          </div>
        </div>

        <!-- LEGENDARY ACTIONS -->
        <div v-if="stats.entries.legendary">
          <me-npc-set-title>
            {{ $t('npc.legendary_title') }}
          </me-npc-set-title>
          <p class="body-2">
            {{ stats.entries.legendary.text }}
          </p>
          <p v-for="lgAction in sortedLegendaryActions" :key="`legendary-${lgAction.id}`">
            <me-npc-feature :feature="lgAction" />
          </p>
        </div>

        <!-- REACTIONS -->
        <div v-if="stats.entries.reactions">
          <me-npc-set-title>
            {{ $t('npc.reactions_title') }}
          </me-npc-set-title>
          <p v-for="reaction in stats.entries.reactions" :key="reaction.id">
            <me-npc-feature :feature="reaction" />
          </p>
        </div>
      </v-col>
      <v-col v-if="stats.image" cols="12" md="4">
        <v-img
          :src="stats.image"
          :max-height="$vuetify.breakpoint.smAndDown ? 150 : null"
          :contain="$vuetify.breakpoint.smAndDown"
        />
      </v-col>
    </v-row>
    <v-card v-if="hasNotes" class="ma-3">
      <v-card-text>
        <me-html :content="stats.html" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { NpcHelpers } from '~/mixins/NpcHelpers'

export default {
  mixins: [
    NpcHelpers
  ],
  props: {
    stats: {
      type: Object,
      default: () => { return {} }
    },
    title: {
      type: [String, Boolean],
      default: false
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_LOTS', ['skills', 'conditions'])
  },
  computed: {
    lcName () {
      return this.stats.name.toLowerCase()
    },
    sortedActions () {
      if (this.stats.entries.actions) {
        return [...this.stats.entries.actions.filter(i => i.id === 'multiattack'), ...this.stats.entries.actions.filter(i => i.id !== 'multiattack')]
      }
      return []
    },
    sortedLegendaryActions () {
      if (this.stats.entries.legendary) {
        return [...this.stats.entries.legendary.actions].sort((a, b) => {
          return a.cost === b.cost
            ? a.name > b.name ? 1 : -1
            : a.cost > b.cost ? 1 : -1
        })
      }
      return []
    },
    hasNotes () {
      return this.stats.html && !['', null].includes(this.stats.html)
    }
  }
}
</script>
