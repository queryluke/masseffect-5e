<template>
  <div>
    <h2 class="text-center">Choose a Class</h2>
    <me-character-builder-level-tracker :level="level" :c-prog="cProg"/>
    <v-row>
      <v-col>
        <v-expansion-panels v-if="classData">
          <v-expansion-panel
            v-for="(item, index) in classData"
            :key="item.id"
          >
            <v-expansion-panel-header>
              {{item.name + (item.subclass ? ' (' + item.subclass + ')' : '')}}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <me-character-builder-class-level
                :class-index="index"
                :character-level="level"
                :class-data="item"
                @deleteClass="removeClass(item, index)"
              />
              {{'item: '}}{{item}}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <div class="text-center">
          <v-dialog
            v-model="dialog"
            width="100%"
            scrollable
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                v-bind="attrs"
                v-on="on"
                v-if="classData.length < classes.length"
              >
                Add New Class
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                Choose Class
              </v-card-title>

              <v-card-text>
                <me-character-builder-class-add-new
                  :key="classData.length"
                  @classSelected="function(val) {
                    selectedClass = val.selectedClass;
                    addBtnColor = {
                      back: val.color.back,
                      text: val.color.text
                    }
                  }"
                />
                {{addBtnColor}}
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-btn
                  :color="addBtnColor.back != 'none' ? addBtnColor.text : addBtnColor.back"
                  :class="addBtnColor.text+'--text'"
                  v-if="selectedClass.name"
                  :text="addBtnColor.back == 'none' "
                  @click="addClassToCharacter()"
                >
                  Add {{selectedClass.name}} Class
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="red"
                  text
                  @click="dialog = false"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
    <v-col>
      <div v-for="item in classData" :key="item.id">
        {{item}}
      </div>
    </v-col>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      deleteClassDialog: {},
      selectedClass: {},
      addBtnColor: {
        back: 'primary',
        text: 'primary--text'
      }
    }
  },
  methods: {
    cleanSelectedClass () {
      const sc = this.selectedClass
      const payload = { // variables to write to the character object for the character sheet
        id: sc.id,
        name: sc.name,
        subclass: '',
        hitPoints: [sc.hitDice],
        levels: 1
      }
      return payload
    },
    addClassToCharacter () {
      this.dialog = false
      const tempArr = this.classData.slice()
      tempArr.push(this.cleanSelectedClass())
      this.classData = tempArr
      this.selectedClass = {}
    },
    removeClass (item, index) {
      this.deleteClassDialog[item.id] = false
      const tempArr = this.classData.slice()
      tempArr.splice(index, 1)
      this.classData = tempArr
    },
    sortByLevels (a, b) {
      if (a.level < b.level) {
        return -1
      }
      if (a.level > b.level) {
        return 1
      }
      return 0
    }
  },
  computed: {
    classes () {
      return this.$store.getters.getData('classes')
    },
    classData: {
      get () {
        return this.$store.getters['user/character'].classes
      },
      set (value) {
        this.$store.commit('user/UPDATE_CHARACTER', {
          attr: 'classes',
          value
        })
      }
    },
    level () {
      let level = 0
      for (const item of this.classData) {
        level += item.levels
      }
      return level
    },
    cProg () {
      const progArr = [...this.$store.getters.getData('character-progression')]
      return progArr.sort(this.sortByLevels)
    },
    currentLevelInfo () {
      return this.cProg[this.level - 1]
    }
  }
}
</script>
