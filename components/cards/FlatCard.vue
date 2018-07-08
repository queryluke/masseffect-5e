<template lang="pug">
  v-card(:id="id").elevation-0.transparent
    v-card-text
      v-container(fluid grid-list-md).pa-0
        v-layout(row wrap)
          v-flex(xs12 :class="{ md8: alertBox }")
            h2.headline
              slot(name="title")
            slot(name="body")
          v-flex(v-if="alertBox" xs12 md4)
            v-card.blue.lighten-5
              v-card-text
                p.subheading #[v-icon info]
                  em
                    slot(name="alertTitle")
                slot(name="alertBody")
</template>

<script>
  export default {
    props: {
      alertBox: {
        type: Boolean,
        default: false
      },
      id: String
    }
  }
</script>

