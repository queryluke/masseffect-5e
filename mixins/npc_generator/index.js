import { AbilityScoreBonus } from '../abilityScoreBonus'
import { AverageFromDie } from '../averageFromDie'
import { RandomValue } from '../randomValue'
import { Ac } from './Ac'
import { AbilityScores } from './AbilityScores'
import { Alignment } from './Alignmnet'
import { CombatPowers } from './CombatPowers'
import { Features } from './Features'
import { Hp } from './Hp'
import { Id } from './Id'
import { Irvs } from './Irvs'
import { Name } from './Name'
import { SavingThrows } from './SavingThrows'
import { Senses } from './Senses'
import { Skills } from './Skills'
import { Powercasting } from './Powercasting'
import { Speed } from './Speed'
import { Traits } from './Traits'
import { Type } from './Type'
import { Grenades } from './Grenades'
import { Weapons } from './Weapons'
import { Legendary } from '~/mixins/npc_generator/Legendary'
export const NpcGenerator = {
  data () {
    return {
      npc: {},
      damage: [],
      legendary: [],
      damageTarget: 1,
      healthBonus: 0,
      generated: false,
      percentMods: {
        0: [0.05, 0.1, 0.15],
        1: [0.1, 0.2, 0.3],
        2: [0.1, 0.25, 0.5],
        3: [0.1, 0.25, 0.5],
        4: [0.1, 0.25, 0.5]
      }
    }
  },
  mixins: [
    AbilityScoreBonus,
    AbilityScores,
    Ac,
    Alignment,
    AverageFromDie,
    CombatPowers,
    Features,
    Grenades,
    Hp,
    Id,
    Irvs,
    Legendary,
    Name,
    RandomValue,
    SavingThrows,
    Senses,
    Skills,
    Speed,
    Traits,
    Type,
    Powercasting,
    Weapons
  ],
  computed: {
    klass () {
      return this.$store.getters.getItem('classes', this.options.klass.id)
    },
    progression () {
      return this.klass.progression.columns
    },
    crMeta () {
      return Math.floor(this.options.cr.normalized / 8)
    },
    defensiveCrMeta () {
      const mod = this.options.offensiveScale * -1
      return this.crMeta + mod < 0 ? 0 : this.crMeta + mod
    },
    percentileMod () {
      return this.options.offensiveScale === 0 ? this.percentMods[this.crMeta][0] : this.options.offensiveScale % 2 === 0 ? this.percentMods[this.crMeta][2] : this.percentMods[this.crMeta][1]
    },
    minHp () {
      const recommendedHp = this.options.cr.hp
      const minHpMod = this.options.offensiveScale >= 0 ? this.percentileMod : 0
      return Math.max(Math.floor((recommendedHp - (recommendedHp * minHpMod)) - this.healthBonus), 5)
    },
    maxHp () {
      const recommendedHp = this.options.cr.hp
      const maxHpMod = this.options.offensiveScale <= 0 ? this.percentileMod : 0
      return Math.ceil((recommendedHp + (recommendedHp * maxHpMod)) - this.healthBonus)
    },
    minDmg () {
      const recommendedDmg = this.options.cr.damage
      const minDmgMod = this.options.offensiveScale <= 0 ? this.percentileMod : 0
      return Math.floor((recommendedDmg - (recommendedDmg * minDmgMod)))
    },
    maxDmg () {
      const recommendedDmg = this.options.cr.damage
      const maxDmgMod = this.options.offensiveScale >= 0 ? this.percentileMod : 0
      return Math.floor((recommendedDmg + (recommendedDmg * maxDmgMod)))
    },
    metaLevel () {
      const value = Math.floor(((this.options.cr.normalized + (this.options.cr.normalized / 3)) / 20) * 10)
      return value > 20 ? 20 : value < 1 ? 1 : value
    },
    metaTier () {
      return this.metaLevel < 5
        ? 1
        : this.metaLevel < 11
          ? 2
          : this.metaLevel < 17
            ? 3
            : 4
    },
    lcName () {
      return this.npc.name.toLowerCase()
    }
  },
  methods: {
    addDamage (damage) {
      const d = JSON.parse(JSON.stringify(this.damage))
      d.push(damage)
      this.damage = d
    },
    isDamageAddable (damage) {
      const d = JSON.parse(JSON.stringify(this.damage))
      d.push(damage)
      return this.calcAvgDamage(d, this.legendary) <= this.maxDmg
    },
    isHpBonusAddable (bonus) {
      return this.abilityScoreBonus(this.npc.abilityScores.con) + 5 + this.healthBonus + bonus <= this.maxHp
    },
    isLegendaryAddable (legendary) {
      const l = JSON.parse(JSON.stringify(this.legendary))
      l.push(legendary)
      return this.calcAvgDamage(this.damage, l) <= this.damageTarget + (this.damageTarget / 6)
    },
    calcAvgDamage (damage, legendary) {
      const cloneDmg = JSON.parse(JSON.stringify(damage))
      let rollingDamage = 0
      let actionUses = 0
      let actionDamage = 0
      for (const action of cloneDmg.filter(i => i.type !== 'bonus' && i.damage > 0).sort((a, b) => a.damage > b.damage ? -1 : 1)) {
        if (actionUses < 5) {
          actionUses += action.uses
          actionDamage += (action.damage * action.uses)
        }
      }
      rollingDamage += actionDamage > 0 && actionUses > 0 ? Math.ceil(actionDamage / actionUses) : 0
      let legendaryDamage = 0
      let legendaryUses = 0
      if (legendary) {
        for (const leg of legendary) {
          for (const action of cloneDmg.filter(i => i.type === leg.type && i.damage > 0)) {
            legendaryDamage += action.damage * action.uses
            legendaryUses += Math.ceil(action.uses / (4 - leg.cost))
          }
        }
      }
      rollingDamage += legendaryDamage > 0 && legendaryUses > 0 ? Math.ceil(legendaryDamage / legendaryUses) : 0
      let bonusDamage = 0
      let bonusUses = 0
      for (const action of cloneDmg.filter(i => i.type === 'bonus' && i.damage > 0)) {
        bonusDamage += action.damage * action.uses
        bonusUses += action.uses
      }
      rollingDamage += bonusDamage > 0 && bonusUses > 0 ? Math.ceil(bonusDamage / bonusUses) : 0
      return Math.ceil(rollingDamage)
    },
    calcDc (mod) {
      return 8 + this.npc.profBonus + this.abilityScoreBonus(this.npc.abilityScores[mod])
    },
    setDamageBudget () {
      const baseDamage = this.options.cr.damage
      const low = baseDamage - Math.floor(this.percentileMod * baseDamage)
      const high = baseDamage + Math.ceil(this.percentileMod * baseDamage)
      if (this.options.offensiveScale === 0) {
        const rangeSize = high - low
        this.damageTarget = this.randomValue([...Array(rangeSize).keys()].map(i => i + low))
      } else {
        this.damageTarget = this.options.offensiveScale > 0 ? high : low
      }
    },
    reset () {
      this.damageTarget = 1
      this.damage = []
      this.legendary = []
      this.healthBonus = 0
    },
    setDamageByFocus () {
      switch (this.options.damageFocus) {
        case 'powers':
          this.setPowercasting()
          this.setCombatPowers()
          this.setWeaponActions()
          this.setGrenades()
          break
        case 'weapons':
          this.setWeaponActions()
          this.setPowercasting()
          this.setCombatPowers()
          this.setGrenades()
          break
        case 'grenades':
          this.setGrenades()
          this.setPowercasting()
          this.setCombatPowers()
          this.setWeaponActions()
          break
        case 'heavy weapons':
          this.setPowercasting()
          this.setCombatPowers()
          this.setWeaponActions()
          this.setGrenades()
          break
      }
    },
    generateGrunt () {
      this.reset()
      this.setDamageBudget()
      this.npc.image = false
      this.npc.unit = 'archetype'
      this.setName()
      this.setId()
      this.setType()
      this.setAlignment()
      this.setAc()
      this.setIrvs()
      this.setSavingThrows()
      this.setSenses()
      this.npc.size = this.options.species.id === 'volus' ? 'small' : 'medium'
      this.setSkills()
      this.setSpeed()
      this.npc.profBonus = this.options.cr.profBonus
      this.setAbilityScores()
      this.npc.entries = {
        features: [],
        actions: [],
        legendary: {},
        reactions: []
      }
      this.setTraits()
      this.setFeatures()
      this.setDamageByFocus()
      this.setHp()
      this.npc.cr = this.options.cr.id
      // console.log(`hp budget: target = ${this.options.cr.hp} min = ${this.minHp}, max = ${this.maxHp}, bonuses: ${this.healthBonus}`)
      // console.log(`damage budget: target = ${this.damageTarget} min = ${this.minDmg}, max = ${this.maxDmg} avgDmg: ${this.calcAvgDamage(this.damage, this.legendary, true)}`)
      if (this.metaTier > 2) {
        this.setLegendary()
      }
      // console.log(this.npc)
      // console.log(`damage budget: target = ${this.damageTarget} min = ${this.minDmg}, max = ${this.maxDmg} avgDmg: ${this.calcAvgDamage(this.damage, this.legendary, true)}`)
      for (const key of ['features', 'actions', 'legendary', 'reactions']) {
        if (['{}', '[]'].includes(JSON.stringify(this.npc.entries[key]))) {
          delete this.npc.entries[key]
        }
      }
      this.generated = true
    }
  }
}
