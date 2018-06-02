<template lang="pug">
  div
    v-tabs(
      slot="extension"
      v-bind:slider-color="colors.primary"
      v-model="active"
      grow
    )
      v-tab(
        v-for="tab in tabs"
        v-bind:key="tab.id"
        v-bind:href="`#${tab.id}`"
        ripple
      ) {{ tab.name }}
    v-tabs-items(v-model="active")
      v-tab-item(v-for="tab in tabs" v-bind:key="tab.id" v-bind:id="tab.id")
        v-card(flat)
          v-card-text
            slot(:name="tab.slot")
</template>

<script>
  export default {
    props: ['colors'],
    data () {
      return {
        tabs: [
          { name: 'Progression Table', id: 'progression_table', slot: 'progression_table_tab_content' },
          { name: 'Class Features', id: 'attributes', slot: 'attributes_tab_content' },
          { name: 'Subclasses', id: 'subclasses', slot: 'subclasses_tab_content' },
          { name: 'Spell List', id: 'spell_list', slot: 'spell_list_tab_content' }
        ],
        active: null
      }
    }
  }
</script>

