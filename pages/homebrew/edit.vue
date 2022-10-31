<template>
  <v-container style="max-width: 1200px">
    <div v-if="!isAuthenticated">
      <p>
        You must sign in to view, edit, and create homebrew
      </p>
      <v-btn @click="$store.dispatch('auth/LOG_IN', $nuxt.$route.path)">
        Sign In
      </v-btn>
    </div>
    <div v-else-if="!item">
      <p>
        We couldn't find this homebrew
      </p>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="8">
          <div class="d-flex mb-5">
            <me-tpg s="h3">
              {{ title }}
            </me-tpg>
            <v-chip class="ml-2" :color="typeColor">
              {{ typeName }}
            </v-chip>
          </div>
        </v-col>
        <v-col class="text-right" cols="4">
          <v-btn large to="/homebrew/my-homebrew" exact>
            My Homebrew
          </v-btn>
        </v-col>
      </v-row>
      <v-card flat outlined>
        <component :is="form" :item="itemData" @update="itemData = $event" />
        <me-homebrew-editor-actions :saving="saving" :publication-status="item.publicationStatus" @save="updateData" @updateStatus="updateStatus($event)" />
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  async asyncData ({ store, route, redirect }) {
    if (!route.query.id) {
      redirect('/homebrew')
    }
    let item = false
    try {
      item = await store.dispatch('api/QUERY', { query: 'getHomebrew', variables: { id: route.query.id } })
      if (item) {
        item.data = JSON.parse(item.data)
      }
    } catch (e) {
      console.error(e)
    }
    console.log(item)
    return { item }
  },
  data () {
    return {
      saving: false
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated']
    },
    type () {
      return this.item.model
    },
    typeName () {
      return {
        powers: 'Power'
      }[this.type]
    },
    typeColor () {
      return {
        powers: 'purple'
      }[this.type]
    },
    form () {
      return `me-homebrew-form-${this.type}`
    },
    titleId () {
      return this.item.titleId
    },
    title () {
      return this.item.title
    },
    itemData: {
      get () {
        return this.item.data
      },
      set (value) {
        this.item.data = value
      }
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: this.item?.title,
      description: 'Community created homebrew'
    })
  },
  methods: {
    async updateData () {
      this.saving = true
      const input = {
        id: this.item.id,
        data: JSON.stringify(this.itemData)
      }
      await this.$store.dispatch('api/MUTATE', { mutation: 'updateHomebrew', input })
      this.saving = false
    },
    async updateStatus (status) {
      this.saving = true
      const input = {
        id: this.item.id,
        publicationStatus: status
      }
      const newItem = await this.$store.dispatch('api/MUTATE', { mutation: 'updateHomebrew', input })
      newItem.data = JSON.parse(newItem.data)
      this.item = newItem
      this.saving = false
    }
  }
}
</script>