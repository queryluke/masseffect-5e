<template>
  <div>
    <!-- TITLE -->
    <me-npc-title v-if="title" :item="stats" />
    <v-row>
      <v-col cols="12" :md="stats.image ? 8 : 12">
        <!-- BASE STATS -->
        <me-hr />
        <me-stat-list>
          <me-stat-list-item label="Armor Class">
            {{ stats.ac }}
          </me-stat-list-item>
          <me-stat-list-item label="Hit Points">
            {{ hitPoints }}
          </me-stat-list-item>
          <me-stat-list-item v-if="stats.sp" label="Shields">
            {{ stats.sp.shields }} (regen {{ regen }})
          </me-stat-list-item>
          <me-stat-list-item v-if="stats.barrier" label="Barrier">
            {{ stats.barrier }} {{ stats.barrier | pluralize('tick') }}
          </me-stat-list-item>
          <me-stat-list-item v-if="stats.barrier" label="Speed">
            {{ speed }}
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
              {{ ability }}
            </div>
            <div class="text-body-2">
              {{ score }} ({{ abilityBonus(score) }})
            </div>
          </v-col>
        </v-row>
        <!-- SKILLS -->
        <me-hr />
        <me-stat-list>
          <me-stat-list-item v-if="hasFeature('savingThrows')" label="Saving Throws">
            {{ savingThrows }}
          </me-stat-list-item>
          <me-stat-list-item v-if="skills" label="Skills">
            {{ skills }}
          </me-stat-list-item>
          <me-stat-list-item v-if="hasFeature('damageVulnerabilities')" label="Damage Vulnerabilities">
            {{ stats.damageVulnerabilities.join(', ') }}
          </me-stat-list-item>
          <me-stat-list-item v-if="hasFeature('damageResistances')" label="Damage Resistances">
            {{ stats.damageResistances.join(', ') }}
          </me-stat-list-item>
          <me-stat-list-item v-if="hasFeature('damageImmunities')" label="Damage Immunities">
            {{ stats.damageImmunities.join(', ') }}
          </me-stat-list-item>
          <me-stat-list-item v-if="hasFeature('conditionImmunities')" label="Condition Immunities">
            {{ stats.conditionImmunities.join(', ') }}
          </me-stat-list-item>
          <me-stat-list-item label="Senses">
            {{ senses }}
          </me-stat-list-item>
          <me-stat-list-item label="Challenge">
            {{ stats.cr }} ({{ xp(stats.cr) }} XP)
          </me-stat-list-item>
        </me-stat-list>
        <!-- FEATURES -->
        <me-hr />
        <p v-for="feature in stats.features" :key="feature.id">
          <me-npc-feature :feature="feature" />
        </p>
        <div v-if="stats.powercasting">
          <me-npc-feature :feature="powercastingFeature" />
          <me-npc-innate-powercasting v-if="powercastingIsInnate" :powercasting="stats.powercasting" />
          <me-npc-powercasting v-else :powercasting="stats.powercasting" />
        </div>
        <!-- ACTIONS -->
        <div v-if="hasFeature('actions')">
          <me-npc-set-title>
            Actions
          </me-npc-set-title>
          <div v-for="action in stats.actions" :key="action.name">
            <me-npc-feature v-if="action.type === 'standard'" :feature="action" />
            <me-npc-weapon-attack
              v-else-if="action.type === 'weapon'"
              :id="action.id"
              :ability-scores="stats.abilityScores"
              :prof-bonus="stats.profBonus"
            />
            <me-npc-attack
              v-else
              :attack="action"
              :ability-scores="stats.abilityScores"
              :prof-bonus="stats.profBonus"
            />
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
import { AbilityScoreBonus } from '~/mixins/abilityScoreBonus'
import { DieFromAverage } from '~/mixins/dieFromAverage'
import { AverageFromDie } from '~/mixins/averageFromDie'
import { xp } from '~/mixins/xp'

export default {
  mixins: [
    AbilityScoreBonus,
    AverageFromDie,
    DieFromAverage,
    xp
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
  data () {
    return {
      imageDialog: false,
      // TODO: pull these from skills.json
      skillsMap: {
        acrobatics: 'dex',
        athletics: 'str',
        deception: 'cha',
        electronics: 'int',
        engineering: 'int',
        history: 'int',
        insight: 'wis',
        intimidation: 'cha',
        investigation: 'int',
        medicine: 'wis',
        perception: 'wis',
        performance: 'cha',
        persuasion: 'cha',
        science: 'int',
        sleight_of_hand: 'dex',
        stealth: 'dex',
        survival: 'wis',
        vehicle_handling: 'dex'
      },
      abilityMap: {
        str: 'Strength',
        dex: 'Dexterity',
        con: 'Constitution',
        int: 'Intelligence',
        wis: 'Wisdom',
        cha: 'Charisma'
      },
      barrierFeature: {
        name: 'Barrier'
      }
    }
  },
  computed: {
    hitPoints () {
      let mod = this.abilityScoreBonus(this.stats.abilityScores.con) * this.stats.hp.numDice
      const average = this.averageFromDie(`${this.stats.hp.numDice}d${this.stats.hp.die}`) + mod
      if (mod > 0) {
        mod = ` + ${mod}`
      } else if (mod < 0) {
        mod = ` - ${mod * -1}`
      } else {
        mod = ''
      }
      return `${average} (${this.stats.hp.numDice}d${this.stats.hp.die}${mod})`
    },
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
    passivePerception () {
      const skillText = this.skills
      const hasPerception = skillText && skillText.match(/perception/) ? this.stats.profBonus : 0
      return `Passive Perception ${10 + this.abilityScoreBonus(this.stats.abilityScores.wis) + hasPerception}`
    },
    regen () {
      if (this.stats.sp && this.stats.sp.regen) {
        const regen = parseInt(this.stats.sp.regen, 10)
        if (regen > 0) {
          return regen
        }
      }
      return 0
    },
    savingThrows () {
      return this.stats.savingThrows.map((st) => {
        const name = this.abilityMap[st]
        let bonus = this.abilityScoreBonus(this.stats.abilityScores[st]) + parseInt(this.stats.profBonus, 10)
        bonus = bonus > 0 ? bonus : 0
        return `${name} +${bonus}`
      }).join(', ')
    },
    senses () {
      let senses = ''
      if (this.stats.senses && this.stats.senses.length > 0) {
        senses = this.stats.senses.map(s => `${s.sense} ${s.range}m`).join(', ')
        // return this.stats.senses.map(s => `${s.sense} ${s.range}m`).push(this.passivePerception)
      }
      return senses === '' ? this.passivePerception : `${senses}, ${this.passivePerception}`
    },
    skills () {
      if (this.stats.skills.length === 0) {
        return false
      }
      return this.stats.skills.map((skillKey) => {
        let skill = skillKey
        let bonus = this.stats.profBonus
        if (skill.match(/\*/)) {
          bonus *= 2
          skill = skill.replace('*', '')
        }
        const ability = this.skillsMap[skill]
        if (!ability) {
          // eslint-disable-next-line
          console.log(`could not find ${skill} from ${this.stats.name}`)
          return false
        }
        const score = this.stats.abilityScores[ability]
        bonus += this.abilityScoreBonus(score)
        return `${this.$options.filters.titlecase(skill)} +${bonus}`
      }).join(', ')
    },
    speed () {
      return this.stats.speed.map((speed) => {
        return speed.type === 'walk' ? `${speed.range}m` : `${speed.type} ${speed.range}m`
      }).join(', ')
    },
    powercastingFeature () {
      return {
        name: this.powercastingIsInnate ? 'Innate Powers' : 'Powercasting',
        recharge: false,
        description: this.powercastingIsInnate ? this.powercastingParagraphInnate : this.powercastingParagraph
      }
    },
    powercastingIsInnate () {
      return this.stats.powercasting.level === 'innate'
    },
    powercastingParagraphInnate () {
      return `The ${this.lcName}'s innate powercasting ability is
        ${this.abilityMap[this.stats.powercasting.mod]} (power save DC ${this.powerSaveDc}, +${this.powerHit} to hit with
        power attacks). It can innately cast the following:`
    },
    powercastingParagraph () {
      return `The ${this.lcName} is ${this.$options.filters.article(this.stats.powercasting.level)}
        ${this.stats.powercasting.level}${this.$options.filters.ordinal(this.stats.powercasting.level)}-level powercaster.
        Its powercasting ability is ${this.abilityMap[this.stats.powercasting.mod]} (power save DC ${this.powerSaveDc},
        +${this.powerHit} to hit with powers). The ${this.lcName} has the following powers:`
    },
    powerSaveDc () {
      return 8 + this.powerHit
    },
    powerHit () {
      if (this.stats.powercasting) {
        return this.stats.profBonus + this.abilityScoreBonus(this.stats.abilityScores[this.stats.powercasting.mod])
      }
      return 0
    }
  },
  methods: {
    hasFeature (feature) {
      return this.stats[feature] && this.stats[feature].length > 0
    },
    abilityBonus (score) {
      const abilityScoreBonus = this.abilityScoreBonus(score)
      return abilityScoreBonus >= 0 ? `+${abilityScoreBonus}` : abilityScoreBonus
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
