import { createNamespacedHelpers } from 'vuex'
import { ScoreText } from '~/mixins/character/scoreText'
import { CsColors } from '~/mixins/character/csColors'
const { mapGetters } = createNamespacedHelpers('character')
export const CsActions = {
  mixins: [ScoreText, CsColors],
  computed: {
    ...mapGetters({
      abilityBreakdown: 'abilities/abilityBreakdown',
      profBonus: 'profBonus',
      mcBonus: 'mechanics/mcBonus',
      mechanics: 'mechanics/mechanics',
      tentacleBlenderText: 'equipment/tentacleBlenderText',
      hp: 'hp/hp',
      level: 'klasses/level'
    }),
    interpolatedShortDesc () {
      return this.item.shortDesc ? this.interpolatedText(this.item.shortDesc) : false
    },
    dc () {
      if (!this.item.dc) {
        return false
      }
      const dcDefaults = {
        base: 8,
        proficient: true,
        mod: false,
        save: false
      }
      const dc = { ...dcDefaults, ...this.item.dc }
      const mod = dc.mod ? this.abilityBreakdown[dc.mod].mod : 0
      dc.target = mod + dc.base + (dc.proficient ? this.profBonus : 0)
      return dc
    },
    hit () {
      if (!this.item.attack) {
        return false
      }
      const hitDefaults = {
        mod: false,
        proficient: false,
        bonus: false
      }
      const hit = { ...hitDefaults, ...this.item.attack }
      const bonus = hit.bonus ? this.mcBonus(hit.bonus) : 0
      const mod = hit.mod ? this.abilityBreakdown[hit.mod].mod : 0
      hit.bonus = bonus + mod + (hit.proficient ? this.profBonus : 0)
      return hit
    },
    range () {
      if (!this.item.range) {
        return false
      }
      const rangeDefaults = {
        short: 0,
        long: null,
        note: false,
        aoe: false
      }
      const range = { ...rangeDefaults, ...this.item.range }
      if (range.aoe) {
        range.aoe.filename = this.$vuetify.theme.dark ? `${range.aoe.type}-white` : range.aoe.type
      }
      return range
    },
    damages () {
      if (!this.item.damage?.length) {
        return false
      }
      const damageDefault = {
        dieCount: 0,
        dieType: false,
        type: false,
        mod: false,
        bonus: false,
        healing: false,
        detail: this.item.name
      }
      return this.item.damage.map((i) => {
        const damage = { ...damageDefault, ...i }
        let bonus = damage.bonus ? this.mcBonus(damage.bonus) : 0
        const mod = damage.mod ? this.abilityBreakdown[damage.mod].mod : 0
        bonus += mod
        let text = ''
        if (damage.dieCount) {
          text = `${damage.dieCount}`
          if (damage.dieType) {
            text += `d${damage.dieType}`
          }
          if (bonus !== 0) {
            text += this.damageText(bonus)
          }
        } else {
          text = bonus
        }
        damage.bonus = bonus
        damage.text = text
        damage.healing = ['shields', 'hp', 'temp'].includes(damage.type)
        return damage
      })
    },
    notes () {
      const notes = []
      if (Array.isArray(this.item.notes) && this.item.notes.length) {
        for (const note of this.item.notes) {
          if (typeof note === 'string') {
            const interpolated = this.interpolatedText(note)
            const hasHtml = /<.+?>/g.test(interpolated)
            notes.push({
              type: hasHtml ? 'html' : 'text',
              text: interpolated
            })
          } else {
            notes.push(note)
          }
        }
      }
      return notes
    },
    interpolations () {
      return {
        dc: this.dc.target,
        range: this.range?.short ? `<me-distance length="${this.range.short}" />` : '',
        profBonus: this.profBonus,
        strMod: this.abilityBreakdown.str.mod,
        dexMod: this.abilityBreakdown.dex.mod,
        conMod: this.abilityBreakdown.con.mod,
        wisMod: this.abilityBreakdown.wis.mod,
        intMod: this.abilityBreakdown.int.mod,
        chaMod: this.abilityBreakdown.cha.mod,
        avatarsDie: this.mechanics.find(i => i.type === 'improved-avatars-inspiration') ? 'd8' : 'd4',
        tentacleBlender: this.tentacleBlenderText,
        hp: this.hp.current,
        level: this.level
      }
    },
    hitRoll () {
      const hitRoll = {
        notation: `1d20${this.rollText(this.hit.bonus)}`,
        detail: this.item.name,
        type: 'to hit'
      }
      // TODO: Add logic for multiple damage rolls
      if (this.damages && this.damages[0]) {
        hitRoll.nextRolls = [
          {
            text: 'Roll Damage',
            roll: {
              detail: this.item.name || 'Damage Roll',
              type: 'damage',
              notation: this.damages[0].text
            }
          }
        ]
      }
      return hitRoll
    }
  },
  methods: {
    interpolatedText (text) {
      // might be better to do this with attrGetters or put it in the HTML?
      const interpolations = ['dc', 'range', 'profBonus', 'strMod', 'conMod', 'wisMod', 'intMod', 'chaMod', 'avatarsDie', 'tentacleBlender', 'hp', 'level']
      const regex = new RegExp(`{{ ?([0-9]{1,3}|[+ ]|${interpolations.join('|')})+ ?}}`, 'g')
      if (!regex.test(text)) {
        return text
      }
      const interpolated = text.replace(regex, (match) => {
        let replacement = match.replaceAll(/[{{}}]/g, '')
        replacement = replacement.trim()
        if (replacement.includes('+')) {
          replacement = replacement.split('+').map(i => i.trim())
          return replacement.reduce((acc, curr) => {
            const int = parseInt(curr, 10)
            if (isNaN(int)) {
              return acc + parseInt(this.interpolations[curr], 10) || 0
            } else {
              return acc + int
            }
          }, 0)
        }
        return this.interpolations[replacement]
      })
      return interpolated
    }
  }
}
