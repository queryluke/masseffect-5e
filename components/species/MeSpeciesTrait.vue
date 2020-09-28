<template>
  <div>
    <div class="text-subtitle-1 text-md-h5 font-weight-bold">
      {{ label }}
    </div>
    <p>
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
