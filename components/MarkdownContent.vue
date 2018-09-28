<script>
  import AiDialog from '~/components/rule_partials/AdditionalInformationDialog.vue'
  import SkillList from '~/components/rule_partials/SkillList.vue'
  import SourceReference from '~/components/rule_partials/SourceReference'

  export default {
    components: {
      AiDialog,
      SkillList,
      SourceReference
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


