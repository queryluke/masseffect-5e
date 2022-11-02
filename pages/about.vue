<template>
  <v-container style="max-width: 1200px">
    <section>
      <v-row justify="center">
        <v-col
          cols="12"
          sm="10"
          md="8"
          lg="6"
          xl="4"
          class="text-center mt-10 black--text"
        >
          <v-img
            :src="require('~/assets/images/me5e_logo_1200w.png')"
            alt="Mass Effect 5e logo"
            class="mt-10"
          >
            <h1 class="sr-only">
              {{ $t('title') }}
            </h1>
          </v-img>
        </v-col>
      </v-row>
    </section>
    <section>
      <v-container>
        <v-row justify="center" class="mt-5">
          <v-col cols="12" sm="10" md="8" class="my-3">
            <div class="text-center">
              <h2 class="text-h4">
                {{ $t('buttons.join_community') }}
              </h2>
            </div>
          </v-col>
        </v-row>
        <v-row justify="space-around" class="mt-5">
          <v-col
            v-for="community in communities"
            :key="community.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card :href="community.link" target="_blank" dark class="text-center">
              <v-card-text>
                <v-img :src="require(`~/assets/images/misc/${community.image}`)" :alt="community.alt" height="80" contain />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="space-around" class="mt-5">
          <v-col cols="12" md="8" lg="6">
            <v-alert type="error" prominent>
              <v-row align="center">
                <v-col class="grow">
                  {{ $t('aboutpage.bug_text') }}
                </v-col>
                <v-col class="shrink">
                  <v-btn href="https://forms.gle/JtGQqS9KxVFQGtAq7" target="_blank">
                    {{ $t('buttons.bug') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-15">
          <v-col cols="12" sm="10" md="8" class="my-3">
            <div class="text-center">
              <h2 class="text-h4">
                {{ $t('aboutpage.about_me5e_title') }}
              </h2>
              <p>
                {{ $t('aboutpage.about_text') }}
              </p>
            </div>
          </v-col>
        </v-row>
        <!-- current -->
        <v-row justify="center">
          <v-col cols="12">
            <p class="text-h5">
              {{ $t('aboutpage.contributors_title') }}
            </p>
            <p>
              {{ $t('aboutpage.contributors_text') }}
            </p>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            v-for="person in current"
            :key="person.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card elevation="0" color="transparent" class="text-center">
              <v-card-text>
                <v-avatar size="92">
                  <v-img :src="person.image" :alt="person.name" />
                </v-avatar>
                <p class="text-center text-h6 mb-1">
                  {{ person.name }}
                </p>
                <p class="text-subtitle-1">
                  {{ aboutPageRoles(person) }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <!-- past -->
        <v-row justify="center">
          <v-col cols="12">
            <p class="text-h5">
              {{ $t('aboutpage.former_contributors_title') }}
            </p>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            v-for="person in former"
            :key="person.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card elevation="0" color="transparent" class="text-center">
              <v-card-text>
                <v-avatar size="92">
                  <v-img :src="person.image" :alt="person.name" />
                </v-avatar>
                <p class="text-center text-h6 mb-1">
                  {{ person.name }}
                </p>
                <p class="text-subtitle-1">
                  {{ $t(`aboutpage.roles.${person.roles}`) }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12">
            <p class="text-h5">
              {{ $t('aboutpage.shoutouts_title') }}
            </p>
            <p>
              {{ $t('aboutpage.shoutouts_text') }}
            </p>
            <v-row>
              <v-col>
                <v-alert type="info">
                  <v-row align="center">
                    <v-col class="grow">
                      Special shout-out to StrayChowChow for letting us use the descriptions and traits from <em>Races of the Relay</em>!
                      If you can't convince your group to play in a sci-fi setting and want to bring a little Mass Effect to
                      your D&D 5e game, you should definitely check it out!
                    </v-col>
                    <v-col class="shrink">
                      <v-btn href="https://www.gmbinder.com/share/-L7HA1pIhxcx3bVb8vqf" target="_blank">
                        Races of the Relay
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-alert>
              </v-col>
            </v-row>
            <p>
              {{ shoutouts.join(', ') }}, {{ $t('aboutpage.all_others') }}
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section>
      <v-container>
        <v-row justify="center" class="mt-15">
          <v-col cols="12">
            <p class="text-h4">
              {{ $t('aboutpage.image_attributions_title') }}
            </p>
            <p>
              {{ $t('aboutpage.image_attributions_text') }}
              <a href="http://masseffect.wikia.com/wiki/Mass_Effect_Wiki" target="_blank">
                <v-icon size="18">mdi-open-in-new</v-icon>
              </a>
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="att in attributions"
            :key="att.attribution"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card :href="att.source" :alt="att.title" target="_blank" hover>
              <v-img :src="att.path" height="200px" contain class="blue-grey ligthen-5" />
              <v-card-title color="grey darken-3">
                {{ att.attribution }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-container>
</template>

<script>
export default {
  async asyncData ({ store, i18n }) {
    store.dispatch('SET_META', {
      title: i18n.tc('about_title', 2),
      description: i18n.t('meta.about')
    })
    await store.dispatch('FETCH_LOTS', ['about', 'attributions'])
  },
  data () {
    return {
      communities: [
        {
          name: 'Discord',
          image: 'discord.svg',
          alt: 'Discord Logo',
          link: 'https://discord.gg/c2UnqkH'
        },
        {
          name: 'Reddit',
          image: 'Reddit_Lockup_OnDark.svg',
          alt: 'Reddit Logo',
          link: 'https://www.reddit.com/r/masseffect5e/'
        }
      ]
    }
  },
  computed: {
    shoutouts () {
      return this.$store.getters.getData('about').shoutouts
    },
    current () {
      return this.$store.getters.getData('about').current
    },
    former () {
      return this.$store.getters.getData('about').former
    },
    attributions () {
      return this.$store.getters.getData('attributions')
    }
  },
  methods: {
    aboutPageRoles (person) {
      return person.roles.map(i => this.$t(`aboutpage.roles.${i}`)).join(', ')
    }
  }

}
</script>
