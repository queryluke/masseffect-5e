<template>
  <div>
    <section>
      <v-parallax
        :src="require(`~/assets/images/parallax/citadel.jpg`)"
        alt="Mass Effect // The Citadel by grndayfrk14"
      >
        <v-row justify="center">
          <v-col
            cols="12"
            sm="10"
            md="8"
            lg="6"
            xl="4"
            class="black--text text-center mt-10"
          >
            <v-img
              :src="require('~/assets/images/me5e_logo_1200w.png')"
              alt="Mass Effect 5e logo"
              class="mt-10"
            />
            <h1 class="sr-only">
              {{ $t('title') }}
            </h1>
            <h2 class="black--text text-h6 mt-10">
              {{ $t('homepage.title') }}
            </h2>
            <p class="black--text text-subtitle-2">
              {{ $t('homepage.subtitle') }}
            </p>
            <v-btn :to="localePath('/manual/intro')" large color="secondary" class="my-3">
              {{ $t('homepage.get_started') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-parallax>
    </section>

    <section>
      <v-container>
        <v-row justify="center" class="mt-5">
          <v-col cols="12" sm="10" md="8" class="my-3 text-center">
            <h3 class="text-h6">
              {{ $t('homepage.begin') }}
            </h3>
            <p>
              {{ $t('homepage.begin_text') }}
            </p>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-5">
          <v-col cols="12" md="4">
            <v-card elevation="0" class="transparent">
              <v-card-text class="text-center">
                <v-avatar size="60px">
                  <v-img :src="require('~/assets/images/misc/sys_alliance.png')" alt="Systems Alliance Symbol by Engorn on DeviantArt" />
                </v-avatar>
                <span class="mx-2 text-h6"> + </span>
                <v-avatar size="60px" tile>
                  <v-img :src="require('~/assets/images/classes/vanguard.svg')" alt="Vanguard Symbol" />
                </v-avatar>
              </v-card-text>
              <v-card-title class="layout justify-center">
                {{ $t('homepage.info[0].title') }}
              </v-card-title>
              <v-card-text>
                {{ $t('homepage.info[0].text') }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card elevation="0" class="transparent">
              <v-card-text class="text-center">
                <slot name="avatar">
                  <v-avatar size="60px" color="primary">
                    <v-img :src="require('~/assets/images/misc/assault_rifle.svg')" alt="Assault Rifle SVG" />
                  </v-avatar>
                </slot>
              </v-card-text>
              <v-card-title class="layout justify-center">
                {{ $t('homepage.info[1].title') }}
              </v-card-title>
              <v-card-text>
                {{ $t('homepage.info[1].text') }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card elevation="0" class="transparent">
              <v-card-text class="text-center">
                <slot name="avatar">
                  <v-avatar size="60px">
                    <v-img :src="require('~/assets/images/misc/reaper_avatar.jpg')" alt="Reaper swarm" />
                  </v-avatar>
                </slot>
              </v-card-text>
              <v-card-title class="layout justify-center">
                {{ $t('homepage.info[2].title') }}
              </v-card-title>
              <v-card-text>
                {{ $t('homepage.info[2].text') }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section>
      <v-parallax
        :src="require('~/assets/images/parallax/joker.jpg')"
        alt="mass effect 2 by libbabink"
      >
        <v-row justify="center" align="center">
          <v-col
            cols="12"
            sm="10"
            md="8"
            lg="6"
            xl="4"
          >
            <h2 class="white--text text--shadow font-weight-bold text-h4 m-auto text-center">
              {{ $t('homepage.play_text') }}
            </h2>
          </v-col>
        </v-row>
      </v-parallax>
    </section>

    <section>
      <v-container>
        <v-row justify="start" class="mt-5">
          <v-col cols="12" class="my-3">
            <v-card elevation="0" class="transparent">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title>
                    {{ $t('homepage.features[0].title') }}
                  </v-card-title>
                  <v-card-text>
                    {{ $t('homepage.features[0].text') }}
                  </v-card-text>
                  <v-card-actions>
                    <v-btn :to="localePath('/manual/intro')" text>
                      {{ $t('homepage.features[0].button') }} <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-card-actions>
                </div>
                <v-avatar
                  v-if="$vuetify.breakpoint.mdAndUp"
                  class="ma-3"
                  size="300"
                  tile
                >
                  <v-img :src="require('~/assets/images/misc/datapad.png')" contain alt="data pad" />
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="end" class="mt-5">
          <v-col cols="12" class="my-3">
            <v-card elevation="0" class="transparent">
              <div class="d-flex flex-no-wrap justify-space-between">
                <v-avatar
                  v-if="$vuetify.breakpoint.mdAndUp"
                  class="ma-3"
                  size="300"
                  tile
                >
                  <v-img :src="require('~/assets/images/misc/tt_assets.png')" contain alt="assets preview" />
                </v-avatar>
                <div>
                  <v-card-title>
                    {{ $t('homepage.features[1].title') }}
                  </v-card-title>
                  <v-card-text>
                    {{ $t('homepage.features[1].text') }}
                  </v-card-text>
                  <v-card-actions>
                    <v-btn :to="localePath('/assets')" text>
                      {{ $t('homepage.features[1].button') }} <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-card-actions>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="start" class="mt-5">
          <v-col cols="12" class="my-3">
            <v-card elevation="0" class="transparent">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title>
                    {{ $t('homepage.features[2].title') }}
                  </v-card-title>
                  <v-card-text>
                    {{ $t('homepage.features[2].text') }}
                  </v-card-text>
                  <v-card-actions>
                    <v-btn :to="localePath('/about' )" text>
                      {{ $t('homepage.features[2].button') }} <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-card-actions>
                </div>
                <v-avatar
                  v-if="$vuetify.breakpoint.mdAndUp"
                  class="ma-3"
                  size="300"
                  tile
                >
                  <v-img :src="require('~/assets/images/misc/grunts.png')" contain alt="swarm of people" />
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section>
      <v-parallax
        :src="require('~/assets/images/parallax/illusive.jpg')"
        alt="The Illusive Man by libbabink"
      >
        <v-row justify="center" align="center">
          <v-col
            cols="12"
            sm="10"
            md="8"
            lg="6"
            xl="4"
          >
            <h2 class="white--text text--shadow font-weight-bold text-h4 m-auto text-center">
              {{ $t('homepage.news') }}
            </h2>
          </v-col>
        </v-row>
      </v-parallax>
    </section>

    <section>
      <v-container class="my-5">
        <v-row>
          <v-col cols="12" md="7">
            <me-news-card :news="recentPosts[0]" height="450px" />
          </v-col>
          <v-col cols="12" md="5">
            <v-row>
              <v-col cols="12">
                <me-news-card :news="recentPosts[1]" height="150px" />
              </v-col>
              <v-col cols="12">
                <me-news-card :news="recentPosts[2]" height="150px" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <me-news-card :news="recentPosts[3]" height="200px" />
          </v-col>
          <v-col cols="12" md="4">
            <me-news-card :news="recentPosts[4]" height="200px" />
          </v-col>
          <v-col cols="12" md="4">
            <me-news-card :news="recentPosts[5]" height="200px" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-footer
      padless
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-btn
          v-for="link in links"
          :key="link.to"
          text
          rounded
          class="my-2"
          :to="link.to"
        >
          {{ link.text }}
        </v-btn>
        <v-col
          class="py-4 text-center"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>N7 World</strong>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>

export default {
  data () {
    return {
      alert: true,
      recentPosts: [],
      links: [
        { to: '/legal/privacy', text: 'Privacy Policy' },
        { to: '/legal/terms', text: 'Terms of Service' },
        { to: '/legal/cookies', text: 'Cookie Policy' },
        { to: '/legal/acceptable-use', text: 'Acceptable Use' },
        { to: '/license', text: 'License' }
      ]
    }
  },
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: 'Mass Effect 5e',
      description: this.$t('meta.home')
    })
    const recentPosts = await this.$store.dispatch('FETCH_DATA', 'changelog')
    this.recentPosts = recentPosts.filter(i => !i.id.startsWith('april')).reverse().slice(0, 6)
  }
}
</script>
