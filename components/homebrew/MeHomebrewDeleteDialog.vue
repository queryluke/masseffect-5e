<template>
  <v-dialog :value="show" max-width="500">
    <v-card :loading="loading">
      <v-card-title>
        <span v-if="inUse">
          You're homebrew is in use!!
        </span>
        <span v-else>
          Are you sure you want to delete <em>{{ item.title }}</em>?
        </span>
      </v-card-title>
      <v-card-text>
        <div v-if="inUse">
          <p>
            Deleting your homebrew while it is in use could disrupt others' games. Because your homebrew is published or in development, we
            don't allow deletions.
          </p>
          <p>
            However, we will be working on a feature to allow deleting published homebrew
            by turning in into an anonymous submission and removing it from the community list. Meaning, people will no longer
            be able to discover it nor will it be associated with your account. But those who are currently using it
            will not be disrupted.
          </p>
        </div>
        <div v-else>
          Deleting this homebrew will completely remove all data and it will not be recoverable. If you wish to continue,
          click the 'Delete Homebrew' button.
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="$emit('close')">
          Cancel
        </v-btn>
        <v-spacer />
        <v-btn v-if="!inUse" color="error" text :loading="loading" @click="deleteHomebrew">
          Delete Homebrew
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'MeHomebrewDeleteDialog',
  props: {
    item: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selfInUse: false,
      loading: false
    }
  },
  async fetch () {
    await this.checkSelfInUse()
    this.loading = false
  },
  computed: {
    id () {
      return this.item.id
    },
    myId () {
      return this.$store.getters['auth/username']
    },
    inUse () {
      return this.item.status !== 'private' && this.item.usageCount > 0 && !this.selfInUse
    },
    title () {
      if (this.item.usageCount > 0) {
        return 'Your homebrew is in use!'
      } else {
        return `Are you sure you want to delete ${this.item.title}?`
      }
    }
  },
  methods: {
    async deleteHomebrew () {
      this.loading = true
      await this.checkSelfInUse()
      if (this.inUse) {
        return
      }
      await this.$store.dispatch('api/MUTATE', { mutation: 'deleteHomebrew', input: { id: this.item.id } })
      this.loading = false
      this.$emit('deleted')
    },
    async checkSelfInUse () {
      this.loading = true
      if (this.item.usageCount === 1) {
        const usage = await this.$store.dispatch('api/QUERY', { query: 'listHomebrewUses', variables: { filter: { homebrewId: { eq: this.item.id } } } })
        const firstUsage = usage.items[0]
        if (firstUsage.owner === this.myId) {
          this.selfInUse = true
        }
      }
    }
  }
}
</script>
