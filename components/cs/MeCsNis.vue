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
              {{ dead ? '(Dead) ' : '' }}{{ character.name || 'Unnamed Character' }}
            </small>
          </div>
        </v-col>
        <v-col cols="2">
          <v-icon size="20" @click="showCharacterMenu">
            mdi-cog
          </v-icon>
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
  data () {
    return {
      shareTooltip: false,
      shareTooltipMessage: ''
    }
  },
  computed: {
    ...mapGetters({ character: 'character', level: 'klasses/level', image: 'image', identString: 'identString' }),
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    dead () {
      return this.character.currentStats?.deathSaves?.failures === 3
    }
  },
  methods: {
    showCharacterMenu () {
      this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', 'me-cs-character-side-nav')
    }
  }
}
</script>
