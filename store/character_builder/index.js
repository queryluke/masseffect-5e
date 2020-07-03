export default {
  namespaced: true,
  state: {
    // Default "empty" character data model
    character: {
      version: '1.0.0',
      name: 'New Character',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
      level: 1,
      race: '',
      class: '',
      subclass: '',
      background: '',
      other_info: [],
      traits: [],
      class_features: [],
      feats: [],
      backgrounds: [],
      health: 0,
      max_health: 5,
      shields: 0,
      max_shields: 5,
      barrier_ticks: 0,
      stats: {
        str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10
      },
      skills: [
        { label: 'Acrobatics', prof: 0, advantage: false, stat: 'dex' },
        { label: 'Athletics', prof: 0, advantage: false, stat: 'str' },
        { label: 'Deception', prof: 0, advantage: false, stat: 'cha' },
        { label: 'Electronics', prof: 0, advantage: false, stat: 'int' },
        { label: 'Engineering', prof: 0, advantage: false, stat: 'int' },
        { label: 'History', prof: 0, advantage: false, stat: 'int' },
        { label: 'Insight', prof: 0, advantage: false, stat: 'wis' },
        { label: 'Intimidation', prof: 0, advantage: false, stat: 'cha' },
        { label: 'Investigation', prof: 0, advantage: false, stat: 'int' },
        { label: 'Medicine', prof: 0, advantage: false, stat: 'wis' },
        { label: 'Perception', prof: 0, advantage: false, stat: 'wis' },
        { label: 'Performance', prof: 0, advantage: false, stat: 'cha' },
        { label: 'Persuasion', prof: 0, advantage: false, stat: 'cha' },
        { label: 'Science', prof: 0, advantage: false, stat: 'int' },
        { label: 'Slight of Hand', prof: 0, advantage: false, stat: 'dex' },
        { label: 'Stealth', prof: 0, advantage: false, stat: 'dex' },
        { label: 'Survival', prof: 0, advantage: false, stat: 'wis' },
        { label: 'Vehicle Handling', prof: 0, advantage: false, stat: 'dex' }
      ],
      proficiencies: {
        stats: {
          str: false, dex: false, con: false, int: false, wis: false, cha: false
        },
        armor: {
          light: false,
          medium: false,
          heavy: false
        },
        weapons: {
          pistol: false,
          smg: false,
          assault_rifle: false,
          shotgun: false,
          sniper_rifle: false,
          melee: false,
          heavy_weapons: false
        },
        other: []
      },
      armor: [],
      weapons: [],
      powers: [],
      tech: {
        tech_points: 1
      },
      biotics: {
        spell_slots: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0
        }
      }
    }
  },
  mutations: {
    save (state, data) {
      state.character = data
    }
  }
}
