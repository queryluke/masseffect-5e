<template>
  <div>
    {{profs}}
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
