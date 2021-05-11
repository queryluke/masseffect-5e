<template>
  <v-container>
    <h3>Proficencies</h3>
    <br/>
    <v-row v-for="(profObj, profKey) in profs" :key="profKey">
      <v-col cols="12" v-if="profObj.has || profObj.choices">
        <h4>{{profKey}}</h4>
        <div class="d-flex">
          <template v-for="(startingProf,startProfKey) in profObj.has">
            <v-chip
              :key="startProfKey"
              class="mr-3 mt-5"
            >
              {{startingProf}}
            </v-chip>
          </template>
          <v-autocomplete
            v-if="profObj.choices"
            :items="profObj.choices.items"
            item-text="name"
            item-value="type"
            :label="profObj.text"
            :counter="profObj.choices.count"
            chips
            multiple
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    classIndex: {
      mandatory: true
    }
  },
  methods: {
    writeProps () {
      return false
    }
  },
  computed: {
    character () {
      const char = this.$store.getters['cb/characters'][this.$route.query.cid] || {}
      return char.character
    },
    classes () {
      return this.$store.getters.getData('classes')
    },
    startingClass () {
      return this.character.classes[this.classIndex]
    },
    startingClassData () {
      return this.startingClass && this.classes.find(({ id }) => id === this.startingClass.id)
    },
    profs () {
      return this.startingClassData.profs
    }
  }
}
</script>
