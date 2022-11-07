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
        <v-col class="justify-end d-flex" cols="4">
          <div class="mx-3">
            <v-btn large color="error" @click="confirmDeleteDialog = true">
              <v-icon left>
                mdi-delete
              </v-icon>
              Delete
            </v-btn>
          </div>
          <v-btn large to="/homebrew/my-homebrew" exact>
            My Homebrew
          </v-btn>
        </v-col>
      </v-row>
      <v-card flat outlined :loading="saving">
        <component :is="form" :item="itemData" @update="update($event)" @updateTitle="updateTitle" />
        <me-homebrew-editor-actions :saving="saving" :publication-status="publicationStatus" @save="updateData" @updateStatus="updateStatus($event)" />
      </v-card>
    </div>
    <me-homebrew-delete-dialog :show="confirmDeleteDialog" :item="item" @close="confirmDeleteDialog = false" @deleted="confirmDeleteDialog = false" />
  </v-container>
</template>

<script>
import debounce from 'lodash/debounce'
import { homebrewModelConfig } from '~/mixins/homebrewModelConfig'
export default {
  mixins: [homebrewModelConfig],
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
    return { item }
  },
  data () {
    return {
      saving: false,
      confirmDeleteDialog: false
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
      return this.modelConfig[this.type].nameSingular
    },
    typeColor () {
      return this.modelConfig[this.type].color
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
    },
    publicationStatus () {
      return this.item.published ? 'published' : this.item.development ? 'development' : 'private'
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: this.item?.title,
      description: 'Community created homebrew'
    })
    this.debouncedUpdate = debounce(() => {
      this.updateData()
    }, 3000)
  },
  methods: {
    update (data) {
      const newData = JSON.stringify(data)
      const oldData = JSON.stringify(this.itemData)
      if (newData !== oldData) {
        this.itemData = data
        this.saving = true
        this.debouncedUpdate()
      }
    },
    updateTitle (title) {
      this.item = { ...this.item, title, data: { ...this.itemData, name: title } }
      this.saving = true
      this.debouncedUpdate()
    },
    async updateData () {
      const input = {
        id: this.item.id,
        title: this.item.title,
        data: JSON.stringify(this.itemData)
      }
      await this.$store.dispatch('api/MUTATE', { mutation: 'updateHomebrew', input })
      this.saving = false
    },
    async updateStatus (status) {
      this.saving = true
      const statuses = {
        private: status === 'private' ? 1 : 0,
        development: status === 'development' ? 1 : 0,
        published: status === 'published' ? 1 : 0
      }
      const input = {
        id: this.item.id,
        ...statuses
      }
      const newItem = await this.$store.dispatch('api/MUTATE', { mutation: 'updateHomebrew', input })
      newItem.data = JSON.parse(newItem.data)
      this.item = newItem
      this.saving = false
    }
  }
}
</script>
