<template lang="pug">
  v-layout(row wrap justify-space-between).mt-4
    span Last Updated: {{ getSheetUpdated(list) }}
    a(:href="getSheetUrl(list)" target="_blank") Source
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'PageFooter',
    props: ['list'],
    computed: {
      ...mapGetters(['getSheetUrl', 'getSheetUpdated']),
    },
  };
</script>

