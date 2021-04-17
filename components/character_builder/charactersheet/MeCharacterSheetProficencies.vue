<template>
  <div>
    Proficent in: {{weaponTypes[profs.has[0]]}}
    {{profs}}
    <v-select
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      weaponTypes: {
        melee: 'Melee Weapons',
        assault_rifle: 'Assault Rifles',
        shotgun: 'Shotguns',
        smg: 'SMGs',
        sniper_rifles: 'Sniper Rifles',
        heavy_pistol: 'Heavy Pistols'
      }
    }
  },
  computed: {
    character () {
      const char = this.$store.getters['cb/characters'][this.$route.query.cid] || {}
      return char.character
    },
    classes () {
      return this.$store.getters.getData('classes')
    },
    profs () {
      const startingClass = this.character.classes[0]
      const startingClassData = startingClass && this.classes.find(({ id }) => id === startingClass.id)
      const fromStartingClass = startingClassData && [
        startingClassData.weaponProfs.mandatory.map(name => ({
          name,
          type: 'weapon'
        })),
        startingClassData.armorProfs.mandatory.map(name => ({
          name,
          type: 'armor'
        }))
      ].flat()
      return fromStartingClass
      // return startingClassData
    }
  }
}
</script>
