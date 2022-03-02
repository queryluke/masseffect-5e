import { DiceRoll } from '@dice-roller/rpg-dice-roller'

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
    const roll = Object.entries(getters.rollController)
      .map(([dieType, count]) => `${count}${dieType}`)
      .join('+')
    const notation = getters.customTextRoll
    dispatch('ROLL', {
      title: 'Custom Roll',
      type: 'custom',
      roll: notation || roll
    })
  },
  ROLL ({ dispatch, rootGetters }, payload) {
    const roll = new DiceRoll(payload.roll)
    // TODO: investigate a better display for notation, or better way to get it
    /*
    const results = roll.output.split(/[:=]/)[1].trim()
      .replaceAll(/[[\]]/g, '')
      .replaceAll(/, /g, ' + ')
    */
    const results = roll.output.split(/[:=]/)[1].trim()
    const entry = {
      data: {
        title: payload.title,
        type: payload.type,
        subtitle: payload.subtitle || rootGetters['character/character'].name,
        notation: roll.notation,
        total: roll.total,
        results
      },
      // Source will be used when campaign logs are introduced
      source: {
        id: rootGetters['character/id'],
        name: rootGetters['character/character'].name
      },
      component: 'me-cs-logs-roll-entry',
      timestamp: new Date()
    }

    dispatch('character/navigation/SHOW_SIDE_NAVBAR', 'me-cs-logs-list', { root: true })
    dispatch('character/logs/LOG_WRITE', entry, { root: true })
  }
}
