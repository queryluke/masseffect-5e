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
      return this.startingClass && this.classes.find(({ id }) => id === this.startingClass.id)
    },
    weaponProfs () {
      return {
        ...this.startingClassData.profs.weapon,
        title: 'Weapons',
        visible: this.startingClassData.profs.weapon.has.length
      }
    },
    armorProfs () {
      return {
        ...this.startingClassData.profs.armor,
        title: 'Armor'
      }
    },
    toolProfs () {
      return this.startingClassData.profs.tool
    },
    skillProfs () {
      return this.startingClassData.profs.skill
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
