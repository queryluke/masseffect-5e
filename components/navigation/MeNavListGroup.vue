<template>
  <v-list-group :prepend-icon="icon" :group="group" no-action>
    <template #activator>
      <v-list-item-content>
        <v-list-item-title>
          {{ text }}
        </v-list-item-title>
      </v-list-item-content>
    </template>
    <template v-for="subItem in items">
      <me-nav-list-item
        :key="subItem.to"
        :text="subItem.name"
        :to="subItem.to"
      />
    </template>
  </v-list-group>
</template>

<script>
export default {
  name: 'MeNavListGroup',
  props: {
    text: {
      type: String,
      required: true
    },
    icon: {
      type: [String, Boolean],
      default: false
    },
    avatar: {
      type: [Number, Boolean],
      default: false
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    group () {
      return `(${this.items.map(i => `(^${this.localePath(i.to)}$|^${this.localePath(i.to)}/.*?)`).join('|')})`
    }
  }
}
</script>
