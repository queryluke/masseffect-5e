export const Multiclass = {
  data () {
    return {
      multiclassProficiencies: {
        adept: {
          weapon: {
            has: ['smg']
          }
        },
        engineer: {
          armor: {
            has: ['medium']
          },
          weapon: {
            has: ['assault_rifle']
          }
        },
        infiltrator: {
          weapon: {
            has: ['sniper_rifle', 'melee']
          }
        },
        sentinel: {
          armor: {
            has: ['medium', 'heavy']
          },
          weapon: {
            choices: {
              items: ['assault_rifle', 'melee', 'shotgun', 'smg'],
              count: 1
            },
            text: 'Choose one from Assault Rifles, Melee, Shotguns, or SMGs'
          }
        },
        soldier: {
          armor: {
            has: ['medium', 'heavy']
          },
          weapon: {
            choices: {
              items: ['assault_rifle', 'heavy_pistol', 'melee', 'shotgun', 'smg', 'sniper_rifle'],
              count: 2
            },
            text: 'Choose two from Assault Rifles, Heavy Pistols, Melee, Shotguns, SMGs, or Sniper Rifles'
          }
        },
        vanguard: {
          armor: {
            has: ['medium']
          },
          weapon: {
            has: ['shotgun']
          }
        }
      }
    }
  }
}
