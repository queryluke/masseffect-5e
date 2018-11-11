<template lang="pug">
  v-container
    h2.display-1.hidden-sm-and-down Creating Armor
    creating-armor
</template>

<script>
  import CreatingArmor from '~/components/CreatingArmorInfo'

  export default {
    components: { CreatingArmor },
    head () {
      return {
        title: 'Mass Effect 5e | For GMs - Customizing Armor',
        meta: [
          { hid: 'description', name: 'description', content: 'Learn how to create new armor sets and mods' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
