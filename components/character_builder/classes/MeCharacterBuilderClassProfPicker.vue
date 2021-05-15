<template>
  <v-container>
    <h3>Proficencies</h3>
    <br/>
    <v-row v-for="(profObj, profKey) in profs" :key="profKey">
      <v-col cols="12" v-if="profObj.has || profObj.choices">
        <h4>{{profTitles[profKey] || profKey}}</h4>
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
            item-text="text"
            item-value="value"
            :items="profsAsItems[profKey]"
            :label="profObj.text"
            :counter="profObj.choices.count"
            chips
            multiple
            @change="writeProps($event, profObj, profKey)"
            v-model="profSelectModel[profKey]"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      profTitles: {
        armor: 'Armor',
        tool: 'Tools',
        weapon: 'Weapons',
        skill: 'Skills',
        savingThrow: 'Saving Throws'
      }
    }
  },
  props: {
    classIndex: {
      mandatory: true
    }
  },
  methods: {
    writeProps (selectedProfs, profObj, profKey) {
      const mandProfs = profObj.has ? profObj.has : []
      const newProfs = selectedProfs.concat(mandProfs)
      const newProfObj = {}
      for (const prof in newProfs) {
        newProfObj[newProfs[prof]] = {
          expert: false
        }
      }
      this.profs = {
        type: profKey,
        profs: newProfObj
      }
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
    selectedClassProfs: {
      get () {
        return this.character.classes[this.classIndex].profs
      }
    },
    profSelectModel () {
      const model = {}
      for (const p in this.selectedClassProfs) {
        const t = this.selectedClassProfs[p]
        for (const v in t) {
          console.log(v, 'ignore me')
          model[p] = []
          for (const key in Object.keys(t)) {
            model[p].push({
              value: Object.keys(t)[key],
              text: Object.keys(t)[key].toUpperCase()
            })
          }
        }
      }
      return model
    },
    startingClass () {
      return this.character.classes[this.classIndex]
    },
    startingClassData () {
      return this.startingClass && this.classes.find(({ id }) => id === this.startingClass.id)
    },
    profs: {
      get () {
        return this.startingClassData.profs
      },
      set (value) {
        return this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.$route.query.cid,
          attr: 'classes.' + this.classIndex.toString() + '.profs.' + value.type.toString(),
          value: value.profs
        })
      }
    },
    profsAsItems () {
      const o = {}
      for (const prof in this.profs) {
        o[prof] = []
        if (this.profs[prof].choices && this.profs[prof].choices.items) {
          this.profs[prof].choices.items.forEach(function (c) {
            o[prof].push({
              text: c.toUpperCase(),
              value: c
            })
          })
        }
      }
      return o
    }
  }
}
</script>
