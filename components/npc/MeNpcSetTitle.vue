<template>
  <div class="text-subtitle text-md-h6 font-weight-bold small-caps">
    <slot />
    <me-hr :size="2" class="mt-n1" />
  </div>
</template>

<script>
export default {
  name: 'MeNpcSetTitle'
}
</script>
