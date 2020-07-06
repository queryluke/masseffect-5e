<script>
import { compileToFunctions } from 'vue-template-compiler'

export default {
  name: 'MeHtml',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      templateRender: null
    }
  },
  created () {
    this.generateTemplate()
  },
  methods: {
    generateTemplate () {
      const template = `<div>${this.content}</div>`
      const { render, staticRenderFns } = compileToFunctions(template)
      this.templateRender = render
      this.$options.staticRenderFns = staticRenderFns
    }
  },
  render (createElement) {
    return this.templateRender ? this.templateRender() : createElement('div', 'Rendering')
  }
}
</script>
