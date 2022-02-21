<template>
  <div>
    <template v-for="(klass, index) in klasses">
      <me-cs-hit-dice-tracker :key="`klass-hit-dice-${klass.id}`" :class-index="index" small />
    </template>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/klasses')
export default {
  computed: {
    ...mapGetters({ klasses: 'selectedKlasses' })
  }
}
</script>
