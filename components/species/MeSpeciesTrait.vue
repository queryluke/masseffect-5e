<template>
  <div>
    <me-tpg s="h5">
      {{ label }}
    </me-tpg>
    <me-tpg e="p">
      <slot />
    </me-tpg>
  </div>
</template>

<script>
import MeTpg from '~/components/MeTpg'
export default {
  components: { MeTpg },
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
