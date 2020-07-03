<template lang="pug">
  div
    h3 {{heading}}
    br
    v-layout(v-if="showSearch")
      v-flex
        v-autocomplete(label="Search the documentation..." :items="docs" v-model="search.model"
        :item-text="itemText" return-object)
      v-flex
        v-btn(
          @click="addToTable(search.model); search.model = '';"
          v-if="search.model != '' ") Add Selected Item
    v-layout
      v-expansion-panel.mb-2
        v-expansion-panel-content(v-for="(item, ind) in character_table" :key="ind + '-' + type + getHeading(character_table[ind])").large-panel
          div(slot="header") {{getHeading(character_table[ind])}}
          v-card.grey.lighten-3
            v-card-text
              Editor(:content="item" :index="ind"
                @update:content="modifyTable($event); $forceUpdate();"
                @remove:content="removeFromTable($event); $forceUpdate();")
    v-layout.xs-text-left()
      v-btn(@click="addToTable(undefined, '<h1>New Item ' + (character_table.length+1) + '</h1>')") Add Custom Entry
</template>

<script>

import Editor from '~/components/character_builder/Editor.vue'

export default {
  components: { Editor },
  props: {
    showSearch: {
      type: Boolean,
      default: () => { return true }
    },
    template: {
      type: String,
      default: () => { return '<h1>Item not found in docs</h1>' }
    },
    heading: {
      type: String,
      default: () => { return 'Please Specify a Heading Text' }
    },
    itemText: {
      type: String,
      default: () => { return 'title' }
    },
    type: {
      type: String,
      default: () => { return 'default' }
    },
    docs: {
      type: Array,
      default: () => { return [] }
    },
    character_table: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      search: {
        model: ''
      }
    }
  },
  computed: {
    event () {
      return this.type
    }
  },
  methods: {
    // Bubbles up the value to the inherited character array (ie: traits)
    addToTable (model, value) {
      if (!value) {
        try {
          model = require(`~/static/data/${this.type}/${model.id}.md`)// '<h1>'+model.title+'</h1><p>'+model.body+'</p>'
          value = '<h1>' + model.attributes.name + '</h1>' + model.html
        } catch {
          value = '<h1>Not Found</h1><p>Something went wrong when trying to add this item...</p>'
        }
      }
      console.log('Payload for add event: ', value)
      this.$emit(this.event + ':add', value)
    },
    removeFromTable (event) {
      console.log('Payload for remove event: ', event)
      this.$emit(this.event + ':remove', event)
    },
    modifyTable (event) {
      console.log('Payload for modify event: ', event)
      this.$emit(this.event + ':modify', event)
    },
    // Grabs the text out of the first found tag in the html
    getHeading (html) {
      let heading = 'No Heading Found'
      try {
        heading = /(?<=>)(?!<)(.*?)(?=<)(?<!>)/.exec(html)[0]
      } catch {
        heading = 'No Heading Found'
      }
      const headingLength = 50
      if (heading.length > headingLength) {
        heading = heading.substring(0, 50)
        heading += '...'
      }
      return heading
    }
  }
}
</script>
