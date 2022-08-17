<template>
  <v-dialog
    :value="shown"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :transition="transition"
    :max-width="800"
    @click:outside="$emit('close')"
  >
    <v-card max-height="700" :loading="loading">
      <v-card-title>
        <slot name="title">
          Create a new homebrew
        </slot>
      </v-card-title>
      <v-card-text>
        <v-select v-model="type" :items="types" label="Type" :error-messages="typeErrorMessages" @change="loadBasedOnOptions" />
        <v-text-field v-model="title" label="Title" :error-messages="titleErrorMessages" />
        <v-autocomplete v-if="type" v-model="basedOn" label="Based On" :items="modelsOfType" />
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="$emit('close')"
        >
          Close
        </v-btn>
        <v-spacer />
        <v-btn
          text
          color="primary"
          :loading="loading"
          @click="submit()"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'MeHomebrewCreateDialog',
  props: {
    shown: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      types: [
        { text: 'Power', value: 'powers' }
      ],
      type: null,
      title: null,
      basedOn: null,
      loadingBasedOn: false,
      modelsOfType: [],
      titleError: null,
      titleErrorMessages: [],
      typeErrorMessages: [],
      loading: false
    }
  },
  computed: {
    transition () {
      return this.$vuetify.breakpoint.xsOnly ? 'dialog-bottom-transition' : 'dialog-transition'
    },
    myId () {
      return this.$store.getters['auth/sub']
    }
  },
  methods: {
    async loadBasedOnOptions () {
      if (!this.type) {
        return
      }
      this.loadingBasedOn = true
      const options = await this.$store.dispatch('FETCH_DATA', this.type)
      this.modelsOfType = options.map((i) => {
        return {
          value: i.id,
          text: i.name
        }
      })
    },
    async submit () {
      this.typeErrorMessages = []
      this.titleErrorMessages = []
      if (!this.type) {
        this.typeErrorMessages = 'You must select a homebrew type'
        return
      }
      if (!this.title) {
        this.titleErrorMessages = 'Required'
        return
      }
      this.loading = true
      await this.loadBasedOnOptions()
      const errorMessage = 'That name already exists. All homebrew names of a specific type must be unique.'
      const official = await this.$store.getters.getData(this.type)
      const titleId = this.title.trim().toLowerCase().replaceAll(/\W/g, '-')
      const matchingTitleInOfficial = official.find(i => i.id === titleId)
      if (matchingTitleInOfficial) {
        this.titleErrorMessages = errorMessage
        this.loading = false
        return
      }
      const { items } = await this.$store.dispatch('api/QUERY', { query: 'homebrewByTitleId', variables: { titleId } })
      if (items.length) {
        this.titleErrorMessages = errorMessage
        this.loading = false
        return
      }
      const data = {
        name: this.title
      }
      const newHomebrewItem = {
        title: this.title,
        titleId,
        owner: this.myId,
        model: this.type,
        data: JSON.stringify(data),
        publicationStatus: 'private'
      }
      const { id } = await this.$store.dispatch('api/MUTATE', { mutation: 'createHomebrew', input: newHomebrewItem })
      await this.$router.push({
        path: `/homebrew/edit/?id=${id}`
      })
    }
  }
}
</script>
