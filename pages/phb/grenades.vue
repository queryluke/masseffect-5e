<template lang="pug">
  v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )
    h2.display-1.hidden-sm-and-down Grenades
    p #[nuxt-link(to="/phb/rules/equipment#grenades") Grenade Rules]
    grenade-list.mt-5
</template>

<script>
  import GrenadeList from '~/components/grenade/GrenadeList.vue'

  export default {
    components: { GrenadeList },
    head () {
      return {
        title: 'Grenades & Mines - Appendix | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'Grenades offer an offensive boost while mines can be used like D&D traps.' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
