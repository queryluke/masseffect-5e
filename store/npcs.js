export const state = () => ({
  npcs: [],
  npc: {
    id: 'newNpcTemp',
    name: 'New NPC',
    image: '',
    type: 'organic',
    unit: 'alien',
    alignment: 'u',
    profBonus: 2,
    ac: 12,
    hp: {
      dieCount: 1,
      dieType: 8
    },
    abilityScores: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10
    },
    irv: false,
    savingThrows: false,
    senses: false,
    speed: {
      walk: 30
    },
    entries: {},
    cr: '00000',
    shields: false,
    html: ''
  },
  editingId: null
})

export const getters = {
  npc: state => state.npc,
  editingId: state => state.editingId
}

export const mutations = {

}

export const actions = {
}
