<template lang="pug">
  div
    // Name
    div.pb-0.mt-3
      p.red--text.text--darken-4.headline.small-caps.mb-0
        strong {{ stats.name }}
        span(v-if="stats.unit" style="text-transform: uppercase").body-2.grey--text.text--darken-4.pl-2 ({{ stats.unit }})
      p(v-if="stats.author").subheading.my-2 created by {{ stats.author }}
      p #[em {{ stats.size }} {{ stats.type }}, {{ stats.alignment }}]

    // Stats
    div(style="position:relative;").pt-0
      v-btn(@click="imageDialog = true" color="secondary" dark small fab absolute right top v-if="stats.image") #[v-icon photo]

      // Basic Stats
      div.hr
      ul.list-unstyled.pl-0
        li #[strong Armor Class] {{ stats.ac }}
        li #[strong Hit Points] {{ hitPoints }}
        li(v-if="stats.sp") #[strong Shield Points] {{ stats.sp.shields }} (regen {{ regen }})
        li(v-if="stats.barrier") #[strong Barrier] {{ stats.barrier }} {{ stats.barrier | pluralize('tick') }}
        li #[strong Speed] {{ speed }}

      // Ability Scores
      div.hr
      v-container.py-0
        v-layout
          v-flex(xs2 v-for="(score, ability) in stats.abilityScores" v-bind:key="ability").text-xs-center
            p.ma-0 #[strong {{ ability.toUpperCase() }}]
            p.ma-0 {{ score }} ({{ abilityBonus(score)  }})

      // Immunities and Skills
      div.hr
      ul.list-unstyled.pl-0
        li(v-if="hasFeature('savingThrows')") #[strong Saving Throws] {{ savingThrows }}
        li(v-if="skills") #[strong Skills] {{ skills }}
        li(v-if="hasFeature('damageVulnerabilities')") #[strong Damage Vulnerabilities] {{ stats.damageVulnerabilities.join(', ') }}
        li(v-if="hasFeature('damageResistances')") #[strong Damage Resistances] {{ stats.damageResistances.join(', ') }}
        li(v-if="hasFeature('damageImmunities')") #[strong Damage Immunities] {{ stats.damageImmunities.join(', ') }}
        li(v-if="hasFeature('conditionImmunities')") #[strong Condition Immunities] {{ stats.conditionImmunities.join(', ') }}
        li #[strong Senses] {{ senses }}
        li #[strong Challenge] {{ stats.cr }} ({{ xp(stats.cr) }} XP)

      // Features
      div.hr
      p(v-for="feature in stats.features" v-bind:key="feature.id")
        npc-feature(:feature="feature")

      // Spellcasting
      div(v-if="stats.spellcasting")
        div(v-if="stats.spellcasting.level === 'innate'")
          p.mb-0.
            #[strong #[em Innate Spellcasting]]. The {{ stats.name.toLowerCase() }}'s innate spellcasting ability is {{ abilityMap[stats.spellcasting.mod] }} (spell save DC
            {{ spellSaveDc }}, +{{ spellHit }} to hit with spell attacks). It can innately cast the following:
          npc-innate-spellcasting( v-bind:spellcasting="stats.spellcasting")
        div(v-else)
          p.mb-0.
            #[strong #[em Spellcasting].] The {{ stats.name.toLowerCase() }} is {{ stats.spellcasting.level | article }} {{ stats.spellcasting.level | ordinal }}-level
            spellcaster. Its spellcasting ability is {{ abilityMap[stats.spellcasting.mod] }} (spell save DC {{ spellSaveDc }}, +{{ spellHit }} to hit with spell attacks).
            The {{ stats.name.toLowerCase() }} has the following spells:
          npc-spellcasting(v-bind:spellcasting="stats.spellcasting")

      // Actions
      p(v-if="hasFeature('actions')").title.underline-heading.small-caps Actions
      div(v-for="action in stats.actions" v-bind:key="action.name")
        npc-feature(v-if="action.type === 'standard'" v-bind:feature="action")
        npc-weapon-attack(v-else-if="action.type === 'weapon'" v-bind:id="action.id" v-bind:abilityScores="stats.abilityScores" v-bind:profBonus="stats.profBonus")
        npc-grenade(v-else-if="action.type === 'grenade'" v-bind:id="action.id" v-bind:profBonus="stats.profBonus")
        npc-attack(v-else v-bind:attack="action" v-bind:abilityScores="stats.abilityScores" v-bind:profBonus="stats.profBonus")

      // Legendary Actions
      div(v-if="hasFeature('legendaryActions')")
        p.title.underline-heading.small-caps Legendary Actions
        p.
          The {{ stats.name.toLowerCase() }} can take 3 legendary actions, choosing from the options below. Only one legendary action can
          be used at a time and only at the end of another creature's turn. The {{ stats.name }} regains spent legendary
          actions at the start of its turn.
        p(v-for="la in legendaryActions" v-bind:key="la.name")
          npc-legendary-action(:action="la")

      // Lair Actions
      div(v-if="hasFeature('lairActions')")
        p.title.underline-heading.small-caps Lair Actions
        p.
          On initiative count 20 (losing initiative ties), the {{ stats.name.toLowerCase() }} takes a lair action to cause one of the
          following effects; it can't use the same effect two rounds in a row:
        ul
          li(v-for="(action, index) in stats.lairActions" v-bind:key="index") {{ action.description }}

      // Reactions
      div(v-if="hasFeature('reactions')")
        p.title.underline-heading.small-caps Reactions
        p(v-for="reaction in stats.reactions" v-bind:key="reaction.id")
          npc-feature(:feature="reaction")

    // Image
    v-dialog(v-model="imageDialog" width="500" v-if="stats.image")
      v-card
        v-card-title.headline {{ stats.name }} Images
        v-card-text.text-xs-center
          img(:src="stats.image" width="450")
        v-card-actions
          v-spacer
          v-btn(@click="imageDialog = false" color="primary" flat="flat")
</template>

<script>
import { AbilityScoreBonus } from '~/mixins/abilityScoreBonus'
import { DieFromAverage } from '~/mixins/dieFromAverage'
import { AverageFromDie } from '~/mixins/averageFromDie'
import { xp } from '~/mixins/xp'
import NpcFeature from '~/components/npc/NpcFeature.vue'
import NpcAttack from '~/components/npc/NpcAttack.vue'
import NpcGrenade from '~/components/npc/NpcGrenade.vue'
import NpcWeaponAttack from '~/components/npc/NpcWeaponAttack.vue'
import NpcSpellcasting from '~/components/npc/NpcSpellcasting.vue'
import NpcInnateSpellcasting from '~/components/npc/NpcInnateSpellcasting.vue'
import NpcLegendaryAction from '~/components/npc/NpcLegendaryAction'

export default {
  components: {
    NpcAttack,
    NpcSpellcasting,
    NpcInnateSpellcasting,
    NpcFeature,
    NpcGrenade,
    NpcWeaponAttack,
    NpcLegendaryAction
  },
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
    }
  },
  data () {
    return {
      imageDialog: false,
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
    spellSaveDc () {
      return 8 + this.spellHit
    },
    spellHit () {
      if (this.stats.spellcasting) {
        return this.stats.profBonus + this.abilityScoreBonus(this.stats.abilityScores[this.stats.spellcasting.mod])
      }
      return 0
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
    abilityBonus (score) {
      const abilityScoreBonus = this.abilityScoreBonus(score)
      return abilityScoreBonus >= 0 ? `+${abilityScoreBonus}` : abilityScoreBonus
    }
  }
}
</script>
