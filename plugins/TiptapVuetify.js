import Vue from 'vue'
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'

Vue.use(TiptapVuetifyPlugin, {
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: 'md'
})

/*
export default ({ app }) => {

  Vue.use(TiptapVuetifyPlugin, {
    vuetify: Vue.prototype.$vuetify,
    iconsGroup: 'mdi'
  })
}
*/
