<template lang="pug">
  v-footer(height="auto" dark id="mainFooter")
    v-card(flat tile style="background-color: #000000" width="100%").text-xs-center
      v-card-text
        p.title Contact Us: #[a(mailto="info@n7.world") info@n7.world]
        p.caption.ma-0.
          This homebrew is licensed under GPL-3.0 & OGL v1.0a. #[nuxt-link(to="/license") Read license].
        div © Mass Effect 5e {{ new Date().getFullYear() }}
</template>

<style>
  #mainFooter a {
    color: #4FC3F7;
  }
</style>