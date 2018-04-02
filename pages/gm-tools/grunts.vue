<template lang="pug">
  div
    h2.display-3 Grunt Generator
    p.
      Grunts are disposable NPCs based on the Mass Effect archetypes. The #[em Monster Manual] outlines adjusting
      the provided NPC Archetypes with various races, weapons, and abilities. But this can be rather time consuming.
    p.
      This generator enables you to quickly create random grunts with a given Challenge Rating (CR). CRs only go up to 12
      because higher CRs are represent much more powerful monsters. As a point of reference, a Banshee has a CR of 10, so
      a grunt with a CR of 12 would represent a very experienced and deadly NPC.
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
              bottom
              hint="Challenge Rating"
              persistent-hint
            )
          v-flex(xs12 sm6 md4).px-2
            v-select(
              v-bind:items="classOptions"
              v-model="sc"
              label="Select a Class"
              item-text="name"
              item-value="id"
              return-object
              single-line
              bottom
              hint="Class"
              persistent-hint
            )
          v-flex(xs12 sm6 md4).px-2
            v-select(
              v-bind:items="raceOptions"
              v-model="race"
              label="Select a Race"
              item-text="name"
              item-value="id"
              return-object
              single-line
              bottom
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
  import StatBlock from '~/components/shared/StatBlock.vue'
  import BookmarkButton from '~/components/shared/BookmarkButton.vue'

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

      // Setup classes
      this.classes = this.getMutableData('classes')
    },
    computed: {
      ...mapGetters(['getData', 'getMutableData', 'getGruntConfig']),
      classOptions () {
        let classOptions = this.filterClasses(this.race.id)
        classOptions.sort(this.compare)
        classOptions.unshift({ id: 'random', name: 'Random' })
        classOptions.push({ id: 'none', name: 'None' })
        if (!classOptions.map((co) => co.id).includes(this.sc.id)) {
          this.sc = classOptions[0]
        }
        return classOptions
      },
      raceOptions () {
        let raceOptions = this.filterRaces(this.sc.id)
        raceOptions.sort(this.compare)
        raceOptions.unshift({ id: 'random', name: 'Random' })
        if (!raceOptions.map((ro) => ro.id).includes(this.race.id)) {
          this.race = raceOptions[0]
        }
        return raceOptions
      },
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
          { hid: 'description', name: 'description', content: 'Create Grunts' }
        ]
      }
    },
    layout: 'phb',
    mixins: [GruntGenerator],
    methods: {
      ...mapActions(['updateGruntConfig']),
      saveGrunt (grunt) {
        this.$store.commit('addEncounterNpc', grunt)
      },
      filterClasses (raceId) {
        return this.classes.filter(aClass => {
          if (raceId === 'random') {
            return true
          }
          return this.races.find((race) => { return race.id === raceId }).available_classes.includes(aClass.name)
        })
      },
      filterRaces (classId) {
        return this.races.filter(race => {
          if (classId === 'random') {
            return true
          }
          const regex = new RegExp(classId, 'gi')
          return regex.test(race.available_classes)
        })
      },
      compare (a, b) {
        let comparison = 0
        if (a.name > b.name) {
          comparison = 1
        } else if (b.name > a.name) {
          comparison = -1
        }
        return comparison
      },
      getGrunt () {
        // Get the race
        let race = {}
        if (this.race.id === 'random') {
          if (this.sc.id === 'random' || this.sc.id === 'none') {
            race = this.randomValue(this.races)
          } else {
            const races = this.filterRaces(this.sc.id)
            race = this.randomValue(races)
          }
        } else {
          race = this.race
        }

        // Get the class
        let sc = {}
        if (this.sc.id === 'random') {
          const classes = this.filterClasses(race.id)
          sc = this.randomValue(classes)
        } else {
          sc = this.sc
        }
        this.grunt = this.generateGrunt(this.cr, race, sc)
      }
    }
  }
</script>
