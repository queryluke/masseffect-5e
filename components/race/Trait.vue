<template lang="pug">
  div.my-3.mx-2
    div.title.mb-1
      slot(name="header")
    div
      slot(name="text")
</template>

<script>
export default {}
</script>
