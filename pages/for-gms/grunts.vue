<template lang="pug">
  v-container
    h2.display-1.hidden-sm-and-down Random Grunt Generator
    p.
      Grunts are disposable NPCs based on the Mass Effect archetypes. The #[em Monster Manual] outlines adjusting
      the provided NPC Archetypes with various races, weapons, and abilities, but this can be rather time consuming.
    p.
      This generator enables you to quickly create random grunts with a given Challenge Rating (CR). CRs only go up to 12
      because higher CRs represent much more powerful monsters. As a point of reference, a Banshee has a CR of 13, so
      a grunt with a CR of 12 would represent a #[em very] experienced and deadly NPC.
    v-card.mt-3
      v-card-text
        v-layout(row wrap)
          v-flex(xs12)
            p.display-1 Options
          v-flex(xs12 sm6 md4).px-2
            v-select(
              v-bind:items="crs"
              v-model="cr"
              label="Select a Challenge Rating"
              item-text="cr"
              item-value="cr"
              return-object
              single-line
              menu-props="bottom"
              hint="Challenge Rating"
              persistent-hint
            )
          v-flex(xs12 sm6 md4).px-2
            v-select(
              v-bind:items="classes"
              v-model="sc"
              label="Select a Class"
              item-text="name"
              item-value="id"
              return-object
              single-line
              menu-props="bottom"
              hint="Class"
              persistent-hint
            )
          v-flex(xs12 sm6 md4).px-2
            v-select(
              v-bind:items="races"
              v-model="race"
              label="Select a Race"
              item-text="name"
              item-value="id"
              return-object
              single-line
              menu-props="bottom"
              hint="Race"
              persistent-hint
            )
          v-flex(xs8 offset-xs2).mt-3
            v-btn(@click="getGrunt()" block color="primary") Generate
    v-container
      v-layout
        v-flex(xs12 sm10 offset-sm1 lg8 offset-lg2)
          v-card(v-if="grunt")
            v-card-text
              stat-block(:stats="grunt")
            v-card-actions
              bookmark-button(:card="grunt" type="npc" v-bind:props="{flat: true}")
</template>

<script>
  import {GruntGenerator} from '~/mixins/grunt_generator'
  import {mapGetters, mapActions} from 'vuex'
  import StatBlock from '~/components/npc/StatBlock.vue'
  import BookmarkButton from '~/components/BookmarkButton.vue'

  export default {
    components: {
      BookmarkButton,
      StatBlock
    },
    created () {
      this.crs = this.getData('statsByCr')

      // Setup races
      this.races = this.getMutableData('races').map((race) => {
        // expand available classes
        race.available_classes = race.available_classes.split(',').map((v) => v.trim())
        return race
      })
      this.races.unshift({id: 'random', name: 'Random'})

      // Setup classes
      this.classes = this.getMutableData('classes')
      this.classes.unshift({id: 'random', name: 'Random'})
    },
    computed: {
      ...mapGetters(['getData', 'getMutableData', 'getGruntConfig']),
      race: {
        get () {
          return this.getGruntConfig('race')
        },
        set (value) {
          this.updateGruntConfig({key: 'race', value})
        }
      },
      sc: {
        get () {
          return this.getGruntConfig('sc')
        },
        set (value) {
          this.updateGruntConfig({key: 'sc', value})
        }
      },
      cr: {
        get () {
          return this.getGruntConfig('cr')
        },
        set (value) {
          this.updateGruntConfig({key: 'cr', value})
        }
      }
    },
    data () {
      return {
        crs: [],
        races: [],
        classes: [],
        grunt: false
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | GM Tools - Grunt Generator',
        meta: [
          { hid: 'description', name: 'description', content: 'Need a quick NPC? Our grunt generator can create millions of NPC combinations in seconds.' }
        ]
      }
    },
    layout: 'phb',
    mixins: [GruntGenerator],
    methods: {
      ...mapActions(['updateGruntConfig']),
      getGrunt () {
        const race = this.race.id === 'random' ? this.randomValue(this.races.filter(race => race.id !== 'random')) : this.race
        const sc = this.sc.id === 'random' ? this.randomValue(this.classes.filter(sc => sc.id !== 'random')) : this.sc
        this.grunt = this.generateGrunt(this.cr, race, sc)
      }
    }
  }
</script>
