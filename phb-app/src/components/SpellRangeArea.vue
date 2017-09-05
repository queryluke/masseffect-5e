<template>
  <div>
    {{ spell.range }}
    <span v-if="spell.aoe">
      ({{ spell['aoe-distance'] }} <div class="aoe-icon"><me-icon type="aoe" :name="spell['aoe']"></me-icon></div>)
    </span>
  </div>

</template>

<script>
  import MeIcon from './MeIcon.vue';

  export default {
    name: 'SpellRangeArea',
    props: ['spell'],
    components: {
      MeIcon
    },
  };
</script>

<style lang="stylus">
  .aoe-icon
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
</style>

