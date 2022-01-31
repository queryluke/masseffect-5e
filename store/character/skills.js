export const state = () => ({
})

export const getters = {
  skills: (state, getters, rootState, rootGetters) => {
    const skills = {}
    const profs = rootGetters['character/profs/profs'].skill
    const allMechanics = rootGetters['character/mechanics/mechanics']
    const expertises = allMechanics.filter(i => i.type === 'skill' && i.expertise).map(i => i.value)
    const scMechanics = allMechanics.filter(i => i.type === 'skill-check')
    for (const skill of getters.skillList) {
      const proficient = profs.includes(skill.id)
      const expertise = expertises.includes(skill.id)
      const profBonus = rootGetters['character/profBonus']
      const profBonusBonus = expertise
        ? profBonus * 2
        : proficient
          ? profBonus
          : 0
      const baseMod = rootGetters[`character/abilities/${skill.link}Mod`] + profBonusBonus
      const mechanics = scMechanics.filter(i => i.limit ? i.limit.includes(skill.id) : true)
      const bonuses = mechanics.filter(i => i.effect.type === 'bonus').reduce((acc, curr) => acc + rootGetters['character/mechanics/mcBonus'](curr.effect.bonus), 0)
      const mod = baseMod + bonuses
      const advantages = mechanics.filter(i => i.effect.type === 'advantage')
      const disadvantages = mechanics.filter(i => i.effect.type === 'disadvantage')
      const returnObj = {
        name: skill.name,
        proficient,
        expertise,
        mod,
        advantages,
        disadvantages,
        passive: 10 + mod
      }
      skills[skill.id] = returnObj
    }
    return skills
  },
  skillList: (state, getters, rootState, rootGetters) => {
    return rootGetters.getData('skills')
  }
}

export const mutations = {
}

export const actions = {
}
