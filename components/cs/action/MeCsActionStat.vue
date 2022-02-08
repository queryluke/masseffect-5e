<template>
  <div class="text-center">
    <div class="text-caption font-weight-light">
      <small>
        <slot name="title" />
      </small>
    </div>
    <div class="text-subtitle-2 mt-n1 mb-n2">
      <slot />
    </div>
    <div class="text-caption font-weight-light">
      <small>
        <slot name="subtitle" />
      </small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeCsActionStat'
}
</script>
