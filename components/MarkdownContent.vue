<script>
  import AiDialog from '~/components/rule_partials/AdditionalInformationDialog.vue'
  import SkillList from '~/components/rule_partials/SkillList.vue'
  import SourceReference from '~/components/rule_partials/SourceReference.vue'
  import CostOfThings from '~/components/rule_partials/CostOfThings.vue'
  import Condition from '~/components/Condition.vue'

  export default {
    name: 'markdown-content',
    components: {
      AiDialog,
      SkillList,
      SourceReference,
      CostOfThings,
      Condition
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


