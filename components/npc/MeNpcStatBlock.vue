<template>
  <div>
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
            <me-html :content="speeds" />
          </me-stat-list-item>
        </me-stat-list>

        <!-- ABILITIES -->
        <me-hr />
        <v-row>
          <v-col
            v-for="(score, ability) in stats.abilityScores"
            :key="ability"
            cols="6"
            sm="4"
            md="2"
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
          <me-stat-list-item v-if="hasIrv('vul')" :label="$t('damage_vulnerabilities')">
            {{ damageList(stats.irv.vul) }}
          </me-stat-list-item>
          <me-stat-list-item v-if="hasIrv('res')" :label="$t('damage_resistances')">
            {{ damageList(stats.irv.res) }}
          </me-stat-list-item>
          <me-stat-list-item v-if="hasIrv('damImm')" :label="$t('damage_immunities')">
            {{ damageList(stats.irv.damImm) }}
          </me-stat-list-item>
          <me-stat-list-item v-if="hasIrv('conImm')" :label="$('condition_immunities')">
            {{ conditionImmunities }}
          </me-stat-list-item>
          <me-stat-list-item :label="$t('senses_title')">
            {{ senses }}
          </me-stat-list-item>
          <me-stat-list-item :label="$t('cr_title')">
            {{ crXp }}
          </me-stat-list-item>
        </me-stat-list>

        <!-- FEATURES -->
        <me-hr />
        <div v-if="stats.entries.features">
          <p v-for="(feature, key) in stats.entries.features" :key="key">
            <me-npc-feature :feature="feature" />
            <me-npc-powercasting-list v-if="key === 'powercasting'" :feature="feature" />
            <me-npc-powercasting-list v-if="key === 'innate-powercasting'" :feature="feature" innate />
            <me-npc-grenade-list v-if="key === 'grenades'" :feature="feature" />
          </p>
        </div>

        <!-- ACTIONS -->
        <div v-if="stats.entries.actions">
          <me-npc-set-title>
            {{ $t('npc.actions_title') }}
          </me-npc-set-title>
          <div v-for="(action, key) in stats.entries.actions" :key="key">
            <me-npc-weapon-attack
              v-if="action.ref && action.ref === 'weapon'"
              :id="action.ref"
              :proficient="action.proficient"
              :ability-scores="stats.abilities"
            />
            <me-npc-attack
              v-else
              :attack="action"
              :ability-scores="stats.abilityScores"
              :prof-bonus="stats.profBonus"
            />
            <me-npc-feature v-else :feature="action" />
          </div>
        </div>
        <!-- LEGENDARY ACTIONS -->
        <div v-if="hasFeature('legendaryActions')">
          <me-npc-set-title>
            Legendary Actions
          </me-npc-set-title>
          <p class="body-2">
            The {{ lcName }} can take 3 legendary actions, choosing from the options below. Only one legendary action can
            be used at a time and only at the end of another creature's turn. The {{ lcName }} regains spent legendary
            actions at the start of its turn.
          </p>
          <p v-for="feature in stats.legendaryActions" :key="feature.name">
            <me-npc-feature :feature="legendaryFeature(feature)" />
          </p>
        </div>
        <!-- LAIR -->
        <div v-if="hasFeature('lairActions')" class="text-body-2">
          <me-npc-set-title>
            Lair Actions
          </me-npc-set-title>
          <p>
            On initiative count 20 (losing initiative ties), the {{ lcName }} takes a lair action to cause one of the
            following effects; it can't use the same effect two rounds in a row:
          </p>
          <ul>
            <li v-for="(action, index) in stats.lairActions" :key="index">
              {{ action.description }}
            </li>
          </ul>
        </div>
        <!-- REACTIONS -->
        <div v-if="hasFeature('reactions')">
          <me-npc-set-title>
            Reactions
          </me-npc-set-title>
          <p v-for="feature in stats.reactions" :key="feature.id">
            <me-npc-feature :feature="feature" />
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
  computed: {
    lcName () {
      return this.stats.name.toLowerCase()
    },
    legendaryActions () {
      if (this.stats.legendaryActions) {
        const actions = this.stats.legendaryActions
        return actions.sort((a, b) => {
          return a.cost === b.cost
            ? a.name > b.name ? 1 : -1
            : a.cost > b.cost ? 1 : -1
        })
      }
      return []
    },
    regen () {
      if (this.stats.sp && this.stats.sp.regen) {
        const regen = parseInt(this.stats.sp.regen, 10)
        if (regen > 0) {
          return regen
        }
      }
      return 0
    }
  },
  methods: {
    hasFeature (feature) {
      return this.stats[feature] && this.stats[feature].length > 0
    },
    legendaryFeature (feature) {
      return {
        name: feature.name,
        recharge: feature.cost > 1 ? `Costs ${feature.cost} ${this.$options.filters.pluralize(feature.cost, 'Action')}` : false,
        description: feature.description
      }
    }
  }
}
</script>
