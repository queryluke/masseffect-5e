import { DiceRoll } from '@dice-roller/rpg-dice-roller'

function extractRolls (value) {
  if (value.rolls) {
    return value.rolls.map(roll => [roll.initialValue, roll.value || false])
  } else if (typeof value === 'object' && value.results && Array.isArray(value.results)) {
    return value.results.map(i => extractRolls(i)).flat()
  } else {
    return value
  }
}
// const expressionsSymbol = Symbol('expressions')

export const state = () => ({
  rollController: {},
  dieTypes: ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'],
  customTextRoll: null
})

export const getters = {
  rollController: state => state.rollController,
  customTextRoll: state => state.customTextRoll
}

export const mutations = {
  SET_CONTROLLER_DIE_COUNT (state, { dieType, value }) {
    state.rollController = { ...state.rollController, [dieType]: value }
  },
  SET_CUSTOM_TEXT_ROLL (state, value) {
    state.customTextRoll = value
  },
  RESET_CONTROLLER (state) {
    state.rollController = {}
  }
}

export const actions = {
  CUSTOM_ROLL ({ dispatch, getters }) {
    const notation = Object.entries(getters.rollController)
      .map(([dieType, count]) => `${count}${dieType}`)
      .join('+')
    const customNotation = getters.customTextRoll
    dispatch('ROLL', {
      type: 'roll',
      detail: 'custom',
      notation: notation || customNotation
    })
  },
  INTERNAL_ROLL (ctx, notation) {
    const roll = new DiceRoll(notation.toString())
    const results = roll.output.split(/[:=]/)[1].trim()
    return {
      results,
      total: roll.total
    }
  },
  ROLL ({ dispatch, rootGetters }, payload) {
    let notation = payload.notation.toString()
    if (!notation.includes('{')) {
      notation = `{${notation}}`
    }
    const roll = new DiceRoll(notation)
    let mrResults = false
    mrResults = roll.rolls.map(i => extractRolls(i))
    const results = roll.output.split(/[:=]/)[1].trim().replaceAll(/[{}]/g, '')
    const entry = {
      data: {
        type: payload.type,
        detail: payload.detail,
        notation: roll.notation,
        text: payload.text || roll.notation.replaceAll(/[{}]/g, ''),
        total: roll.total,
        results,
        mrResults
      },
      // Source will be used when campaign logs are introduced
      source: {
        id: rootGetters['character/id'],
        name: rootGetters['character/character'].name
      },
      nextRolls: payload.nextRolls || [],
      component: 'me-cs-logs-roll-entry',
      timestamp: new Date()
    }

    dispatch('character/navigation/SHOW_SIDE_NAV', 'me-cs-logs-list', { root: true })
    dispatch('character/logs/LOG_WRITE', entry, { root: true })
    return entry
  }
}
