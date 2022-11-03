<template>
  <div>
    <div v-show="showTab(1)">
      <me-cs-action-list :items="csAllActions.attacks">
        <div class="d-flex justify-space-between">
          <div>
            Attacks <span v-if="extraAttacks" class="text-body-2"><small>({{ extraAttacks }} attacks per action)</small></span>
          </div>
          <div v-if="showThermalClips">
            <span class="text-body-2"><small>Thermal Clips: {{ thermalClips.equipped }} of {{ thermalClips.max }}</small></span>
          </div>
        </div>
      </me-cs-action-list>
    </div>
    <div v-show="showTab(2)">
      <me-cs-action-list :items="csAllActions.actions">
        Actions
      </me-cs-action-list>
    </div>
    <div v-show="showTab(3)">
      <me-cs-action-list :items="csAllActions.bonusActions">
        Bonus Actions
      </me-cs-action-list>
    </div>
    <div v-show="showTab(4)">
      <me-cs-action-list :items="csAllActions.reactions">
        Reactions
      </me-cs-action-list>
    </div>
    <div v-show="showTab(5)">
      <me-cs-action-list :items="csAllActions.other">
        Other Features
        <template v-if="csSetBonuses.length > 0" #append>
          <me-cs-action-cards-set-bonus
            v-for="(item, itemIndex) in csSetBonuses"
            :key="`set-bonus-${itemIndex}`"
            :item="item"
          />
        </template>
      </me-cs-action-list>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import MeCsActionCardsSetBonus from '~/components/cs/action/cards/MeCsActionCardsSetBonus'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsActions',
  components: { MeCsActionCardsSetBonus },
  computed: {
    ...mapGetters({
      mechanics: 'mechanics/mechanics',
      character: 'character',
      powers: 'powers/powers',
      equippedWeapons: 'equipment/equippedWeapons',
      profs: 'profs/profs',
      abilityBreakdown: 'abilities/abilityBreakdown',
      weaponAttacks: 'equipment/weaponAttacks',
      tab: 'navigation/actionsTab',
      barrier: 'hp/barrier',
      setBonuses: 'equipment/activeSetBonuses',
      thermalClips: 'equipment/thermalClips',
      mechanicActions: 'mechanics/mechanicActions'
    }),
    weaponProperties () {
      return this.$store.getters.getData('weapon-properties')
    },
    globalAttackNotes () {
      return this.mechanics.filter(i => i.type === 'global-attack-note').sort((a, b) => a.attack > b.attack ? 1 : -1)
    },
    extraAttacks () {
      const extraAttackMechanics = this.mechanics.filter(i => i.type === 'extra-attack')
      let max = 0
      if (extraAttackMechanics.length) {
        max = Math.max(...extraAttackMechanics.map(i => i.value))
      }
      const adds = this.mechanics.filter(i => i.type === 'extra-attack-add').length
      return max + adds
    },
    showThermalClips () {
      return this.character.options.thermalClips || false
    },
    barrierAction () {
      if (this.barrier.uses.max === 0) {
        return false
      }
      return {
        name: 'Barrier',
        shortDesc: `Gain ${this.barrier.ticks.max} barrier ticks (to a maximum of ${this.barrier.ticks.max})`,
        resource: {
          displayType: 'barrier',
          reset: 'short',
          id: 'barrier'
        },
        moreInfo: {
          model: 'class-features',
          id: 'barrier-vanguard'
        }
      }
    },
    actionsList () {
      return this.$store.getters.getData('actions')
    },
    baseActions () {
      const baseActions = {}
      for (const type of ['action', 'bonus-action', 'reaction']) {
        const defaults = this.actionsList.filter(i => i.type === type)
        const extras = this.mechanics.filter(i => i.type === type && i.baseGroup).map((i) => {
          const isDefault = this.actionsList.find(j => j.name === i.name)
          if (isDefault) {
            return isDefault
          }
          return i
        })
        baseActions[type] = [...defaults, ...extras]
      }
      return baseActions
    },
    groupedActions () {
      const groups = {
        action: [],
        'bonus-action': [],
        reaction: [],
        other: []
      }
      const mechanicActionsInGroup = this.mechanicActions.filter(i => i.group)
      for (const action of mechanicActionsInGroup) {
        const groupIndex = groups[action.type].findIndex(i => i.title === action.group)
        if (groupIndex > -1) {
          groups[action.type].splice(groupIndex, 1, { ...groups[action.type][groupIndex], items: [...groups[action.type][groupIndex].items, action] })
        } else {
          groups[action.type].push({
            group: true,
            title: action.group,
            items: [action]
          })
        }
      }
      return groups
    },
    csAllActions () {
      return {
        attacks: this.csAttacks,
        actions: this.csActions,
        bonusActions: this.csBonusActions,
        reactions: this.csReactions,
        other: this.csOtherActions
      }
    },
    csActions () {
      // base
      const actions = [
        {
          group: true,
          title: 'Actions in Combat',
          items: this.baseActions.action
        }
      ]
      // burst fire
      if (this.weaponAttacks.bf.length) {
        actions.push({
          group: true,
          title: 'Burst Fire',
          items: this.weaponAttacks.bf
        })
      }
      // powers
      if (this.csPowersAsActions.actions.length) {
        actions.push({
          group: true,
          title: 'Powers',
          items: this.csPowersAsActions.actions,
          component: 'me-cs-action-cards-power'
        })
      }
      // other groups
      if (this.groupedActions.action) {
        actions.push(...this.groupedActions.action)
      }
      if (this.barrierAction) {
        actions.push(this.barrierAction)
      }
      const regularActions = this.mechanicActions.filter(i => i.type === 'action' && !i.group && !i.baseGroup)
      if (regularActions.length) {
        actions.push(...regularActions)
      }
      if (this.csCustomAsActions.actions.length) {
        actions.push(...this.csCustomAsActions.actions)
      }
      return actions
    },
    csAttacks () {
      return [
        ...this.weaponAttacks.attacks,
        ...this.mechanicActions.filter(i => i.type === 'attack'),
        ...this.csPowersAsActions.attacks
      ]
    },
    csBonusActions () {
      const bonusActions = []
      // base
      const baseBA = this.baseActions['bonus-action']
      if (baseBA.length) {
        bonusActions.push({
          group: true,
          title: 'Bonus Actions in Combat',
          items: baseBA
        })
      }
      // two-weapon fighting
      if (this.weaponAttacks.twf.length) {
        bonusActions.push({
          group: true,
          title: 'Two Weapon Fighting',
          items: this.weaponAttacks.twf
        })
      }
      // double tap
      if (this.weaponAttacks.dt) {
        bonusActions.push({
          group: true,
          title: 'Double Tap',
          items: this.weaponAttacks.dt
        })
      }
      // powers
      if (this.csPowersAsActions.bonus_actions.length) {
        bonusActions.push({
          group: true,
          title: 'Powers',
          items: this.csPowersAsActions.bonus_actions,
          component: 'me-cs-action-cards-power'
        })
      }
      // barrier
      if (this.barrierAction) {
        bonusActions.push(this.barrierAction)
      }
      // regular
      const regularActions = this.mechanicActions.filter(i => i.type === 'bonus-action' && !i.baseGroup)
      if (regularActions.length) {
        bonusActions.push(...regularActions)
      }
      if (this.csCustomAsActions.bonus.length) {
        bonusActions.push(...this.csCustomAsActions.bonus)
      }
      return bonusActions
    },
    csReactions () {
      return [
        {
          group: true,
          title: 'Reactions in Combat',
          items: this.baseActions.reaction
        },
        ...[{
          group: true,
          title: 'Powers',
          items: this.csPowersAsActions.reactions,
          component: 'me-cs-action-cards-power'
        }].filter(i => i.items.length),
        ...this.mechanicActions.filter(i => i.type === 'reaction' && !i.baseGroup),
        ...this.csCustomAsActions.reactions
      ]
    },
    csOtherActions () {
      return [
        ...this.mechanicActions.filter(i => i.type === 'other')
      ]
    },
    csCustomAsActions () {
      const brew = this.character.brews
        .filter(i => ['action', 'reaction', 'bonus-action'].includes(i.type))
        .map((i) => {
          return {
            name: i.name,
            type: i.type,
            resource: i.mechanics.uses
              ? {
                  displayType: 'checkbox',
                  reset: i.mechanics.recharge,
                  max: { type: 'flat', value: i.mechanics.uses },
                  id: i.id
                }
              : false,
            html: i.html
          }
        })
      return {
        actions: brew.filter(i => i.type === 'action'),
        bonus: brew.filter(i => i.type === 'bonus-action'),
        reactions: brew.filter(i => i.type === 'reaction')
      }
    },
    csPowersAsActions () {
      const sortedPowers = this.powers.filter(i => !i.upcast).sort((a, b) => a.level - b.level).map((i) => {
        return { ...i, component: 'me-cs-powers-side-nav' }
      })
      return {
        actions: sortedPowers.filter(i => i.castingTime.unit === 'action' || i.altCasting?.filter(i => i.unit === 'action').length),
        attacks: sortedPowers.filter(i => i.castingTime.unit === 'attack' || i.altCasting?.filter(i => i.unit === 'attack').length),
        bonus_actions: sortedPowers.filter(i => i.castingTime.unit === 'bonus_action' || i.altCasting?.filter(i => i.unit === 'bonus_action').length),
        reactions: sortedPowers.filter(i => i.castingTime.unit === 'reaction' || i.altCasting?.filter(i => i.unit === 'reaction').length)
      }
    },
    csSetBonuses () {
      return this.setBonuses.filter(i => i.activeBonuses.some(j => j.showNote))
    }
  },
  methods: {
    showTab (index) {
      if (this.tab === 0) {
        return true
      }
      return this.tab === index
    }
  }
}
</script>
