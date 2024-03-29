<template>
  <v-card elevation="2" class="my-1" @click="open = !open">
    <div class="d-flex justify-space-between align-center">
      <div class="d-flex align-center ml-1">
        <v-icon v-if="!isLastEntry" color="primary">
          mdi-chevron-{{ show ? 'up' : 'down' }}
        </v-icon>
        <div class="ml-1 text-body-2 text-capitalize">
          {{ data.detail }}{{ type ? `: ${type}` : '' }}
        </div>
      </div>
      <div class="text-h5 ma-1 mr-2">
        {{ data.total }}
      </div>
    </div>
    <div v-if="data.subDetail" class="text-caption ml-2 mt-n2 font-italic">
      {{ data.subDetail }}
    </div>

    <v-expand-transition>
      <div v-show="show" class="justify-space-between transition-ease-in-out">
        <!-- Machine Readable Results -->
        <div v-if="data.mrResults" class="mx-2 d-flex">
          <v-icon size="26" class="mr-2">
            mdi-dice-multiple
          </v-icon>
          <div class="flex-grow-1">
            <template v-for="(result, index) of data.mrResults" class="d-flex mx-3 align-center font-weight-medium" style="font-size: 1.2em">
              <me-cs-roll-group-entry
                v-if="typeof result === 'object'"
                :key="`roll-group-entry-${index}`"
                :roll-group="result"
                :show-subtotals="data.mrResults.length > 1"
                :index="index"
                :types="entry.data.type"
              />
            </template>
          </div>
        </div>
        <!-- Old Results -->

        <!-- old results -->
        <div v-else class="d-flex mx-2">
          <v-icon size="26">
            mdi-dice-multiple
          </v-icon>
          <div>
            {{ data.results }}
          </div>
        </div>
        <div class="mx-3 my-1 text-body-2">
          {{ data.text || data.notation }}
        </div>
        <v-divider />
        <v-card-actions>
          <me-cs-logs-roll-next-roll v-for="(roll, index) of entry.nextRolls" :key="`add-roll-${index}`" :next-roll="roll" />
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
    },
    type () {
      if (this.entry?.data?.type) {
        return typeof this.entry.data.type === 'object' ? this.entry.data.type.join(', ') : this.entry.data.type
      }
      return null
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
    reroll () {
      const payload = {
        detail: this.data.detail,
        type: this.data.type,
        notation: this.data.notation,
        text: this.data.text,
        nextRolls: this.entry.nextRolls
      }
      this.$store.dispatch('character/roller/ROLL', payload)
    }
  }
}
</script>
