<script>
  export default {
    components: {
      // OtherComponents
    },
    created () {
      this.templateRender = new Function(this.component.render)()
      this.$options.staticRenderFns = new Function(this.component.staticRenderFns)()
    },
    data () {
      return {
        templateRender: null
      }
    },
    props: ['component'],
    render (createElement) {
      return this.templateRender ? this.templateRender() : createElement('div', 'rendering')
    }
  }
</script>


