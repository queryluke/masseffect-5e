<template lang="pug">
  v-content
    section
      v-container
        license
</template>

<script>
  import License from '~/components/License.vue'
  export default {
    components: {License},
    head () {
      return {
        title: 'License | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'Mass Effect 5e License' }
        ]
      }
    },
    layout: 'light'
  }
</script>
