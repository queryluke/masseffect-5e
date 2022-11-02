<template>
  <v-tooltip bottom :disabled="large">
    <template #activator="{ on, attrs }" open-delay="1000">
      <v-btn
        :small="!large"
        :icon="!large"
        :color="isAdded ? 'error' : 'primary'"
        :outlined="large"
        :loading="isLoading"
        v-bind="attrs"
        @click.stop="execute"
        v-on="on"
      >
        <v-icon :left="!large">
          {{ isAdded ? 'mdi-minus' : 'mdi-plus' }}
        </v-icon>
        <span v-if="large">
          {{ isAdded ? 'Remove from' : 'Add to' }} my collection
        </span>
      </v-btn>
    </template>
    {{ isAdded ? 'Remove from' : 'Add to' }} my collection
  </v-tooltip>
</template>

<script>
export default {
  name: 'MeHomebrewAddBtn',
  props: {
    homebrew: {
      type: Object,
      required: true
    },
    large: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      isAdded: false
    }
  },
  async fetch () {
    await this.getItemUse()
  },
  computed: {
    myId () {
      return this.$store.getters['auth/username']
    },
    isLoading () {
      return this.$fetchState.pending || this.loading
    },
    homebrewId () {
      return this.homebrew.id
    },
    mine () {
      return this.homebrew.owner === this.myId
    }
  },
  methods: {
    async getItemUse () {
      const response = await this.$store.dispatch('api/QUERY', { query: 'homebrewUseByUser', variables: { owner: this.myId, filter: { homebrewId: { eq: this.homebrewId } } } })
      this.isAdded = (response?.items || []).length ? response.items[0].id : false
    },
    async execute () {
      this.loading = true
      if (this.isAdded) {
        await this.removeItem()
      } else {
        await this.addItem()
      }
      this.loading = false
    },
    async addItem () {
      const response = await this.$store.dispatch('api/MUTATE', { mutation: 'createHomebrewUse', input: { homebrewId: this.homebrewId, owner: this.myId } })
      await this.$store.dispatch('FETCH_HOMEBREW_DATA')
      this.isAdded = response.id
      this.$emit('added')
    },
    async removeItem () {
      await this.$store.dispatch('api/MUTATE', { mutation: 'deleteHomebrewUse', input: { id: this.isAdded } })
      await this.$store.dispatch('FETCH_HOMEBREW_DATA')
      this.isAdded = false
      this.$emit('removed')
    }
  }
}
</script>
