import { createNamespacedHelpers } from 'vuex'
import { ScoreText } from '~/mixins/character/scoreText'
import { CsColors } from '~/mixins/character/csColors'
const { mapGetters } = createNamespacedHelpers('character')
export const CsActions = {
  mixins: [ScoreText, CsColors],
  data () {
    return {
      showToggleOptionMenu: false
    }
  },
  computed: {
    ...mapGetters({
      toggles: 'resources/toggles',
      resources: 'resources/resources',
      abilityBreakdown: 'abilities/abilityBreakdown',
      profBonus: 'profBonus',
      mcBonus: 'mechanics/mcBonus',
      mechanics: 'mechanics/mechanics',
      tentacleBlenderText: 'equipment/tentacleBlenderText',
      hp: 'hp/hp',
      shields: 'hp/shields',
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
        save: false,
        bonus: false
      }
      const dc = { ...dcDefaults, ...this.item.dc }
      const bonus = dc.bonus ? this.mcBonus(dc.bonus) : 0
      const mod = dc.mod ? this.abilityBreakdown[dc.mod].mod : 0
      dc.target = bonus + mod + dc.base + (dc.proficient ? this.profBonus : 0)
      return dc
    },
    hit () {
      if (!this.item.attack) {
        return false
      }
      const hitDefaults = {
        mod: false,
        proficient: false,
        bonus: false,
        crit: 20
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
      // FUTURE: these types of calculations should probably be in the component
      if (!this.item.damage?.length) {
        return false
      }
      const damageDefault = {
        dieCount: 0,
        dieType: false,
        type: false,
        mod: false,
        bonus: false,
        reroll: false,
        label: false
      }
      let initialDamages = []
      const damages = this.item.damage || []
      const baseDamages = damages.filter(i => !i.addTo)
      const addToDamages = damages.filter(i => i.addTo)
      for (const rawDamage of baseDamages) {
        // create a standard damage
        initialDamages.push(this.getDamageValues({ ...damageDefault, ...rawDamage }))
      }
      for (const rawAddToDamage of addToDamages) {
        const addToDamage = this.getDamageValues({ ...damageDefault, ...rawAddToDamage })
        if (rawAddToDamage.addTo === 'base') {
          initialDamages[0] = this.mergeDamages(initialDamages[0], addToDamage)
        } else if (rawAddToDamage.addTo === 'all') {
          initialDamages = initialDamages.map(i => this.mergeDamages(i, addToDamage))
        }
      }

      const finalDamages = []
      for (const damage of initialDamages) {
        damage.detail = this.item.name
        damage.text = this.fullDamageString(damage)
        damage.healing = ['shields', 'hp', 'temp'].some(j => Object.keys(damage.types).includes(j))
        finalDamages.push(damage)
      }
      return finalDamages
    },
    notes () {
      const notes = []
      if (this.damages) {
        const rerolls = this.damages.map(i => i.reroll).filter(i => !!i).sort((a, b) => b - a)
        if (rerolls.length) {
          notes.push({
            type: 'icon',
            icon: `mdi-numeric-${rerolls[0] - 1}-box-multiple-outline`,
            text: rerolls[0] === 3 ? 'Reroll 1s & 2s' : 'Reroll 1s'
          })
        }
      }
      if (this.hit && this.hit.crit < 20) {
        notes.push({
          type: 'text',
          text: `Crit: ${this.hit.crit}+`
        })
      }
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
        level: this.level,
        damage: this.damages[0]?.text,
        shieldRegen: this.shields.regen
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
    },
    toggleOptions () {
      return this.item.toggle?.options || false
    },
    toggle: {
      get () {
        if (!this.item.toggle) {
          return false
        }
        return this.toggles[this.item.toggle.id] || false
      },
      set (value) {
        this.$store.dispatch('character/resources/SET_TOGGLE', { id: this.item.toggle.id, value })
        this.$store.dispatch('character/mechanics/TOGGLE_MECHANIC', { toggle: this.item.toggle, value })
        const which = value ? 'whenOn' : 'whenOff'
        const whenables = (this.item.toggle[which] || []).slice()
        if (this.toggleOptions && this.toggleSelection) {
          whenables.push(...(this.toggleSelection[which] || []))
        }
        for (const whenable of whenables) {
          this.executeToggle(whenable)
        }
      }
    },
    toggleSelection: {
      get () {
        if (!this.toggleOptions) {
          return false
        }
        const selectionId = this.toggles[`${this.item.toggle.id}-selection`]
        if (!selectionId) {
          return this.toggleOptions[0]
        }
        const selection = this.toggleOptions.find(i => i.id === selectionId)
        if (!selection) {
          return this.toggleOptions[0]
        }
        return selection
      },
      set (value) {
        this.$store.dispatch('character/resources/SET_TOGGLE', { id: `${this.item.toggle.id}-selection`, value })
        if (this.toggle) {
          this.$store.dispatch('character/mechanics/CHANGE_TOGGLE_SELECTION', { toggle: this.item.toggle })
        }
      }
    }
  },
  methods: {
    mergeDamages (damage, addToDamage) {
      const mergedDamage = { label: damage.label, types: damage.types }
      for (const [type, values] of Object.entries(addToDamage.types)) {
        // if the damage type already exists
        if (mergedDamage.types[type]) {
          for (const [dieType, dieCount] of Object.entries(values)) {
            // check for an existing dieType
            if (mergedDamage.types[type][dieType]) {
              mergedDamage.types[type][dieType] += dieCount || 0
            } else {
              // else, create a new dieType key
              mergedDamage.types[type][dieType] = dieCount
            }
          }
        } else {
          // if there is no matching damage type
          mergedDamage.types[type] = values
        }
      }
      mergedDamage.reroll = Math.max(damage.reroll, addToDamage.reroll)
      return mergedDamage
    },
    getDamageValues (damage) {
      // the dieCount & dieType are either an int or bonus object
      let dieType = damage.dieType
      if (typeof damage.dieType === 'object') {
        dieType = this.mcBonus(damage.dieType)
      }
      let dieCount = damage.dieCount
      if (typeof damage.dieCount === 'object') {
        dieCount = this.mcBonus(damage.dieCount)
      }
      // get the bonus
      let bonus = damage.bonus ? this.mcBonus(damage.bonus) : 0
      // get the mod
      const mod = damage.mod ? this.abilityBreakdown[damage.mod].mod : 0
      // combine bonus and mod
      bonus += mod
      // return object
      const type = damage.type || 'damage'
      const finalDieType = dieType || 'none'
      return {
        types: {
          [type]: {
            [finalDieType]: dieCount,
            bonus
          }
        },
        reroll: damage.reroll || 0,
        label: damage.label
      }
    },
    interpolatedText (text) {
      // might be better to do this with attrGetters or put it in the HTML?
      const interpolations = Object.keys(this.interpolations)
      const regex = new RegExp(`{{ ?([0-9]{1,3}|[+ ]|${interpolations.join('|')}|powercastingMod:[a-z]+)+ ?}}`, 'g')
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
              return acc + parseInt(this.interpolatedReplacement(curr), 10) || 0
            } else {
              return acc + int
            }
          }, 0)
        }
        return this.interpolatedReplacement(replacement)
      })
      return interpolated
    },
    interpolatedReplacement (replacementKey) {
      try {
        if (replacementKey.includes(':')) {
          const [type, value] = replacementKey.split(':')
          return this.mcBonus({ type, value })
        } else {
          return this.interpolations[replacementKey]
        }
      } catch (e) {
        console.error(e.message)
        return replacementKey
      }
    },
    executeToggle (toggle) {
      if (toggle.type !== 'resource' || !toggle.value) {
        return
      }
      let value = this.mcBonus(toggle.value)
      if (toggle.method !== 'set') {
        const currentValue = this.resources[toggle.id] || 0
        value = toggle.method === 'add' ? currentValue + value : currentValue - value
      }
      this.$store.dispatch('character/resources/SET_RESOURCE', { id: toggle.id, value })
    }
  }
}
