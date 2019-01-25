<template lang="pug">
  v-toolbar(dark fixed app clipped-left :clipped-right="clippedRight")

    v-toolbar-side-icon(v-on:click="toggleSidebar").hidden-lg-and-up
    // Race mobile display
    v-menu(:nudge-width="100" v-if="$vuetify.breakpoint.smAndDown && $route.name === 'phb-races-id'")
      v-toolbar-title(slot="activator")
        span {{ pageName }}
        v-icon arrow_drop_down
      v-list
        v-list-tile(v-for="item in races" v-bind:key="item" v-bind="{to: { name: 'phb-races-id', params: { id: item }}}")
          v-list-tile-title {{ item | fidtt }}
    // All other mobile displays
    v-toolbar-title(v-else)
      nuxt-link(to="/").nav-brand.hidden-sm-and-down
        img(src="/images/me5e.svg")
        span Mass Effect 5e
      span.hidden-md-and-up {{ pageName }}

    v-spacer

    v-toolbar-items.hidden-sm-and-down
      v-btn(v-for="(item, index) in primaryNavigation" v-bind:key="index" v-bind:to="item.route" flat)
        span {{ item.title }}
    span.hidden-md-and-up
      slot(name="toolbarItems")
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  const {mapActions, mapGetters} = createNamespacedHelpers('phb')
  export default {
    props: {
      extended: {
        type: Boolean,
        default: false
      },
      clippedRight: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters(['pages', 'primaryNavigation', 'races']),
      pageName () {
        const page = this.pages[this.$route.name]
        const fancyParam = this.$route.params.id === 'unshackled-ai' ? 'Unshackled AI' : this.$options.filters.capitalize(this.$route.params.id)
        if (this.pages[this.$route.name]) {
          return this.$route.params.id
            ? `${page.name} - ${fancyParam}`
            : page.name
        } else {
          return ''
        }
      }
    },
    methods: {
      ...mapActions(['toggleSidebar'])
    }
  }
</script>
