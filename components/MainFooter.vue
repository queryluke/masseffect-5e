<template lang="pug">
  v-footer(height="auto" dark id="mainFooter")
    v-card(flat tile style="background-color: #000000" width="100%").text-xs-center
      v-card-text
        v-layout(row wrap)
          v-flex(xs12 sm5 offset-sm1 md4 offset-md2 lg3 offset-lg3).headline
            a(mailto="info@n7.world") info@n7.world
          v-flex(xs12 sm5 md4 lg3).headline
            a(href="https://www.reddit.com/r/masseffect5e/" target="_blank") /r/masseffect5e
          v-flex(xs12)
            p.caption.ma-0.
              This homebrew is licensed under GPL-3.0 & OGL v1.0a. #[nuxt-link(to="/license") Read license].
            div © Mass Effect 5e {{ new Date().getFullYear() }}
</template>

<style>
  #mainFooter a {
    color: #4FC3F7;
  }
</style>
