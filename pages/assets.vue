<template>
  <v-container>
    <me-page-title />
    <v-alert :value="true" type="info" class="mt-8">
      {{ $t('assetspage.file_use_note') }}
    </v-alert>
    <v-row class="mt-8">
      <v-col
        v-for="(item, index) in items"
        :key="index"
        cols="12"
        md="6"
        lg="4"
        xl="3"
      >
        <v-card
          hover
          :to="item.to ? localePath(item.to) : undefined"
          :nuxt="typeof item.to !== 'undefined'"
          :href="item.link ? item.link : undefined"
          :target="item.link ? '_blank' : undefined"
        >
          <v-card-title>{{ $t(`assetspage.items.${item.id}.title`) }}</v-card-title>
          <v-card-text>
            {{ $t(`assetspage.items.${item.id}.description`) }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              :to="item.to ? item.to : undefined"
              :nuxt="typeof item.to !== 'undefined'"
              :href="item.link ? item.link : undefined"
              :target="item.link ? '_blank' : undefined"
            >
              {{ $t('buttons.view') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      items: [
        {
          id: 'pdf',
          to: '/print/pdf'
        },
        {
          id: 'power_cards',
          link: 'https://drive.google.com/drive/folders/1kGqRyRax980-B7MJ0C85SmijLPMI_FXv?usp=sharing'
        },
        {
          id: 'character_sheet',
          link: 'https://drive.google.com/drive/folders/1RsYfHzmvv-md8_dIrQU65LpWzTr0kpCR?usp=sharing'
        },
        {
          id: 'missions',
          link: 'https://drive.google.com/drive/u/0/folders/1B6KHBiOIWvtOzhqdxXryzZ3WMVAjpWMt'
        },
        {
          id: 'everything_else',
          link: 'https://drive.google.com/drive/u/0/folders/10S3R_Tfi4bJ9X2b6-4OI65m9F8fx6i0P'
        }
      ]
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: this.$tc('assets_title', 2),
      description: this.$t('meta.assets')
    })
  }
}
</script>
