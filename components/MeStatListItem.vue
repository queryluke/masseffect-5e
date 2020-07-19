<template>
  <li>
    <span class="text-subtitle-2">
      {{ label }}
    </span>
    <span class="pl-1 text-body-2">
      <slot />
    </span>
  </li>
</template>

<script>
export default {
  name: 'MeStatListItem',
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>
