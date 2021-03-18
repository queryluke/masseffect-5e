<template>
  <div>
    <div class="d-flex align-center flex-wrap">
      <v-btn class="mr-2">View Class Details</v-btn>
      <v-btn>View Subclass Details</v-btn>
      <v-select
        class="ms-2 flex"
        :items="levelArray"
        v-model="levels"
        label="Number of levels in this class"
      />
      <me-character-builder-class-delete
        :item="classData"
        :index="classIndex"
        v-on="$listeners"
      />
    </div>
    <v-row>
      <v-col>
        <h3>Hit Points</h3>
      </v-col>
    </v-row>
    <v-row class="hpSlots">
      <v-col
        sm="1"
      >
        <v-select
          :items="hpArray"
          :value="hitPoints[0]"
          label="Lvl. 1"
          readonly
        />
      </v-col>
      <v-col
        sm="1"
        v-for="(hp, index) in [...hitPoints].splice(1)"
        :key="index"
      >
        <!-- TODO: Fix this v-model call to not directly modify the vuex store prop -->
        <v-select
          :items="hpArray"
          :value="[...hitPoints][index+1]"
          :label="'Lvl. ' + (index+2)"
          @change="updateHpField(index, $event)"
        />
      </v-col>
    </v-row>
    {{'hitPoints: '}}{{hitPoints}}
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
    getClassById (inputClass) {
      return inputClass.id === this.classData.id
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
      console.log(index + 1, value)
      const tempArr = [...this.hitPoints]
      tempArr[index + 1] = value
      this.hitPoints = tempArr
    }
  },
  computed: {
    levels: {
      get () {
        return this.$store.getters['user/character'].classes[this.classIndex].levels
      },
      set (value) {
        this.setHpSlots(value)
        return this.$store.commit('user/UPDATE_CHARACTER', { attr: 'classes.' + this.classIndex.toString() + '.levels', value })
      }
    },
    hitDie () {
      return this.$store.getters.getData('classes').find(this.getClassById).hitDice
    },
    hitPoints: {
      get () {
        return this.$store.getters['user/character'].classes[this.classIndex].hitPoints
      },
      set (value) {
        return this.$store.commit('user/UPDATE_CHARACTER', { attr: 'classes.' + this.classIndex.toString() + '.hitPoints', value })
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

<style lang="scss">
  .hpSlots {
    .v-input {
      // width: 50px;
    }
  }
</style>
