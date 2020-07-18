<template>
  <div>
    <div class="font-weight-bold text-uppercase">
      {{ label }}
    </div>
    <div class="text-body-2">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeItemStat',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
