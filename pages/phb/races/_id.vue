<template lang="pug">
  v-container(fluid)
    v-layout(row wrap)
      v-flex.xs12.md9
        v-layout(row)
          v-flex(xs12 md8)
            h2.display-3 {{ race.name }}
          v-flex(md4).text-xs-right.hidden-sm-and-down
            v-menu
              v-btn(slot="activator" dark)
                span Change Race
                v-icon arrow_drop_down
              v-list
                v-list-tile(v-for="item in races" v-bind:key="item" v-bind="{to: { name: 'phb-races-id', params: { id: item }}}")
                  v-list-tile-title {{ item | fidtt }}
        race-info(:race="race")
      v-flex.hidden-sm-and-down.md3
        v-img(:src="race.bodyImg" height="80vh" contain)
        p(v-if="id == 'prothean'").text-xs-center #[small #[em image courtesy of JTickner]]
</template>

<script>
import { mapGetters } from 'vuex'
import RaceInfo from '~/components/race/RaceInfo.vue'

export default {
  components: { RaceInfo },
  data () {
    const race = require(`~/static/data/races/${this.$route.params.id}.md`)
    return {
      race: race.attributes,
      id: this.$route.params.id
    }
  },
  computed: {
    ...mapGetters(['races'])
  },
  head () {
    return {
      title: `${this.race.name} - Races | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: this.race.snippet }
      ]
    }
  },
  layout: 'phb'
}
</script>
