<template>
  <div>
    <v-row>
      <v-col>
        <h3>Hit Points</h3>
      </v-col>
    </v-row>
    <v-row class="hpSlots">
      <v-col
        cols="2"
      >
        <v-select
          :items="hpArray"
          :value="hitPoints[0]"
          label="Lvl. 1"
          readonly
        />
      </v-col>
      <v-col
        cols="2"
        v-for="(hp, index) in [...hitPoints].splice(1)"
        :key="index"
      >
        <v-select
          :items="hpArray"
          :value="[...hitPoints][index+1]"
          :label="'Lvl. ' + (index+2)"
          @change="updateHpField(index, $event)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    classIndex: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    getClassById (inputClass) {
      return (inputClass.id === this.id || inputClass.class === this.id)
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
      const tempArr = [...this.hitPoints]
      tempArr[index + 1] = value
      this.hitPoints = tempArr
    }
  },
  computed: {
    hitDie () {
      return this.$store.getters.getData('classes').find(this.getClassById).hitDie
    },
    hitPoints: {
      get () {
        return this.$store.getters['cb/characters'][this.$route.query.cid].character.classes[this.classIndex].hitPoints
      },
      set (value) {
        return this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.$route.query.cid, attr: 'classes.' + this.classIndex.toString() + '.hitPoints', value })
      }
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
