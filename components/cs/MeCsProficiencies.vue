<template>
  <div>
    <template v-for="type in profTypes">
      <div :key="`prof-${type}`">
        <div class="text-body-1">
          {{ profLabel(type) }}
        </div>
        <p class="text-body-2">
          {{ profString(type, profs[type]) }}
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { ProfLabels } from '~/mixins/labels/ProfLabels'
const { mapGetters } = createNamespacedHelpers('character/profs')
export default {
  mixins: [ProfLabels],
  data () {
    return {
      profTypes: ['armor', 'weapon', 'tool']
    }
  },
  computed: {
    ...mapGetters(['profs'])
  }
}
</script>
