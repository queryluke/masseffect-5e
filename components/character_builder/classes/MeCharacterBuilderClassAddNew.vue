<template>
  <div>
    <v-select
      :items="filteredClasses"
      label="Class"
      return-object
      item-text="name"
      v-model="selectedClass"
    ></v-select>
    <v-row>
      <v-col>
        <me-class-tabs
          v-if="selectedClass && $vuetify.breakpoint.smAndUp"
          :id="selectedClass.id"
          :tabs="tabs"
          :value="tab"
          @change="changeTab"
        />
        <div class="classInfoSelect">
          <v-select
            v-if="selectedClass && $vuetify.breakpoint.xs"
            :items="tabs"
            label="Class Info"
            @change="changeTabByIndex"
          ></v-select>
        </div>
        <v-tabs-items v-model="tab" v-if="selectedClass">
          <v-tab-item class="pa-3">
            <me-class-attributes :id="selectedClass.id" />
          </v-tab-item>
          <v-tab-item class="pa-3">
            <me-subclass-feature-list :id="selectedClass.id" />
          </v-tab-item>
          <v-tab-item class="pa-3">
            <me-progression-table :id="selectedClass.id" />
          </v-tab-item>
          <v-tab-item class="pa-3">
            <me-power-list :items="filteredPowers" />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedClass: null,
      tab: null, // so, v-tabs-items uses this as the model. on the class PAGE I use the state of the app
      tabs: ['class features', 'subclasses', 'progression table', 'powers'] // you can adjust these as needed
    }
  },
  methods: {
    changeTab (value) {
      console.log(value)
      this.tab = value
    },
    changeTabByIndex (tabId) {
      this.tab = this.tabs.indexOf(tabId)
    }
  },
  watch: {
    selectedClass (newVal, oldVal) {
      this.$emit('classSelected', {
        selectedClass: this.selectedClass,
        color: {
          back: this.backColor,
          text: this.textColor
        }
      })
      this.$route.params.id = newVal.id
    }
  },
  computed: {
    classes () {
      return this.$store.getters.getData('classes')
    },
    classData () {
      return this.$store.getters.getData('class-features')
    },
    textColor () {
      return this.$store.getters['config/classThemeTabColor'](this.selectedClass.id) || 'primary'
    },
    backColor () {
      return this.$store.getters['config/classThemeTabsColor'](this.selectedClass.id) || 'none'
    },
    chosenClasses: {
      get () {
        return this.$store.getters['cb/characters'][this.$route.query.cid].character.classes
      }
    },
    filteredClasses () {
      const b1 = this.classes
      const b2 = this.chosenClasses
      return b1.filter(item1 => !b2.some(item2 => (item2.id === item1.id && item2.name === item1.name)))
    },
    filteredPowers () {
      return this.$store.getters.getData('powers')
        .filter(i => i.classes.includes(this.selectedClass.id))
        .sort((a, b) => {
          return a.level === b.level
            ? a.id > b.id ? 1 : -1
            : a.level > b.level ? 1 : -1
        })
    }
  }
}
</script>

<style lang="scss">
  .classInfoSelect {
    .v-list-item {
      text-transform: uppercase;
    }
  }
</style>
