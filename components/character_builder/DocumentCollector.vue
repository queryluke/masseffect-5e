<template lang="pug">
  div
    h3 {{heading}}
    br
    v-layout
      v-flex
        v-autocomplete(label="Search the documentation..." :items="docs" v-model="search.model"
        :item-text="search.title" return-object)
      v-flex
        v-btn(
          @click="addToTable('<h1>'+search.model[title]+'</h1><p>'+search.model[body]+'</p>'); search.model = '';"
          v-if="search.model != '' ") Add Selected Item
    v-layout
      v-expansion-panel.mb-2
        v-expansion-panel-content(v-for="(item, ind) in character_table").large-panel
          div(slot="header") {{getHeading(character_table[ind])}}
          v-card.grey.lighten-3
            v-card-text
              Editor(:content="character_table[ind]" :index="ind"
                @update:content="modifyTable($event)"
                @remove:content="removeFromTable($event)")
    v-layout.xs-text-left()
      v-btn(@click="addToTable('<h1>New Item</h1>')") Add Custom Entry
</template>

<script>

import Editor from '~/components/character_builder/Editor.vue';

export default {
  components: {Editor},
  props: {
    heading: {
      type: String,
      default: () => {return "Please Specify a Heading Text"}
    },
    title: {
      type: String,
      default: () => {return "title"}
    },
    body: {
      type: String,
      default: () => {return "body"}
    },
    docs: {
      type: Array,
      default: () => {return []}
    },
    character_table: {
      type: Array,
      default: () => {return []}
    }
  },
  data: function() {
    return {
      search: {
        model: '',
        title: this.title,
        body: this.body,
      }
    }
  },
  methods: {
    // Bubbles up the value to the inherited character array (ie: traits)
    addToTable: function(value) {
      this.$emit("add", value);
    },
    removeFromTable: function(event) {
      console.log("Payload for remove event: ", event);
      this.$emit("remove", event);
    },
    modifyTable: function(event) {
      console.log("Payload for modify event: ", event);
      this.$emit("modify", event);
    },
    // Grabs the text out of the first found tag in the html
    getHeading: function(html) {
      var heading = /(?<=\>)(?!\<)(.*?)(?=\<)(?<!\>)/.exec(html)[0] || "No Heading Found";
      const headingLength = 50;
      if (heading.length > headingLength) {
        heading = heading.substring(0, 50);
        heading += "...";
      }
      return heading;
    }
  }
}
</script>