<template lang="pug">
  v-app
    div(id="print-grid")
      nuxt
</template>

<style lang="scss">
  .application.theme--light {
    background-color: #fff;
  }
  @page {
    size: A4
  }
  @media print {
    #print-grid {
      margin: auto;
    }
  }
</style>
