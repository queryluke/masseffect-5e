<template>
  <div>
    <div class="text-overline">
      Defenses
    </div>
    <template v-for="type of ['resistance', 'immunity', 'vulnerability']">
      <v-divider v-if="type === 'vulnerability' && defenses[type].text.length" :key="`${type}-divider`" class="my-2" />
      <me-cs-defense-item :key="type" :item="defenses[type]" class="my-1" />
    </template>
    <div>
      <me-cs-global-notes sub-type="defenses" />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/defenses')
export default {
  computed: {
    ...mapGetters(['defenses'])
  }
}
</script>
