<template>
  <div>
    <div v-if="!viewOnly" class="d-flex justify-center">
      <v-btn :disabled="!saveable" color="primary" :loading="loading" @click="updateAttr()">
        {{ saveable ? 'save' : 'saved' }}
      </v-btn>
    </div>
    <div class="mt-3">
      <v-textarea
        v-model="cachedValue"
        type="number"
        label="Character Notes"
        auto-grow
        dense
        outlined
        hide-details
        :disabled="viewOnly"
        @input="debouncedUpdate()"
      />
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'MeCsNotes',
  data () {
    return {
      cachedValue: null,
      loading: false
    }
  },
  computed: {
    notes () {
      return this.$store.getters['character/character'].notes
    },
    saveable () {
      return this.cachedValue !== this.notes
    },
    viewOnly () {
      return this.$store.state.character.viewOnly
    }
  },
  watch: {
    notes (newVal) {
      if (newVal !== this.cachedValue) {
        this.cachedValue = newVal
      }
    }
  },
  created () {
    this.cachedValue = this.notes
    this.debouncedUpdate = debounce(() => {
      this.updateAttr()
    }, 2000)
  },
  methods: {
    async updateAttr () {
      if (this.cachedValue !== this.notes) {
        this.loading = true
        await this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'notes', value: this.cachedValue })
        this.loading = false
      }
    }
  }
}
</script>
