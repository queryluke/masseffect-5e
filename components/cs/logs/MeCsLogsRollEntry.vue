<template>
  <v-card elevation="2" class="my-1" @click="open = !open">
    <div class="d-flex justify-space-between align-center">
      <div class="d-flex align-center ml-1">
        <v-icon v-if="!isLastEntry" color="primary">
          mdi-chevron-{{ show ? 'up' : 'down' }}
        </v-icon>
        <div class="ml-1 text-body-2 text-capitalize">
          {{ data.detail }}: {{ data.type }}
        </div>
      </div>
      <div class="text-h5 ma-1 mr-2">
        {{ data.total }}
      </div>
    </div>

    <v-expand-transition>
      <div v-show="show" class="justify-space-between transition-ease-in-out">
        <v-list dense>
          <v-list-item dense>
            <v-list-item-icon>
              <v-icon>
                mdi-dice-multiple
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ data.notation }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense>
            <v-list-item-icon>
              <v-icon>
                mdi-equal
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold text-subtitle-1">
                {{ data.results }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-card-actions>
          <!-- TODO: color based on next roll -->
          <v-btn
            v-for="(roll, index) of entry.nextRolls"
            :key="`add-roll-${index}`"
            text
            small
            color="red darken-4"
            @click.stop="makeNextRoll(index)"
          >
            {{ roll.text }}
          </v-btn>
          <v-spacer />
          <v-btn text small color="primary" @click.stop="reroll()">
            reroll
          </v-btn>
        </v-card-actions>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>

export default {
  props: {
    entry: {
      type: Object,
      default: () => {}
    },
    isLastEntry: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      data: this.entry.data || {},
      open: false
    }
  },
  computed: {
    show () {
      return this.open || this.isLastEntry
    }
  },
  watch: {
    isLastEntry (newVal) {
      if (newVal === false) {
        this.open = false
      }
    }
  },
  methods: {
    makeNextRoll (index) {
      const nextRoll = this.entry.nextRolls[index]?.roll
      if (nextRoll?.notation) {
        this.$store.dispatch('character/roller/ROLL', nextRoll)
      }
    },
    reroll () {
      const payload = {
        detail: this.data.detail,
        type: this.data.type,
        notation: this.data.notation
      }
      this.$store.dispatch('character/roller/ROLL', payload)
    }
  }
}
</script>
