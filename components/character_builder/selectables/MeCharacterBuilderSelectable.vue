<template>
  <div>
    <component :is="components[selectable.type].component" :options="selectable" :path="path" />
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    selectable: {
      type: Object,
      required: true
    },
    parentPath: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      components: {
        profs: {
          component: 'MeCharacterBuilderProfPicker'
        }
      }
    }
  },
  computed: {
    path () {
      return `${this.parentPath}.${this.selectable.id}`
    }
  }
}
</script>
