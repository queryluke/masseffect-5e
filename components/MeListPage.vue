<template>
  <v-container
    :class="{ 'px-0': $vuetify.breakpoint.xsOnly }"
  >
    <!-- Rule link -->
    <div v-if="ruleLink.hasOwnProperty('to')" class="text-md-right">
      <v-btn :to="ruleLink.to" nuxt outline color="secondary">
        {{ ruleLink.name }}
      </v-btn>
    </div>

    <!-- page header -->
    <div v-if="$vuetify.breakpoint.mdAndUp">
      <me-page-title :title="title" />
    </div>
    <v-row>
      <v-col>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details />
      </v-col>
      <v-col v-for="filter in filters" :key="filter.name">
        <v-select :items="filter.options" :label="filter.name" multiple menu-props="{maxHeight:'400'}" />
      </v-col>
    </v-row>

    <!-- list header -->
    <!-- mobile -->
    <div v-if="$vuetify.breakpoint.mdAndDown" class="text-xs-right">
      <v-menu bottom left>
        <span slot="activator" class="subheading">
          Sort by: {{ sortBy.label }}
        </span>
        <v-list>
          <v-list-item v-for="header in headers" :key="header.label">
            <v-list-item-content>
              <v-list-item-title>
                {{ header.label }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <!-- desktop -->
    <v-row v-if="$vuetify.breakpoint.lgAndUp">
      <v-col
        v-for="header in headers"
        :key="header.label"
        :cols="header.cols"
        :sm="header.sm || header.cols"
        :md="header.md || header.sm || header.cols"
        :lg="header.lg || header.md || header.sm || header.cols"
        :xl="header.xl || header.lg || header.md || header.sm || header.cols"
        :class="header.classes"
      >
        <button
          v-if="typeof header.sortable === 'undefined' || header.sortable !== false"
          class="body-2"
          @click="sort(header)"
        >
          {{ header.label }}
          <v-icon>
            mdi-arrow-upward
          </v-icon>
        </button>
        <span v-else>
          {{ header.label }}
        </span>
      </v-col>
    </v-row>

    <!-- list -->
    <v-expansion-panels>
      <v-expansion-panel
        v-for="item in items"
        :key="item.id"
      >
        <v-expansion-panel-header>
          <v-row>
            <v-col
              v-for="header in headers"
              :key="header.label"
              :cols="header.cols"
              :sm="header.sm || header.cols"
              :md="header.md || header.sm || header.cols"
              :lg="header.lg || header.md || header.sm || header.cols"
              :xl="header.xl || header.lg || header.md || header.sm || header.cols"
            >
              <component :is="header.component" v-if="header.component" :item="item" />
              <span v-else>
                {{ item[header.key] }}
              </span>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <component :is="displayComponent" :item="item" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- mobile filter dialog -->
    <me-mobile-filters :title="`Filter ${title}`">
      <template slot="filters">
        <div v-for="filter in filters" :key="filter.name">
          <v-select :items="filter.options" :label="filter.name" multiple menu-props="{maxHeight:'400'}" />
        </div>
        <v-btn @click="reset()">
          Reset
        </v-btn>
      </template>
    </me-mobile-filters>
  </v-container>
</template>

<script>
export default {
  name: 'MeListPage',
  props: {
    ruleLink: {
      type: Object,
      default: () => {
        return {}
      }
    },
    title: {
      type: String,
      required: true
    },
    filters: {
      type: Array,
      default: () => {
        return []
      }
    },
    headers: {
      type: Array,
      default: () => {
        return []
      }
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    displayComponent: {
      type: String,
      required: true
    },
    customFilter: {
      type: Function,
      default: () => {
        return this.defaultFilter()
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    sortables () {
      return this.headers.filter(i => typeof i.sortable === 'undefined' || i.sortable !== false)
    }
  },
  methods: {
    defaultFilter () {
      return this.items
    },
    reset () {
      return ''
    }
  }
}
</script>
