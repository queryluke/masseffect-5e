<template lang="pug">
  v-navigation-drawer(clipped fixed app v-model="isActive")
    v-list(dense expand)
      template(v-for="item in items")
        v-list-group(v-if="item.items" v-bind:prepend-icon="item.icon" no-action)
          v-list-tile(slot="activator" ripple)
            v-list-tile-content
              v-list-tile-title {{ item.title }}
          template(v-for="(subItem, i) in item.items")
            v-list-tile(:key="i" v-bind="{to: subItem.href, href: subItem.href }" ripple)
              v-list-tile-content
                v-list-tile-title {{ subItem.title }}
        v-subheader(v-else-if="item.header") {{ item.header }}
        v-divider(v-else-if="item.divider")
        v-list-tile(
          v-bind="{ to: item.href, href: item.href }"
          ripple
          rel="noopener"
          v-else
        )
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ item.title }}
      v-list-tile(
        v-bind="{ to: '/bookmarks', href: '/bookmarks'}"
        ripple
        rel="noopener"
      )
        v-list-tile-action
          v-icon book
        v-list-tile-content
          v-list-tile-title Bookmarks
        v-list-tile-action.text-right
          v-badge(left v-if="bookmarkCount > 0")
            span(slot="badge") {{ bookmarkCount }}
</template>

<script>
  import { mapState } from 'vuex';
  import { mapGetters } from 'vuex';

  export default {
    name: 'MainNavigation',
    computed: {
      ...mapGetters(['bookmarkCount']),
      isActive: {
        get () {
          return this.$store.state.sidebar
        },
        set (val) {
          this.$store.commit('toggleSidebar', val)
        }
      },
    },
    data () {
      return {
        items: [
          {
            title: 'Rules',
            icon: 'gavel',
            items: [
              { href:'/rules/general', title: 'General' },
              { href:'/rules/spellcasting', title: 'Spellcasting' },
              { href:'/rules/weapons', title: 'Weapons' },
              { href:'/rules/armor', title: 'Armor' },
              { href:'/rules/consumables', title: 'Consumables' },
              { href: '/skills', title: 'Skills' },
              { href: '/conditions', title: 'Conditions' },
            ]
          },
          {
            title: 'Player Options',
            icon: 'face',
            items: [
              { href: '/classes', title: 'Classes' },
              { href: '/races', title: 'Races' },
              { href: '/feats', title: 'Feats' },
              { href: '/backgrounds', title: 'Backgrounds' },
            ],
          },
          {
            title: 'Equipment',
            icon: 'build',
            items: [
              {href: '/weapons', title: 'Weapons'},
              {href: '/armor/mods', title: 'Armor Mods'},
              {href: '/armor/sets', title: 'Armor Sets'},
              {href: '/grenades', title: 'Grenades'},
              {href: '/thermal-clips', title: 'Thermal Clips'},
            ]
          },
          {
            title: 'Spells & Powers',
            icon: 'whatshot',
            href: '/spells',
          },
          {
            title: 'Bestiary',
            icon: 'pets',
            href: '/bestiary'
          },
          {
            title: 'GM Tools',
            icon: 'extension',
            items: [
              {href: '/gm-tools/grunts', title: 'Grunts'},
            ]
          },
        ]
      }
    }
  };
</script>
