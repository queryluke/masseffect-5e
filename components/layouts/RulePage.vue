<template lang="pug">
  div
    h1.sr-only Mass Effect 5e - Player's Handbook
    side-navigation
    v-navigation-drawer(v-model="ruleList" fixed right clipped app v-if="$vuetify.breakpoint.smAndDown")
      v-list(dense)
        v-subheader Jump to
        v-list-tile(ripple v-for="(rule, index) in rules" v-bind:key="index" v-on:click="$vuetify.goTo(`#${rule}`, goToOptions); ruleList = false;")
          v-list-tile-title {{ rule.replace(/-/g,' ') | capitalize }}

    // Main toolbar
    main-toolbar.hidden-sm-and-down
    phb-toolbar.hidden-md-and-up
      h2(slot="toolbarTitle").title Rules - {{ pageTitle }}
      template(slot="toolbarItems")
        v-btn(icon dark @click="ruleList = !ruleList") #[v-icon view_list]

    // Content
    v-content.blue-grey.lighten-4
      v-container
        v-layout(row).hidden-sm-and-down
          v-flex(xs9)
            h2.display-3 {{ pageTitle }}
          v-flex(xs3).text-xs-right
            v-menu(offset-y)
              v-btn(slot="activator" color="primary" dark) Jump To #[v-icon arrow_drop_down]
              v-list
                v-list-tile(v-for="(rule, index) in rules" v-bind:key="index" v-on:click="$vuetify.goTo(`#${rule}`, goToOptions)")
                  v-list-tile-title {{ rule.replace(/-/g,' ') | capitalize }}
        slot(name="pageContent")
</template>

<script>
  import MainToolbar from '~/components/MainToolbar.vue'
  import PhbToolbar from '~/components/PhbToolbar.vue'
  import SideNavigation from '~/components/SideNavigation.vue'

  export default {
    components: {
      MainToolbar,
      PhbToolbar,
      SideNavigation
    },
    data () {
      return {
        goToOptions: {
          offset: -58
        },
        ruleList: false,
        currentRule: ''
      }
    },
    props: {
      pageTitle: {
        type: String,
        required: true
      },
      rules: {
        type: Array,
        required: true
      }
    }
  }
</script>
