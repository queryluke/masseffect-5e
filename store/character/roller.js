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
        subDetail: payload.subDetail || false,
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
    dispatch('character/roller/DISCORD_POST_ALL', entry, { root: true })
    return entry
  },
  DISCORD_POST_ALL ({ dispatch, rootGetters }, payload) {
    const selectedWebhooks = rootGetters['character/character'].options.webhooks
    for (const id in selectedWebhooks) {
      // check if hook exists and send if it does, otherwise remove it from the character
      const webhooks = JSON.parse(rootGetters['user/profile'].webhooks)
      if (webhooks.find(webhook => webhook.id === id) && selectedWebhooks[id]) {
        dispatch('character/roller/DISCORD_POST', { webhook: selectedWebhooks[id], entry: payload }, { root: true })
      } else {
        delete selectedWebhooks[id]
        dispatch('character/UPDATE_CHARACTER', { attr: 'options.webhooks', value: selectedWebhooks }, { root: true })
      }
    }
  },
  DISCORD_POST ({ dispatch, rootGetters }, payload) {
    const URL = payload.webhook
    fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          fields: [
            {
              name: payload.entry.source.name,
              value: '*' + payload.entry.data.detail + '*'
            },
            {
              name: 'Result: ' + payload.entry.data.total,
              value: '*' + payload.entry.data.notation + ': ' + payload.entry.data.results + ' = ' + payload.entry.data.total + '*'
            }
          ]
        }]
      })
    })
  }
}
