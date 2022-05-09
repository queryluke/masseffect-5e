<template>
  <div>
    <section>
      <v-parallax src="/images/parallax/critical_mission_failure.jpg">
        <div style="height: 500px" />
      </v-parallax>
    </section>
    <section>
      <v-container>
        <v-row justify="space-around">
          <v-col class="text-center">
            <v-btn to="/manual/intro" nuxt>
              Resume
            </v-btn>
          </v-col>
          <v-col class="text-center">
            <v-btn href="https://forms.gle/JtGQqS9KxVFQGtAq7" target="_blank">
              {{ $t('buttons.bug') }}
            </v-btn>
          </v-col>
        </v-row>
        <div class="text-center text-caption mt-3">
          (There was an issue with the website, please try refreshing the page or filling out a bug report)
        </div>
      </v-container>
    </section>
  </div>
</template>

<script>

import { MetaHead } from '~/mixins/MetaHead'

export default {
  mixins: MetaHead,
  props: {
    error: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>
