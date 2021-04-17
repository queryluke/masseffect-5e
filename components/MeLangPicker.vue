<template>
  <v-menu offset-y>
    <template #activator="{ on, attrs }">
      <v-list-item v-if="activator === 'listItem'" v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title class="text-uppercase">
            {{ $t('settings.language') }}: {{ currentLocale }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>
            mdi-menu-down
          </v-icon>
        </v-list-item-action>
      </v-list-item>
      <v-btn
        v-else
        text
        v-bind="attrs"
        v-on="on"
      >
        {{ currentLocale }} <v-icon>mdi-menu-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(locale, index) in availableLocales"
        :key="index"
        @click="$i18n.setLocale(locale.code)"
      >
        <v-list-item-title class="text-uppercase">
          {{ locale.code }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'MeLangPicker',
  props: {
    activator: {
      type: String,
      default: 'button'
    }
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    currentLocale () {
      return this.$i18n.locale
    }
  }
}
</script>
