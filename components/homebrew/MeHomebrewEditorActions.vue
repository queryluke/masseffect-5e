<template>
  <v-card-actions>
    <v-btn color="primary" :loading="saving" :disabled="noEdit" @click="$emit('save')">
      Save
    </v-btn>
    <v-spacer />
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
          :color="statusColor"
          outlined
          dark
          v-bind="attrs"
          :disabled="noEdit"
          v-on="on"
        >
          Status: {{ publicationStatus }}
          <v-icon right>
            mdi-menu-down
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="status in statusOptions" :key="status" @click="changeStatus(status)">
          <span class="text-capitalize" :class="`${statusColors[status]}--text`">{{ status }}</span>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn icon color="primary" @click="showHelp = true">
      <v-icon>
        mdi-help-circle
      </v-icon>
    </v-btn>
    <me-standard-dialog :shown="showHelp" @close="showHelp = false">
      <template #title>
        Publication Status
      </template>
      <me-homebrew-pub-status-ex />
    </me-standard-dialog>
    <me-standard-dialog :shown="confirmStatusChange" @close="confirmStatusChange = false">
      <template #title>
        Confirm Publication Status Change
      </template>
      <v-alert v-if="noUsername" value type="error">
        Before you publish, consider adding a username to your
        <nuxt-link to="/profile" target="_blank">
          profile
        </nuxt-link>.
        Otherwise, all of your creations will show up as "anonymous".
      </v-alert>
      <me-homebrew-pub-status-confirm :change-to="changeToStatus" />
      <div class="mt-3 d-flex align-center">
        <v-checkbox v-model="agreement" />
        <span class="mr-1">I confirm that this homebrew does not violate any</span>
        <nuxt-link to="/legal/acceptable-use" target="_blank">
          Acceptable Use
        </nuxt-link>
        <span class="ml-1">policies.</span>
      </div>
      <template #addActions>
        <v-btn :disabled="!agreement" text color="success" @click="executeChange">
          Submit
        </v-btn>
      </template>
    </me-standard-dialog>
  </v-card-actions>
</template>

<script>
export default {
  name: 'MeHomebrewEditorActions',
  props: {
    publicationStatus: {
      type: String,
      default: 'private'
    },
    saving: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showHelp: false,
      changeToStatus: null,
      confirmStatusChange: false,
      agreement: false
    }
  },
  computed: {
    statusColors () {
      return {
        private: 'error',
        campaign: 'warning',
        development: 'info',
        published: 'success'
      }
    },
    statusColor () {
      return this.statusColors[this.publicationStatus]
    },
    statusOptions () {
      const options = ['development', 'published']
      if (this.publicationStatus === 'published') {
        return false
      } else {
        return options.filter(i => i !== this.publicationStatus)
      }
    },
    noEdit () {
      return this.publicationStatus === 'published'
    },
    noUsername () {
      return !this.$store.getters['user/profile'].username
    }
  },
  methods: {
    changeStatus (status) {
      this.changeToStatus = status
      this.confirmStatusChange = true
    },
    executeChange () {
      this.$emit('updateStatus', this.changeToStatus)
      this.changeToStatus = null
      this.confirmStatusChange = false
      this.agreement = false
    }
  }
}
</script>
