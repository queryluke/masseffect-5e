<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex.xs12
        h2.display-1.hidden-sm-and-down Found Codices
      v-flex.xs12
        p.
          Mass Effect 5e has gathered a substantial following in the past year. This new section collects a number of
          great ideas from the community that have yet to be playtested, an so, are not part of the official system.
          Essentially, this is the Mass Effect 5e version of Unearthed Arcana. If you playtest the following rules and ideas
          pleas #[nuxt-link(to="/contributing") let us know what you think].
      v-flex.xs12
        v-card.elevation-0.transparent
          v-card-title.headline {{ indoc.attributes.name }}
            small.ml-3
              em inspired by Stephen W.
          v-card-text.markdown-content
            markdown-content(:component="indoc.vue")
      v-flex.xs12
        v-card.elevation-0.transparent
          v-card-title.headline {{ pr.attributes.name }}
            small.ml-3
              em by tioeduardo27
          v-card-text.markdown-content
            markdown-content(:component="pr.vue")
      v-flex.xs12.mt-5
        v-card.elevation-0.transparent
          v-card-title.headline {{ weaponStrength.attributes.name }}
            small.ml-3
              em by SleightxHope
          v-card-text.markdown-content
            markdown-content(:component="weaponStrength.vue")

</template>

<script>
  import pr from '~/static/data/community/p_r.md'
  import weaponStrength from '~/static/data/community/weapon_strength.md'
  import indoc from '~/static/data/community/indoctrination.md'
  import RaceInfo from '~/components/race/RaceInfo.vue'

  export default {
    components: {RaceInfo},
    data () {
      return {
        pr,
        weaponStrength,
        indoc
      }
    },
    head () {
      return {
        title: 'Found Codices - Appendix | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'Community rules to try out!' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
