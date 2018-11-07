<template lang="pug">
  v-container(fluid)
    v-layout(row wrap)
      v-flex.xs12.md9
        h2.display-3 {{ race.name }}
        race-info(:race="race")
      v-flex.hidden-sm-and-down.md3
        v-img(:src="race.bodyImg" height="80vh")
        p(v-if="id == 'prothean'").text-xs-center #[small #[em image courtesy of JTickner]]
</template>

<script>
  import RaceInfo from '~/components/race/RaceInfo.vue'
  export default {
    components: {RaceInfo},
    data () {
      const race = require(`~/static/data/races/${this.$route.params.id}.md`)
      return {
        race: race.attributes,
        id: this.$route.params.id
      }
    },
    head () {
      return {
        title: `Mass Effect 5e | Races - ${this.race.name}`,
        meta: [
          { hid: 'description', name: 'description', content: `Learn more about the ${this.race.name} race, including alignment, available classes, and racial traits` }
        ]
      }
    },
    layout: 'phb'
  }
</script>
