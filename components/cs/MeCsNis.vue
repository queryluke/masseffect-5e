<template>
  <v-row>
    <v-col v-if="!$vuetify.breakpoint.xsOnly" cols="2">
      <v-avatar tile size="65">
        <v-img :src="image" contain />
      </v-avatar>
    </v-col>
    <v-col cols="12" sm="10">
      <v-row align="center" no-gutters>
        <v-col cols="10">
          <div class="text-truncate text-h6">
            <small>
              {{ character.name || 'Unnamed Character' }}
            </small>
          </div>
        </v-col>
        <v-col cols="2">
          <v-menu offset-y left>
            <template #activator="{ on, attrs }">
              <v-icon
                size="20"
                v-bind="attrs"
                v-on="on"
              >
                mdi-cog
              </v-icon>
            </template>
            <v-list dense>
              <v-list-item v-if="!viewOnly" :to="`/characters/builder/?id=${id}`" nuxt>
                <v-list-item-icon>
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-title>Edit</v-list-item-title>
              </v-list-item>
              <v-list-item @click="saveFile">
                <v-list-item-icon>
                  <v-icon>
                    mdi-download
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-title>Export</v-list-item-title>
              </v-list-item>
              <v-divider />
              <v-list-item to="/characters" nuxt>
                <v-list-item-icon>
                  <v-icon>
                    mdi-home
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-title>Character List</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <div class="text-caption text-truncate blue-grey--text text--lighten-3 mt-n2">
        <small>
          {{ identString }}
        </small>
      </div>
      <div class="text-caption mt-n1">
        {{ $t('level_nth', {nth: $t(`ordinal_numbers[${level}]`)}) }}
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsNis',
  computed: {
    ...mapGetters({ character: 'character', level: 'klasses/level', image: 'image', identString: 'identString', id: 'id' }),
    viewOnly () {
      return this.$store.state.character.viewOnly
    }
  },
  methods: {
    saveFile () {
      const data = JSON.stringify(this.character)
      const blob = new Blob([data], { type: 'text/plain' })
      const e = document.createEvent('MouseEvents')
      const a = document.createElement('a')
      const filename = this.character.name.replace(/[^a-z0-9]/gi, '')// .toLowerCase()

      a.download = `${filename}-${this.cid}.json`
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    }
  }
}
</script>
