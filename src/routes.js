import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// Layout
import PHB from './containers/PHB.vue';
import Default from './containers/Default.vue';

// Pages
import About from './pages/About.vue';
import Armor from './pages/Armor.vue';
import ArmorMods from './pages/ArmorMods.vue';
import ArmorSets from './pages/ArmorSets.vue';
import Backgrounds from './pages/Backgrounds.vue';
import Bookmarks from './pages/Bookmarks.vue';
import Bestiary from './pages/Bestiary.vue';
import Classes from './pages/Classes.vue';
import ClassView from './pages/ClassView.vue';
import Conditions from './pages/Conditions.vue';
import Consumables from './pages/Consumables.vue';
import Encounter from './pages/Encounter.vue';
import Feats from './pages/Feats.vue';
import General from './pages/General.vue';
import Grenades from './pages/Grenades.vue';
import Grunts from './pages/Grunts.vue';
import Home from './pages/Home.vue';
import Race from './pages/Race.vue';
import Races from './pages/Races.vue';
import Skills from './pages/Skills.vue';
import Spells from './pages/Spells.vue';
import Spellcasting from './pages/Spellcasting.vue';
import ThermalClips from './pages/ThermalClips.vue';
import Weapons from './pages/Weapons.vue';
import WeaponRules from './pages/WeaponRules.vue';

// Helper functions
function documentTitle(pageTitle, secondaryKeyword = null) {
  const brandName = 'Mass Effect 5e';
  secondaryKeyword = secondaryKeyword ? ` - ${secondaryKeyword}` : '';
  return `${brandName} | ${pageTitle}${secondaryKeyword}`;
}
function toTitleCase(id) {
  return id.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}

// routes
const routes = [
  {path: '/', component: Default, redirect: '/',
    children: [
      {path: '', component: Home, meta: {title: documentTitle('Mass Effect 5e')}},
      {path: 'about', component: About, meta: {title: documentTitle('About Mass Effect 5e')}}
    ]
  },
  {path: '/phb', component: PHB,
    children: [
      {path: 'armor/mods', component: ArmorMods, meta: {title: documentTitle('Armor Mods', 'Equipment')}},
      {path: 'armor/sets', component: ArmorSets, meta: {title: documentTitle('Armor Sets', 'Equipment')}},
      {path: 'backgrounds', component: Backgrounds, meta: {title: documentTitle('Backgrounds', 'Player Options')}},
      {path: 'bestiary', component: Bestiary, title: 'Bestiary', meta: {title: documentTitle('Bestiary')}},
      {path: 'bookmarks', component: Bookmarks, title: 'Bookmarks', meta: {title: documentTitle('Bookmarks')}},
      {path: 'classes', component: Classes, title: 'Classes', meta: {title: documentTitle('Classes', 'Player Options')}},
      {path: 'classes/:id', component: ClassView, name: 'class', props: true, meta: {title: documentTitle('', 'Class')}},
      {path: 'conditions', component: Conditions, meta: {title: documentTitle('Conditions', 'References')}},
      {path: 'feats', component: Feats, meta: {title: documentTitle('Feats', 'Player Options')}},
      {path: 'grenades', component: Grenades, meta: {title: documentTitle('Grenades & Mines', 'Equipment')}},
      {path: 'races', component: Races, name: 'races', meta: {title: documentTitle('Races', 'Player Options')}},
      {path: 'races/:id', component: Race, name: 'race', props: true, meta: {title: documentTitle('', 'Race')}},
      {path: 'skills', component: Skills, meta: {title: documentTitle('Skills', 'Reference')}},
      {path: 'spells', component: Spells, meta: {title: documentTitle('Spells', 'Reference')}},
      {path: 'thermal-clips', component: ThermalClips, meta: {title: documentTitle('Thermal Clips', 'Equipment')}},
      {path: 'weapons', component: Weapons, meta: {title: documentTitle('Weapons', 'Equipment')}},
      {path: 'rules/general', component: General, meta: {title: documentTitle('General', 'Rules')}},
      {path: 'rules/weapons', component: WeaponRules, meta: {title: documentTitle('Weapons', 'Rules')}},
      {path: 'rules/armor', component: Armor, meta: {title: documentTitle('Armor', 'Rules')}},
      {path: 'rules/consumables', component: Consumables, meta: {title: documentTitle('Consumables', 'Rules')}},
      {path: 'rules/spellcasting', component: Spellcasting, meta: {title: documentTitle('Spellcasting', 'Rules')}}
    ]
  },
  {path: '/gm-tools', component: PHB,
    children: [
      {path: 'grunts', component: Grunts, meta: {title: documentTitle('Grunt Generator', 'GM Tools')}},
      {path: 'encounter', component: Encounter, name: 'encounter', meta: {title: documentTitle('Encounter Maker', 'GM Tools')}}
    ]
  }
];

const router = new Router({
  mode: 'hash',
  routes
});

// Set page metadata
router.beforeEach((to, from, next) => {
  if (['class', 'race', 'spell', 'weapon'].includes(to.name)) {
    document.title = documentTitle(toTitleCase(to.params.id), toTitleCase(to.name));
  } else {
    document.title = to.meta.title;
  }
  next();
});

// Analytics tracking
import VueAnalytics from 'vue-analytics';
Vue.use(VueAnalytics, {
  id: 'UA-83740704-2',
  router,
  autoTracking: {
    pageviewTemplate(route) {
      return {
        page: route.path,
        title: document.title,
        location: window.location.href
      };
    }
  }
});

export default router;
