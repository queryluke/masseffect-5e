export const homebrewDefaults = {
  data () {
    return {
      homebrewDefaults: {
        powers: {
          name: '',
          type: 'biotic',
          level: 0,
          classes: ['adept'],
          mechanics: [
            {
              castingTime: {
                unit: 'action'
              },
              damage: false,
              dc: false,
              duration: {
                length: 0,
                unit: 'instant'
              },
              concentration: false,
              range: {
                short: 0
              },
              detonates: false,
              primes: false,
              conditions: []
            }
          ],
          advancements: []
        },
        weapons: {
          name: '',
          rarity: 'common',
          type: 'heavy_pistol',
          cost: 1000,
          weight: 1,
          heat: 4,
          damage: {
            dieCount: 1,
            dieType: 4,
            type: 'piercing'
          },
          range: {
            short: 30,
            long: 90
          },
          imageUrl: false,
          andromeda: false,
          properties: [],
          slots: 1,
          versatile: false
        }
      }
    }
  }
}
