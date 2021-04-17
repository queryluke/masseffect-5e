<template>
  <div>
    <v-row>
      <v-col cols="8" v-if="level >= subclassData.first">
        <h3>Choose a Subclass</h3>
        <v-select
          :items="subclassData.list"
          return-object
          item-text="name"
          label="Subclass"
          v-model="charSubclass"
        />
      </v-col>
      <v-col v-if="charSubclass" cols="4">
        <v-btn>View Subclass Details</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h3>{{classData.name}} Features (Class)</h3>
        <me-expansion-list
          :items="featureData.classItems"
          :headers="featureData.headers"
          :bookmarkable="false"
          :linkable="false"
          :show-bar="false"
        />
      </v-col>
    </v-row>
    <v-row v-if="featureData.subclassItems.length">
      <v-col>
        <h3>{{charSubclass.name}} Features (Subclass)</h3>
        <me-expansion-list
          :items="featureData.subclassItems"
          :headers="featureData.headers"
          :bookmarkable="false"
          :linkable="false"
          :show-bar="false"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MeExpansionList from '~/components/MeExpansionList.vue'
export default {
  components: { MeExpansionList },
  props: {
    classIndex: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      requried: true
    }
  },
  methods: {
    cleanSubclass (level) {
      if (level < this.subclassData.first) {
        this.charSubclass = undefined
      }
    },
    filterById (_inputData) {
      return (_inputData.id === this.id)
    },
    filterByClass (_inputData) {
      return (_inputData.klass === this.id)
    },
    filterBySubclass (_inputData) {
      return (this.charSubclass && _inputData.subclass === this.charSubclass.id)
    },
    filterByLevel (_inputData) {
      return (_inputData.level <= this.level)
    }
  },
  computed: {
    classData () {
      return this.$store.getters.getData('classes').find(this.filterById)
    },
    subclassData () {
      console.log(this.classData)
      return {
        list: this.$store.getters.getData('subclasses').filter(this.filterByClass),
        levels: this.classData.progression.subclass,
        first: this.classData.progression.subclass[0]
      }
    },
    featureData () {
      const cfd = this.$store.getters.getData('class-features')
        .filter(this.filterByClass)
        .filter(this.filterByLevel)
        .sort((a, b) => (a.level > b.level) ? 1 : -1)
      const scfd = cfd.filter(this.filterBySubclass)
      return {
        classItems: cfd.filter(function (_cfd) { // filter out anything with a subclass tab
          return _cfd.subclass === undefined
        }),
        subclassItems: scfd,
        headers: [
          { label: 'Name', key: 'name' }
        ]
      }
    },
    charSubclass: {
      get () {
        return this.$store.getters['cb/characters'][this.$route.query.cid].character.classes[this.classIndex].subclass
      },
      set (value) {
        return this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.$route.query.cid, attr: 'classes.' + this.classIndex.toString() + '.subclass', value })
      }
    }
  }
}
</script>
