<template lang="pug">
  v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )
    h2.display-1.hidden-sm-and-down Grenades
    grenade-list.mt-5
</template>

<script>
  import GrenadeList from '~/components/grenade/GrenadeList.vue'

  export default {
    components: { GrenadeList },
    head () {
      return {
        title: 'Mass Effect 5e | Appendix - Grenades & Mines',
        meta: [
          { hid: 'description', name: 'description', content: 'Grenades offer an offensive boost while mines can be used like D&D traps.' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
