<template lang="pug">
  v-navigation-drawer(clipped persistent v-model="drawer")
    v-list(dense)
      template(v-for="item in items")
        v-list-group(v-if="item.items" v-bind:group="item.group")
          v-list-tile(slot="item" ripple)
            v-list-tile-action
              v-icon {{ item.action }}
            v-list-tile-content
              v-list-tile-title {{ item.title }}
            v-list-tile-action
              v-icon keyboard_arrow_down
          v-list-tile(
            v-for="subItem in item.items" v-bind:key="subItem.title"
            v-bind="{ \
              to: !subItem.target ? subItem.href : null, \
              href: subItem.target && subItem.href \
            }"
            ripple
            v-bind:disabled="subItem.disabled"
            v-bind:target="subItem.target"
          )
            v-list-tile-content
              v-list-tile-title {{ subItem.title }}
            v-list-tile-action(v-if="subItem.action")
              v-icon(:class="[subItem.actionClass || 'success--text']") {{ subItem.action }}
        v-subheader(v-else-if="item.header") {{ item.header }}
        v-divider(v-else-if="item.divider")
        v-list-tile(
          v-bind="{ \
            to: !item.target ? item.href : null, \
            href: item.target && item.href \
          }"
          ripple
          v-bind:disabled="item.disabled"
          v-bind:target="item.target"
          rel="noopener"
          v-else
        )
          v-list-tile-action
            v-icon {{ item.action }}
          v-list-tile-content
            v-list-tile-title {{ item.title }}
          v-list-tile-action(v-if="item.subAction")
            v-icon(class="success--text") {{ item.subAction }}
          v-chip(
            v-else-if="item.chip"
            label
            small
            class="caption blue lighten-2 white--text mx-0"
          ) {{ item.chip }}
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'NavigationDrawer',
    props: ['drawer'],
    data () {
      return {
        items: [
          {
            title: 'Rules',
            action: 'gavel',
            items: [
              { href:'/rules/general', title: 'General' },
              { href:'/rules/combat', title: 'Combat' },
              { href:'/rules/equipment', title: 'Equipment' },
              { href:'/rules/paragon-and-renegade', title: 'Paragon & Renegade' },
              { href:'/rules/spellcasting', title: 'Spellcasting' },
            ]
          },
          {
            title: 'Classes',
            action: 'group_work',
            href: '/classes',
          },
          {
            title: 'Races',
            action: 'face',
            href: '/races',
          },
          {
            title: 'Spells & Powers',
            action: 'whatshot',
            href: '/spells',
          },
          {
            title: 'Equipment',
            action: 'build',
            items: [
              {href: '/weapons', title: 'Weapons'},
              {href: '/armor/mods', title: 'Armor Mods'},
              {href: '/armor/sets', title: 'Armor Sets'},
              {href: '/grenades', title: 'Grenades'},
              {href: '/thermal-clips', title: 'Thermal Clips'},
            ]
          },
          {
            title: 'Additional Reference',
            action: 'info_outline',
            items: [
              {href: '/feats', title: 'Feats'},
              {href: '/backgrounds', title: 'Backgrounds'},
            ]
          },
          {
            title: 'Beastiary',
            action: 'pets',
            href: '/bestiary'
          }
        ]
      }
    }
  };
</script>
