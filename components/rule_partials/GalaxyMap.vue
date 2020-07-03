<template lang="pug">
  div.text-xs-center
    v-img(:src="galaxyMap" v-bind:height="height" contain)
    p.title.mt-5.
      Mass Effect Galaxy Map by otvert (#[a(:href="galaxyMapLarge" target="_blank") Full Size])
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: 'auto'
    }
  },
  data () {
    return {
      galaxyMap: '/images/galaxy_map.png',
      galaxyMapLarge: 'https://orig00.deviantart.net/ba03/f/2013/100/0/0/mass_effect_galaxy_map_by_otvert-d5u3tvb.png'
    }
  }
}
</script>
