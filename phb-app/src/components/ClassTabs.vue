<template lang="pug">
  div
    v-tabs(v-model="active" grow)
      v-tabs-bar(:class="colors.primary" dark)
        v-tabs-item(
          v-for="tab in tabs"
          v-bind:key="tab.id"
          v-bind:href="`#${tab.id}`"
          ripple) {{ tab.name }}
        v-tabs-slider(v-bind:class="colors.accent")
      v-tabs-items
        v-tabs-content(id="attributes")
          v-card(flat)
            v-card-text
              slot(name="attributes_tab_content")
        v-tabs-content(id="subclasses")
          v-card(flat)
            v-card-text
              slot(name="subclasses_tab_content")
        v-tabs-content(id="spell_list")
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

