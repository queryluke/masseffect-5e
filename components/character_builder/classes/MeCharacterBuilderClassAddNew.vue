<template>
  <div>
    <h2 class="text-center">Choose a Class</h2>
    <v-select
      :items="filteredClasses"
      label="Classes"
      return-object
      item-text="name"
      v-model="selectedClass"
      solo
    ></v-select>
    <v-row>
      <v-col>
        <x-me-class-page v-if="selectedClass" :custom-id="selectedClass.id" :key="selectedClass.id"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MeClassPage from '~/pages/classes/_id.vue'
export default {
  components: {
    XMeClassPage: MeClassPage
  },
  data () {
    return {
      selectedClass: null
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
        return this.$store.getters['user/character'].classes
      }
    },
    filteredClasses () {
      const b1 = this.classes
      const b2 = this.chosenClasses
      return b1.filter(item1 => !b2.some(item2 => (item2.id === item1.id && item2.name === item1.name)))
    }
  }
}
</script>
