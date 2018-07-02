<template>
  <div>
    {{ spell.range }}
    <span v-if="spell.aoe">
      ({{ spell.aoe_distance }} <div class="aoe-icon"><me-icon type="aoe" :name="spell['aoe']"></me-icon></div>)
    </span>
  </div>

</template>

<script>
  import MeIcon from '~/components/shared/MeIcon.vue'

  export default {
    props: ['spell'],
    components: {
      MeIcon
    }
  }
</script>

<style lang="stylus">
  .aoe-icon
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
</style>

