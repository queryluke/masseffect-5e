<template lang="pug">
  span
    span.caption.ma-2 See Also:
    v-layout(row wrap)
      v-btn(v-for="item in list" v-bind:key="item" flat v-on:click="showGlobalDialog(item)") {{ item.replace(/-/g,' ') }}
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    methods: {
      ...mapActions(['showGlobalDialog'])
    },
    props: ['list']
  }
</script>
