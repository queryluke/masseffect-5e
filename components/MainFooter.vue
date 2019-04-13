<template lang="pug">
  v-footer(height="auto" dark id="mainFooter")
    v-card(flat tile style="background-color: #000000" width="100%").text-xs-center
      v-card-text
        span.headline
          a(mailto="info@n7.world").mr-5 info@n7.world
        span.headline.ml-5
          a(href="https://www.reddit.com/r/masseffect5e/" target="_blank") /r/masseffect5e
        p.caption.ma-0.
          This homebrew is licensed under GPL-3.0 & OGL v1.0a. #[nuxt-link(to="/license") Read license].
        div © Mass Effect 5e {{ new Date().getFullYear() }}
</template>

<style>
  #mainFooter a {
    color: #4FC3F7;
  }
</style>
