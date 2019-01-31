<template lang="pug">
  v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )

    div.text-md-right
      v-btn(to="/phb/rules/equipment#grenades" nuxt outline color="secondary") Grenade Rules

    div.mb-5.hidden-sm-and-down
      h2.display-1 Grenades
      div.hr.mb-5

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
