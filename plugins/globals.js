import Vue from 'vue'
import MarkdownFile from '~/components/MarkdownFile.vue'
import MarkdownContent from '~/components/MarkdownContent.vue'
import GalaxyMap from '~/components/rule_partials/GalaxyMap.vue'
import MeHeaderLogo from '~/components/MeHeaderLogo'
import SimpleCard from '~/components/cards/SimpleCard'
import AiDialog from '~/components/rule_partials/AdditionalInformationDialog'

// Because Vue-loader dynamically adds vue components as needed
// Any vue components used in the .md files need to be loaded globally
// TODO: Reduce these where possible
import VChip from 'vuetify/lib/components/VChip'
import VAlert from 'vuetify/lib/components/VAlert'
import VBtn from 'vuetify/lib/components/VBtn'
import VIcon from 'vuetify/lib/components/VIcon'

Vue.component('markdown-file', MarkdownFile)
Vue.component('markdown-content', MarkdownContent)
Vue.component('galaxy-map', GalaxyMap)
Vue.component('me-header-logo', MeHeaderLogo)
Vue.component('v-chip', VChip)
Vue.component('v-alert', VAlert)
Vue.component('v-btn', VBtn)
Vue.component('v-icon', VIcon)
Vue.component('simple-card', SimpleCard)
Vue.component('ai-dialog', AiDialog)

