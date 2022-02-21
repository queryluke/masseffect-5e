<template>
  <v-app>
    <!-- START: APP BAR -->
    <v-slide-y-transition hide-on-leave>
      <me-app-bar v-if="$vuetify.breakpoint.mdAndUp || (!showSearchBar && $vuetify.breakpoint.smAndDown)" />
      <v-app-bar
        v-if="showSearchBar && $vuetify.breakpoint.smAndDown"
        app
      >
        <v-text-field
          v-model="search"
          placeholder="Search"
          autofocus
          clearable
          prepend-icon="mdi-arrow-left"
          class="mt-5"
          @click:prepend="showSearchBar = false"
        />
      </v-app-bar>
    </v-slide-y-transition>
    <!-- END: APP BAR -->

    <me-version-snackbar />
    <!-- START: NAV DRAWER -->
    <me-navigation />
    <!-- END: NAV DRAWER -->

    <!-- START: CONTENT -->
    <v-main>
      <me-logout />
      <nuxt />
    </v-main>
    <!-- END: CONTENT -->

    <!-- START: MOBILE FILTERS -->
    <v-footer v-if="$vuetify.breakpoint.smAndDown" app padless>
      <v-toolbar dense dark>
        <v-row justify="center">
          <v-col cols="10" sm="6">
            <v-row justify="space-between">
              <v-col cols="4">
                <v-btn
                  :color="tbColor(showSearchBar)"
                  icon
                  small
                  @click="showSearchBar = !showSearchBar"
                >
                  <v-badge color="secondary" overlap dot :value="search !== null && search.length > 0">
                    <v-icon size="18">
                      mdi-file-find
                    </v-icon>
                  </v-badge>
                </v-btn>
              </v-col>
              <v-col cols="4" class="text-center">
                <v-btn
                  :color="tbColor(showFilterDialog)"
                  icon
                  small
                  @click="showFilterDialog = true"
                >
                  <v-badge color="secondary" overlap dot :value="activeFilters">
                    <v-icon size="18">
                      mdi-filter-variant
                    </v-icon>
                  </v-badge>
                </v-btn>
              </v-col>
              <v-col cols="4" class="text-right">
                <v-btn
                  :color="tbColor(showSortDialog)"
                  text
                  small
                  @click="showSortDialog = true"
                >
                  <span class="mr-1">{{ $t(mobileSortLabel) }}</span>
                  <v-icon size="18">
                    {{ mobileSortDesc ? 'mdi-sort-ascending' : 'mdi-sort-descending' }}
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-toolbar>
      <!-- END: MOBILE FILTERS -->
    </v-footer>
  </v-app>
</template>

<script>
import { MetaHead } from '~/mixins/MetaHead'

export default {
  mixins: [MetaHead],
  computed: {
    search: {
      get () {
        return this.$store.getters['listPage/search']
      },
      set (value) {
        this.$store.dispatch('listPage/DEBOUNCED_SET_SEARCH', value)
      }
    },
    showSearchBar: {
      get () {
        return this.$store.getters['listPage/showSearchBar']
      },
      set (value) {
        this.$store.commit('listPage/TOGGLE_SEARCH_BAR', value)
      }
    },
    activeFilters () {
      return this.$store.getters['listPage/activeFilters']
    },
    showFilterDialog: {
      get () {
        return this.$store.getters['listPage/showFilterDialog']
      },
      set (value) {
        this.$store.commit('listPage/TOGGLE_FILTER_DIALOG', value)
      }
    },
    showSortDialog: {
      get () {
        return this.$store.getters['listPage/showSortDialog']
      },
      set (value) {
        this.$store.commit('listPage/TOGGLE_SORT_DIALOG', value)
      }
    },
    mobileSortLabel () {
      return this.$store.getters['listPage/mobileSortLabel']
    },
    mobileSortDesc () {
      return this.$store.getters['listPage/mobileSortDesc']
    }
  },
  methods: {
    tbColor (test) {
      return test
        ? this.$vuetify.theme.dark ? 'primary' : 'accent'
        : null
    }
  }
}
</script>
