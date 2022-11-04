<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }" open-delay="1000">
      <v-btn
        v-if="!mine && published"
        :small="!large"
        icon
        :color="isVoted ? 'success' : 'grey'"
        :loading="isLoading"
        v-bind="attrs"
        @click.stop="execute"
        v-on="on"
      >
        <v-icon>
          {{ isVoted ? 'mdi-thumb-up' : 'mdi-thumb-up-outline' }}
        </v-icon>
      </v-btn>
    </template>
    {{ isVoted ? 'Remove vote' : 'Up vote' }}
  </v-tooltip>
</template>

<script>
export default {
  name: 'MeHomebrewVoteBtn',
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
      isVoted: false
    }
  },
  async fetch () {
    await this.getItemVote()
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
    },
    published () {
      return !!this.homebrew.published
    }
  },
  methods: {
    async getItemVote () {
      const response = await this.$store.dispatch('api/QUERY', { query: 'homebrewVoteByUserByHomebrew', variables: { owner: this.myId, homebrewId: { eq: this.homebrewId } } })
      this.isVoted = (response?.items || []).length ? response.items[0].id : false
    },
    async execute () {
      this.loading = true
      if (this.isVoted) {
        await this.removeVote()
      } else {
        await this.addVote()
      }
      this.loading = false
    },
    async addVote () {
      const response = await this.$store.dispatch('api/MUTATE', { mutation: 'createHomebrewVote', input: { homebrewId: this.homebrewId, owner: this.myId } })
      this.isVoted = response.id
      this.$emit('voted')
    },
    async removeVote () {
      await this.$store.dispatch('api/MUTATE', { mutation: 'deleteHomebrewVote', input: { id: this.isVoted } })
      this.isVoted = false
      this.$emit('voteRemoved')
    }
  }
}
</script>
