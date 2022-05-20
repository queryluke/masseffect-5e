export const state = () => ({
})

export const getters = {
  expertises: (state, getters, rootState, rootGetters) => {
    return [
      ...rootGetters['character/mechanics/mechanics'].filter(i => i.type === 'skill' && i.expertise).map(i => i.value),
      ...rootGetters['character/character'].settings.expertise
    ]
  },
  skills: (state, getters, rootState, rootGetters) => {
    const skills = {}
    const profs = rootGetters['character/profs/profs'].skill
    const allMechanics = rootGetters['character/mechanics/mechanics']
    const expertises = getters.expertises
    const skillOrExpertises = allMechanics.filter(i => i.type === 'skill-or-expertise')
    const halfProficiencies = allMechanics.filter(i => i.type === 'half-proficiency')
    const scMechanics = allMechanics.filter(i => i.type === 'skill-check').map((i) => {
      if (i.valueLookup) {
        return {
          ...i,
          value: rootGetters['character/selections/valueLookup']({ model: i.valueLookup.model, id: i.valueLookup.id, limit: i.valueLookup.limit })
        }
      }
      return i
    })
    for (const skill of getters.skillList) {
      const proficient = profs.includes(skill.id) || (skillOrExpertises.some(i => i.value.includes(skill.id)))
      const expertise = expertises.includes(skill.id) || (skillOrExpertises.some(i => i.value.includes(skill.id)) && profs.includes(skill.id))
      const halfProf = (expertise || proficient) ? false : halfProficiencies.some(i => i.limit ? i.limit.includes(skill.id) : true)
      const profBonus = rootGetters['character/profBonus']
      const profBonusBonus = expertise
        ? profBonus * 2
        : proficient
          ? profBonus
          : halfProf
            ? Math.floor(profBonus / 2)
            : 0
      const baseMod = rootGetters[`character/abilities/${skill.link}Mod`] + profBonusBonus
      const mechanics = scMechanics.filter(i => i.value?.includes(skill.id) || (i.value === 'proficient' && proficient))
      const bonuses = mechanics.filter(i => i.effect?.type === 'bonus').reduce((acc, curr) => acc + rootGetters['character/mechanics/mcBonus'](curr.effect.bonus), 0)
      const mod = baseMod + bonuses
      const passiveBonus = allMechanics.filter(i => i.type === 'passive' && i.value.includes(skill.id)).reduce((acc, curr) => acc + rootGetters['character/mechanics/mcBonus'](curr.bonus), 0)
      const returnObj = {
        id: skill.id,
        name: skill.name,
        proficient,
        expertise,
        halfProf,
        mod,
        passive: 10 + mod + passiveBonus,
        otherBonuses: mechanics.filter(i => i.effect?.type !== 'bonus')
      }
      skills[skill.id] = returnObj
    }
    return skills
  },
  allSkillsBonus: (state, getters, rootState, rootGetters) => {
    return rootGetters['character/mechanics/mechanics'].filter(i => i.type === 'skill-check' && (!i.value && !i.valueLookup) && i.effect)
  },
  skillList: (state, getters, rootState, rootGetters) => {
    return rootGetters.getData('skills')
  }
}

export const mutations = {
}

export const actions = {
}
