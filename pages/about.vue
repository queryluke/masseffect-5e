<template lang="pug">
  v-content
    section
      v-parallax(src="/images/milky_way.jpg")
        v-layout(column align-center justify-center).white--text
          img(src="/images/me5e_logo_notm.png" alt="mass effect 5e" height="200")
          h1.sr-only About Mass Effect 5e
    section
      v-layout(column wrap align-center).my-5
        v-flex(xs12 sm8).my-3
          div.text-xs-center
            h2.headline Creators
        v-flex(xs12)
          v-container(grid-list-xl)
            v-layout(row wrap align-center)
              v-flex(xs12 md6)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center
                    v-avatar(size="36px")
                      img(src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="")
                  v-card-title(primary-title).layout.justify-center
                    div.headline.text-xs-center Luke Aeschleman
                  v-card-text.
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
              v-flex(xs12 md6)
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center
                    v-avatar(size="36px")
                      img(src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="")
                  v-card-title(primary-title).layout.justify-center
                    div.headline.text-xs-center Hugh Thompson
                  v-card-text.
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
        v-flex(xs12 sm8).my-3
          div.text-xs-center
            h2.headline Contributors

</template>

<script>
export default {
  head () {
    return {
      title: 'Mass Effect 5e | About',
      meta: [
        { hid: 'description', name: 'description', content: 'Information about Mass Effect 5e, including authors, contributors and contact information' }
      ]
    }
  }
}
</script>