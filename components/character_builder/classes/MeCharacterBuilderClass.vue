<template>
  <div>
    <h2 class="text-center">Choose a Class</h2>
    <v-row class="text-center">
      <v-col>
        Current Level: {{xp || "None"}}
      </v-col>
      <v-col>
        Current Experience: {{level || 0}}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <!--me-class-feature-list level="1" classId="adept"/-->
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
        {{item.id}}
      </div>
      {{classData}}
    </v-col>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      selectedClass: {},
      addBtnColor: {
        back: 'primary',
        text: 'primary--text'
      }
    }
  },
  methods: {
    addClassToCharacter () {
      this.dialog = false
      const tempArr = JSON.parse(JSON.stringify(this.classData))
      tempArr.push(this.selectedClass)
      this.classData = tempArr
      this.selectedClass = {}
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
        console.log('saving classData to character', value)
        this.$store.commit('user/UPDATE_CHARACTER', {
          attr: 'classes',
          value
        })
      }
    },
    xp: {
      get () {
        return this.$store.getters['user/character'].xp
      }
    },
    level: {
      get () {
        return this.$store.getters['user/character'].level
      }
    }
  }
}
</script>
