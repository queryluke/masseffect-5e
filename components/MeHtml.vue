<script>
import { compileToFunctions } from 'vue-template-compiler'
import MeDistance from '~/components/MeDistance'
import MeCondition from '~/components/MeCondition'
import MeSourceReference from '~/components/MeSourceReference'

export default {
  name: 'MeHtml',
  components: { MeCondition, MeDistance, MeSourceReference },
  props: {
    content: {
      type: String,
      default: ''
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      templateRender: null
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    loading (newVal) {
      if (!newVal) {
        this.generateTemplate()
      }
    }
  },
  created () {
    this.generateTemplate()
  },
  methods: {
    generateTemplate () {
      const template = `<div ${this.inline ? 'class="inline-html"' : ''}>${this.content}</div>`
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

<style scoped>
  div.inline-html {
    display: inline;
  }
  div.inline-html > p:first-child{
    display: inline;
  }
</style>
