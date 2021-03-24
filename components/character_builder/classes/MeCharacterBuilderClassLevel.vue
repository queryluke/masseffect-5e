<template>
  <div>
    <div class="d-flex align-center flex-wrap">
      <v-btn class="mr-2" :href="'/classes/'+classData.id"  target="_blank">View Class Details</v-btn>
      <v-select
        class="ms-2 flex"
        :items="levelArray"
        v-model="levels"
        label="Number of levels in this class"
        @change="cleanSubclass"
      />
      <me-character-builder-class-delete
        :item="classData"
        :index="classIndex"
        v-on="$listeners"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    classIndex: {
      type: Number,
      required: true
    },
    classData: {
      type: Object,
      required: true
    },
    characterLevel: {
      type: Number,
      required: false
    }
  },
  methods: {
    cleanSubclass (level) {
      if (level < this.subclassInfo.first) {
        this.charSubclass = undefined
      }
    },
    getClassById (inputClass) {
      return (inputClass.id === this.classData.id || inputClass.class === this.classData.id)
    },
    setHpSlots (level) {
      const hpLength = this.hitPoints.length
      const tempArr = [...this.hitPoints] // mutate this then reassign to the vuex store var
      if (level > hpLength) {
        for (let i = 0; i < level - hpLength; i++) {
          tempArr.push(Math.floor(this.hitDie / 2) + 1)
        }
      } else if (level < hpLength) {
        tempArr.splice(level)
      } else {
        return
      }
      this.hitPoints = tempArr
    },
    updateHpField (index, value) {
      // console.log(index + 1, value)
      const tempArr = [...this.hitPoints]
      tempArr[index + 1] = value
      this.hitPoints = tempArr
    }
  },
  computed: {
    levels: {
      get () {
        return this.$store.getters['cb/characters'][this.$route.query.cid].character.classes[this.classIndex].levels
      },
      set (value) {
        this.setHpSlots(value)
        return this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.$route.query.cid, attr: 'classes.' + this.classIndex.toString() + '.levels', value })
      }
    },
    classInfo () {
      return this.$store.getters.getData('classes').find(this.getClassById)
    },
    subclassInfo () {
      return {
        list: this.$store.getters.getData('subclasses').filter(this.getClassById),
        levels: this.classInfo.subclassProgression,
        first: this.classInfo.subclassProgression.level[0]
      }
    },
    charSubclass: {
      get () {
        return this.$store.getters['cb/characters'][this.$route.query.cid].character.classes[this.classIndex].subclass
      },
      set (value) {
        return this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.$route.query.cid, attr: 'classes.' + this.classIndex.toString() + '.subclass', value })
      }
    },
    hitDie () {
      return this.classInfo.hitDice
    },
    hitPoints: {
      get () {
        return this.$store.getters['cb/characters'][this.$route.query.cid].character.classes[this.classIndex].hitPoints
      },
      set (value) {
        return this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.$route.query.cid, attr: 'classes.' + this.classIndex.toString() + '.hitPoints', value })
      }
    },
    levelArray () {
      const posLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      return posLevels.slice(0, posLevels.length - this.characterLevel + this.levels)
    },
    hpArray () {
      const hpArr = []
      for (let i = 1; i <= this.hitDie; i++) {
        hpArr.push(i)
      }
      return hpArr
    }
  }
}
</script>
