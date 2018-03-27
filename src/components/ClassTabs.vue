<template lang="pug">
  div
    v-tabs(
      v-bind:color="colors.primary"
      slot="extension"
      v-bind:slider-color="colors.accent"
      v-model="active"
      dark
      grow
    )
      v-tab(
        v-for="tab in tabs"
        v-bind:key="tab.id"
        v-bind:href="`#${tab.id}`"
        ripple
      ) {{ tab.name }}
    v-tabs-items(v-model="active")
      v-tab-item(id="attributes")
        v-card(flat)
          v-card-text
            slot(name="attributes_tab_content")
      v-tab-item(id="subclasses")
        v-card(flat)
          v-card-text
            slot(name="subclasses_tab_content")
      v-tab-item(id="spell_list")
        v-card(flat)
          v-card-text
            slot(name="spell_list_tab_content")
</template>

<script>
  export default {
    name: 'ClassTabs',
    props: ['colors'],
    data () {
      return {
        tabs: [
          { name: 'Attributes', id: 'attributes' },
          { name: 'Subclasses', id: 'subclasses' },
          { name: 'Spell List', id: 'spell_list' },
        ],
        active: null,
      }
    },
  };
</script>

