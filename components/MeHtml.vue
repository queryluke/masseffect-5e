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
      const template = `<div ${this.inline ? 'class="me-html inline-html"' : 'class="me-html text-body-2"'}>${this.content}</div>`
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
  div.me-html > ul {
    margin-bottom: 1em;
  }

  div.me-html > h3 {
    font-size: 1.5rem!important;
    font-weight: 400;
    letter-spacing: normal!important;
    margin-top: 2em;
    margin-bottom: 12px;
  }

  div.me-html > h4 {
    font-size: 1.25rem!important;
    font-weight: 500;
    letter-spacing: .0125em!important;
  }

  div.me-html > h5 {
    font-size: 1rem!important;
    font-weight: 400;
    line-height: 1.75rem;
    letter-spacing: .009375em!important;
  }

</style>
