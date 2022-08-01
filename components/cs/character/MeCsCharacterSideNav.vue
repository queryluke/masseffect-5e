<template>
  <v-list dense>
    <v-subheader>
      Character
    </v-subheader>
    <!-- edit -->
    <v-list-item :disabled="viewOnly" :to="`/characters/builder/?id=${id}`" nuxt>
      <v-list-item-icon>
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>Edit</v-list-item-title>
    </v-list-item>

    <!-- preferences -->
    <v-list-item @click="showPreferences">
      <v-list-item-icon>
        <v-icon>
          mdi-toggle-switch-off
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>Preferences</v-list-item-title>
    </v-list-item>

    <v-divider />

    <v-subheader>
      Gameplay
    </v-subheader>
    <!-- short rest -->
    <v-list-item v-if="!viewOnly" @click="showRest('short')">
      <v-list-item-icon>
        <v-icon>
          mdi-campfire
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>Short Rest</v-list-item-title>
    </v-list-item>

    <!-- long rest -->
    <v-list-item v-if="!viewOnly" @click="showRest('long')">
      <v-list-item-icon>
        <v-icon>
          mdi-weather-night
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>Long Rest</v-list-item-title>
    </v-list-item>

    <!-- overrides -->
    <v-list-item v-if="!viewOnly" @click="showSettings">
      <v-list-item-icon>
        <v-icon>
          mdi-cog
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>Settings & Overrides</v-list-item-title>
    </v-list-item>

    <v-divider />

    <v-subheader>
      Share
    </v-subheader>
    <!-- share -->
    <v-tooltip
      v-if="character.meta.remote"
      v-model="shareTooltip"
      :disabled="!shareTooltip"
      top
      :close-delay="1000"
    >
      <template #activator="{on, attrs}">
        <v-list-item v-bind="attrs" v-on="on" @click.stop="copyLinkToClipboard">
          <v-list-item-icon>
            <v-icon>
              mdi-share
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>Share</v-list-item-title>
        </v-list-item>
      </template>
      <span>{{ shareTooltipMessage }}</span>
    </v-tooltip>

    <!-- export -->
    <v-list-item @click="saveFile">
      <v-list-item-icon>
        <v-icon>
          mdi-download
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>Export</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsCharacterSideNav',
  data () {
    return {
      shareTooltip: false,
      shareTooltipMessage: ''
    }
  },
  computed: {
    ...mapGetters({ character: 'character', id: 'id' }),
    viewOnly () {
      return this.$store.state.character.viewOnly
    }
  },
  methods: {
    showRest (type) {
      this.$store.commit('character/navigation/SET', { key: 'restMenu', value: type })
      this.$store.commit('character/navigation/SET', { key: 'mobileMenu', value: false })
      this.$nextTick(() => {
        this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', 'me-cs-rest-menu')
      })
    },
    showSettings () {
      this.$store.commit('character/navigation/SET', { key: 'settingsMenu', value: true })
      // this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', 'me-cs-character-override-side-nav')
    },
    showPreferences () {
      this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', 'me-cs-character-preferences-side-nav')
    },
    saveFile () {
      const data = JSON.stringify(this.character)
      const blob = new Blob([data], { type: 'text/plain' })
      const e = document.createEvent('MouseEvents')
      const a = document.createElement('a')
      const filename = (this.character.name || 'Unnamed').replace(/[^a-z0-9]/gi, '')// .toLowerCase()

      a.download = `${filename}-${this.id}.json`
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    },
    async copyLinkToClipboard () {
      let timeout = 1000
      if (!navigator.clipboard) {
        this.shareTooltipMessage = 'Error copying, you can copy from the address bar'
        timeout = 2000
      } else {
        await navigator.clipboard.writeText(window.location.href)
        this.shareTooltipMessage = 'Link Copied!'
      }
      this.shareTooltip = true
      setTimeout(() => {
        this.shareTooltip = false
      }, timeout)
    }
  }
}
</script>
