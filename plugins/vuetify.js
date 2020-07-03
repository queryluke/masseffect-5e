import Vue from 'vue'
import Vuetify, {
  VApp, // required
  VTooltip,
  VToolbar,
  VCard,
  VIcon,
  VBtn
} from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken4,
    accent: colors.red.darken1,
    secondary: colors.indigo.darken4,
    info: colors.blue.darken2,
    warning: colors.amber.base,
    error: colors.red.accent2,
    success: colors.green.base
  },
  components: {
    VTooltip,
    VToolbar,
    VCard,
    VIcon,
    VBtn
  }
})
