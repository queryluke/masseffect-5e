<template>
  <div>
    <component
      :is="components[selectable.type].component"
      :options="selectable"
      :source="source"
    />
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
    // background-criminal-criminal-specialty
    source: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      components: {
        profs: {
          component: 'MeCharacterBuilderProfPicker'
        },
        picker: {
          component: 'MeCharacterBuilderGenPicker'
        }
      }
    }
  }
}
</script>
