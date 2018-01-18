import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

// Theme
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';
require('./stylus/main.styl');
Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken4,
    accent: colors.red.darken1,
    secondary: colors.indigo.darken4,
    info: colors.blue.lighten2,
    warning: colors.amber.base,
    error: colors.red.accent2,
    success: colors.green.base
  }
});

// Vue 1 filters
import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);

import store from './store';
import router from './routes';

export default new Vue({
  el: '#root',
  router,
  store,
  render: h => h('router-view')
});
