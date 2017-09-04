<template>
  <span>
    {{ spell.range }}
    <span v-if="spell.aoe">
      ({{ spell['aoe-distance'] }} <aoe-icon :shape="spell['aoe']"></aoe-icon>)
    </span>
  </span>

</template>

<script>
  import AoeIcon from './AoeIcon.vue';

  export default {
    name: 'SpellRangeArea',
    props: ['spell'],
    components: {
      AoeIcon
    },
  };
</script>

