<template>
  <div class="d-flex">
    <v-btn x-small text class="px-1" :disabled="viewOnly" @click.stop="remove()">
      <v-icon size="18">
        mdi-minus
      </v-icon>
    </v-btn>
    <div class="px-1">
      <input
        v-model.number="cachedValue"
        :class="textColor"
        :disabled="viewOnly"
        style="width: 30px; text-align: center"
        @focus.stop
        @click.stop
        @input="debouncedUpdate()"
      >
    </div>
    <v-btn x-small text :disabled="viewOnly" @click.stop="add()">
      <v-icon size="18">
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'MeCsActionResourceDisplayOmniGel',
  data () {
    return {
      cachedValue: null,
      max: 999
    }
  },
  computed: {
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    textColor () {
      return this.$vuetify.theme.dark ? 'white--text' : 'grey--text text--darken-4'
    },
    equippedGel () {
      return this.$store.getters['character/equipment/gear'].filter(i => i.id === 'omni-gel')
    },
    current () {
      return this.equippedGel.reduce((a, c) => a + c.uses, 0)
    }
  },
  watch: {
    current (newVal) {
      this.cachedValue = newVal
    }
  },
  created () {
    this.cachedValue = this.current
    this.debouncedUpdate = debounce(() => {
      this.updateAttr()
    }, 500)
  },
  methods: {
    add () {
      if (this.cachedValue + 1 <= this.max) {
        this.cachedValue++
        this.debouncedUpdate()
      }
    },
    remove () {
      if (this.cachedValue - 1 >= 0) {
        this.cachedValue--
        this.debouncedUpdate()
      }
    },
    updateAttr () {
      if (isNaN(parseInt(this.cachedValue, 10))) {
        this.cachedValue = this.current
      }
      if (this.cachedValue >= 0 && this.cachedValue <= this.max) {
        const firstGel = this.equippedGel[0]
        if (!firstGel) {
          this.$store.dispatch('character/equipment/ADD_EQUIPMENT',
            {
              id: 'omni-gel',
              notes: '',
              subType: 'omni_gel',
              type: 'gear',
              uses: this.cachedValue,
              uuid: `omni-gel_${Date.now()}`
            }
          )
        } else {
          this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: firstGel.uuid, replacement: { ...firstGel, uses: this.cachedValue } })
        }
      } else {
        this.cachedValue = this.cachedValue < 0 ? 0 : this.max
      }
    }
  }
}
</script>
