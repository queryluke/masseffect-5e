<template>
  <div>
    <h3>Proficencies</h3>
    {{weaponProfs}}
  </div>
</template>

<script>
export default {
  computed: {
    character () {
      const char = this.$store.getters['cb/characters'][this.$route.query.cid] || {}
      return char.character
    },
    classes () {
      return this.$store.getters.getData('classes')
    },
    startingClass () {
      return this.character.classes[0]
    },
    startingClassData () {
      return this.startingClass && this.classes.find(({ name }) => name === this.startingClass.name)
    },
    weaponProfs () {
      return this.startingClassData.weaponProfs
    },
    profs () {
      const fromStartingClass = this.startingClassData && [
        this.startingClassData.weaponProfs.mandatory.map(name => ({
          name,
          type: 'weapon'
        })),
        this.startingClassData.armorProfs.mandatory.map(name => ({
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
