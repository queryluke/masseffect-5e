import { AbilityScoreBonus } from '~/mixins/abilityScoreBonus'
import { AverageFromDie } from '~/mixins/averageFromDie'

export const NpcHelpers = {
  mixins: [AbilityScoreBonus, AverageFromDie],
  computed: {
    conditionImmunities () {
      const conditions = this.$store.getters.getData('conditions')
      const list = conditions.filter(i => this.stats.irv.conImm.includes(i.id))
      return this.createList(list.map(i => i.name))
    },
    crXp () {
      const cr = this.$store.getters.getData('npc-stats').find(i => i.id === this.stats.cr)
      return this.$t('npc.cr_text', { n: cr.cr, xp: this.$options.filters.groupDigits(cr.xp, this.$t('digit_separator')) })
    },
    hitPoints () {
      const mod = this.abilityScoreBonus(this.stats.abilityScores.con) * this.stats.hp.dieCount
      const avg = this.roundedAverageFromDie(this.stats.hp.dieType, this.stats.hp.dieCount) + mod
      const n = mod < 0 ? mod * -1 : mod
      const formulaType = mod === 0 ? 'base' : mod > 0 ? 'plus' : 'minus'
      const dice = this.$t('dice', { dieType: this.stats.hp.dieType, dieCount: this.stats.hp.dieCount })
      const formula = this.$t(`dice_formulas.${formulaType}`, { dice, n })
      return this.$t('dice_average', { avg, formula })
    },
    passivePerception () {
      let bonus = 0
      if (this.stats.skills) {
        if (this.stats.skills.includes('perception')) {
          bonus = this.stats.profBonus
        }
        if (this.stats.skills.includes('perception*')) {
          bonus = this.stats.profBonus * 2
        }
      }
      return `${this.$t('passive_perception_title')} ${10 + this.abilityScoreBonus(this.stats.abilityScores.wis) + bonus}`
    },
    savingThrows () {
      const stText = this.stats.savingThrows.map((st) => {
        const name = this.$t(`abilities.${st}.abbr`)
        let bonus = this.abilityScoreBonus(this.stats.abilityScores[st]) + parseInt(this.stats.profBonus, 10)
        bonus = bonus > 0 ? bonus : 0
        return `${name} +${bonus}`
      })
      return this.createList(stText)
    },
    senses () {
      const senses = [this.passivePerception]
      if (this.stats.senses) {
        for (const key in this.stats.senses) {
          const label = this.$t(`senses.${key}_title`)
          const value = `<me-distance :length="${this.stats.senses[key]}" abbr />`
          senses.push(`${label} ${value}`)
        }
      }
      return this.createList(senses)
    },
    skills () {
      const skills = this.$store.getters.getData('skills')
      const skillText = this.stats.skills.map((skillKey) => {
        let s = skillKey
        let bonus = this.stats.profBonus
        if (s.match(/\*/)) {
          bonus *= 2
          s = s.replace('*', '')
        }
        const skill = skills.find(i => i.id === s)
        const score = this.stats.abilityScores[skill.link]
        bonus += this.abilityScoreBonus(score)
        return `${skill.name} +${bonus}`
      })
      return this.createList(skillText)
    },
    speeds () {
      const speeds = []
      for (const key in this.stats.speed) {
        const label = this.$t(`speeds.${key}.label`)
        const value = `<me-distance :length="${this.stats.speed[key]}" abbr />`
        speeds.push(`${label} ${value}`)
      }
      return this.createList(speeds)
    },
    shields () {
      let text = this.stats.shields.capacity
      if (this.stats.shields.regen > 0) {
        text = this.$t('npc.shields_w_regen', { capacity: text, n: this.stats.shields.regen })
      }
      return text
    }
  },
  methods: {
    createList (array) {
      return this.$t(`lists.comma_list[${array.length}]`, array)
    },
    hasIrv (key) {
      return this.stats.irv && this.stats.irv[key] && this.stats.irv[key].length > 0
    },
    abilityBonus (score) {
      const abilityScoreBonus = this.abilityScoreBonus(score)
      return abilityScoreBonus >= 0 ? `+${abilityScoreBonus}` : abilityScoreBonus
    },
    damageList (damages) {
      return this.createList(damages.map((i) => {
        return this.$t(`damage_types.${i}_title`)
      }))
    }
  }
}
