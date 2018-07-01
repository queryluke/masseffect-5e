<template lang="pug">
  v-card
    v-toolbar(dark prominent flat color="primary")
      v-toolbar-title.white--text.body-2
        slot(name="header")
      v-spacer
      slot(name="toolbarActions")
    v-divider
    slot(name="content")
</template>

<script>
  export default {}
</script>

