<template lang="pug">
  ClientOnly
    // Use the component in the right place of the template
    div
      div(v-if="editMode")
        tiptap-vuetify(v-model="html" :extensions="extensions")
        v-btn(color="success" @click="save()") Save
        v-btn(color="primary" @click="remove()" style="float: right;")
          v-icon delete
          span Remove

      div(v-if="!editMode")
        div(v-html="html")
        v-btn(v-if="!editMode" @click="editMode = true;") Edit

</template>

<script>
// import the component and the necessary extensions
import {
  TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, CodeBlock, Paragraph, BulletList, OrderedList,
  ListItem, Link, Blockquote, HardBreak, HorizontalRule, History
} from 'tiptap-vuetify'

export default {
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify },
  props: {
    content: {
      type: String,
      default: () => { return 'Add Description Here!' }
    },
    index: {
      type: Number,
      default: () => { return -1 }
    }
  },
  data () {
    return {
      editMode: false,
      // declare extensions you want to use
      extensions: [
        // you can specify options for extension
        new Heading({
          levels: [1, 2, 3]
        }),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new Code(),
        new CodeBlock(),
        new Paragraph(),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new Link(),
        new Blockquote(),
        new HardBreak(),
        new HorizontalRule(),
        new History()
      ],
      html: this.content
    }
  },
  methods: {
    save () {
      this.$emit('update:content', {
        index: this.index,
        html: this.html
      })
      this.editMode = false
    },
    remove () {
      this.$emit('remove:content', {
        index: this.index,
        html: this.html
      })
      this.editMode = false
    }
  }
}
</script>
