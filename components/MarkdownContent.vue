<script>
  import AiDialog from '~/components/rule_partials/AdditionalInformationDialog.vue'
  import SkillList from '~/components/rule_partials/SkillList.vue'
  import SourceReference from '~/components/rule_partials/SourceReference.vue'
  import CostOfThings from '~/components/rule_partials/CostOfThings.vue'
  import Condition from '~/components/Condition.vue'
  import VehicleList from '~/components/vehicle/VehicleList.vue'

  export default {
    name: 'MarkdownContent',
    components: {
      AiDialog,
      SkillList,
      SourceReference,
      CostOfThings,
      Condition,
      VehicleList
    },
    props: {
      component: {
        type: Object,
        default: () => { return {} }
      },
      context: {
        type: Object,
        default: () => { return {} }
      }
    },
    data () {
      return {
        templateRender: null
      }
    },
    computed: {
      level () {
        const level = this.ctx('level')
        return `${this.$options.filters.ordinal(level)}`
      }
    },
    created () {
      this.templateRender = new Function(this.component.render)()
      this.$options.staticRenderFns = new Function(this.component.staticRenderFns)()
    },
    methods: {
      ctx (key) {
        if (this.context) {
          return this.context[key] ? this.context[key] : key
        }
        return key
      }
    },
    render (createElement) {
      return this.templateRender ? this.templateRender() : createElement('div', 'rendering')
    }
  }
</script>


