webpackJsonp([8],{"+Noj":function(t,e,s){(t.exports=s("FZ+f")(!1)).push([t.i,".spell-icon{width:25px;display:inline-block;vertical-align:middle}",""])},"+ZLu":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mb-3"},["innate"===t.stats.techcasting.level?s("div",[s("p",{staticClass:"mb-0"},[t._m(0),t._v(". The "+t._s(t.stats.name)+"'s innate tech ability is Intelligence (spell save DC\n"+t._s(t.stats.techcasting.dc)+", +"+t._s(t.stats.techcasting.hit)+" to hit with tech attacks). It can innately cast the following for\n"+t._s(t.stats.techcasting.tpSpent)+" tech "+t._s(t._f("pluralize")(t.stats.techcasting.tpSpent,"point"))+":")]),s("p",{staticClass:"my-0"},[t._v(t._s(t.stats.techcasting.perDay?t.stats.techcasting.perDay+"/Day":"Recharge 4-6")+": "),s("em",[t._v(t._s(t.stats.techcasting.spells.map(function(t){return t.name}).join(", ")))])])]):s("div",[s("p",{staticClass:"mb-1"},[s("strong",[s("em",[t._v("Tech Powers ("+t._s(t.stats.techcasting.perDay)+"/Day)")]),t._v(".")]),t._v(" The "+t._s(t.stats.name)+" can cast "+t._s(t.stats.techcasting.perDay)+"\ntech "+t._s(t._f("pluralize")(t.stats.techcasting.perDay,"power"))+" from the following list per day. When it casts a tech power that requires X tech points, it casts the power with\n"+t._s(t.stats.techcasting.tpSpent)+" tech "+t._s(t._f("pluralize")(t.stats.techcasting.tpSpent,"point"))+". Its tech ability is Intelligence (spell save DC "+t._s(t.stats.techcasting.dc)+",\n+"+t._s(t.stats.techcasting.hit)+" to hit with tech attacks).")]),s("p",{staticClass:"my-0"},[t._v("Known tech powers: "),s("em",[t._v(t._s(t.stats.techcasting.spells.map(function(t){return t.name}).join(", ")))])])])])};a._withStripped=!0;var n={render:a,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("strong",[e("em",[this._v("Innate Tech")])])}]};e.a=n},"/tKz":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return"damage"===t.spell.effect[0]?s("span",[t._v("\n  "+t._s(t.spell.damage_type[0])+"\n  "),t.spell.damage_type.length>1||t.spell.effect.length>1?s("span",[t._v("(...)")]):t._e()]):s("span",[t._v("\n  "+t._s(t.spell.effect[0])+"\n  "),t.spell.effect.length>1?s("span",[t._v("(...)")]):t._e()])};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n},"/uuP":function(t,e,s){var a=s("CfBL");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("rjj0")("b6ceacce",a,!1,{sourceMap:!1})},"20iW":function(t,e,s){var a=s("W8Nb");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("rjj0")("44a4de10",a,!1,{sourceMap:!1})},"2H9w":function(t,e,s){"use strict";e.a={props:["stats"]}},"4Q3o":function(t,e,s){"use strict";var a=s("Dd8w"),n=s.n(a),i=s("NYxO"),l=s("nOBh"),r=s("7Z5E"),c=s("DsZQ"),o=s("ExWu"),p=s("dUT3");e.a={components:{GrenadeInfo:p.a,StatBlock:o.a,SpellInfo:l.a,WeaponInfo:r.a,BookmarkButton:c.a},computed:n()({},Object(i.mapGetters)(["bookmarksGroupedByType"])),head:function(){return{title:"Mass Effect 5e | Player's Handbook - Bookmarks",meta:[{hid:"description",name:"description",content:"Keep your favorite weapons, enemies, and spells close at hand with our nifty bookmark tool."}]}},layout:"phb"}},"6dm0":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.spell.concentration?s("span",[t.verbose?s("span",[t._v("Concentration, up to")]):s("img",{staticClass:"con-icon",attrs:{src:"/images/c.svg",alt:"Concentration",title:"Concentration"}}),t._v(" "+t._s(t.spell.duration)+"\n")]):s("span",[t._v("\n  "+t._s(t.spell.duration)+"\n")])};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n},"7Z5E":function(t,e,s){"use strict";var a=s("ZVGc"),n=s("mxj+"),i=s("VU/8")(a.a,n.a,!1,null,null,null);i.options.__file="components/shared/WeaponInfo.vue",e.a=i.exports},"7fpg":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",t._l(t.text,function(e){return s("div",{key:e.id},["table"===e.type?s("table",{staticClass:"table alt-table"},[s("thead",[s("tr",{staticClass:"text-xs-left"},t._l(e.data.headers,function(e){return s("th",[t._v(t._s(e))])}))]),s("tbody",t._l(e.data.items,function(e){return s("tr",t._l(e,function(t){return s("td",[s("me-text",{attrs:{text:t}})],1)}))}))]):"list"===e.type?s("ul",{staticClass:"ml-3"},t._l(e.data,function(t){return s("li",[s("me-text",{attrs:{text:t}})],1)})):s("p",[s("me-text",{attrs:{text:e.data}})],1)])}))};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n},"81Kz":function(t,e,s){"use strict";var a=s("cBDT"),n=s("o4K1"),i=s("VU/8")(a.a,n.a,!1,null,null,null);i.options.__file="components/shared/AdvancedOption.vue",e.a=i.exports},"8ucx":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mb-3"},["innate"===t.stats.spellcasting.level?s("div",[s("p",{staticClass:"mb-0"},[t._m(0),t._v(". The "+t._s(t.stats.name)+"'s innate biotic ability is "+t._s(t.stats.spellcasting.mod)+" (spell save DC\n"+t._s(t.stats.spellcasting.dc)+", +"+t._s(t.stats.spellcasting.hit)+" to hit with biotic attacks). It can innately cast the following:")]),t._l(t.stats.spellcasting.spells,function(e,a){return s("div",{key:a},["cantrip"===e.level?s("p",{staticClass:"my-0"},[t._v("At will: "),s("em",[t._v(t._s(e.spells.map(function(t){return t.name.toLowerCase()}).join(", ")))])]):s("p",{staticClass:"my-0"},[t._v(t._s(e.level)+"/day each"),e.spells.length>0?s("span",[t._v(": "),s("em",[t._v(t._s(e.spells.map(function(t){return t.name.toLowerCase()}).join(", ")))])]):t._e()])])})],2):s("div",[s("p",{staticClass:"mb-0"},[t._m(1),t._v(" The "+t._s(t.stats.name)+" is "+t._s(t._f("article")(t.stats.spellcasting.level))+" "+t._s(t._f("ordinal")(t.stats.spellcasting.level))+"-level\nbiotic. Its biotic ability is "+t._s(t.stats.spellcasting.mod)+" (spell save DC "+t._s(t.stats.spellcasting.dc)+", +"+t._s(t.stats.spellcasting.hit)+" to hit with spell attacks).\nThe "+t._s(t.stats.name)+" has the following biotic spells:")]),t._l(t.stats.spellcasting.spells,function(e,a){return s("div",{key:a},["cantrip"===e.level?s("p",{staticClass:"my-0"},[t._v("Cantrips (at will): "),s("em",[t._v(t._s(e.spells.map(function(t){return t.name.toLowerCase()}).join(", ")))])]):s("p",{staticClass:"my-0"},[t._v(t._s(t._f("ordinal")(e.level))+" level ("+t._s(e.slots)+" "+t._s(t._f("pluralize")(e.slots,"slot"))+")"),e.spells.length>0?s("span",[t._v(": "),s("em",[t._v(t._s(e.spells.map(function(t){return t.name.toLowerCase()}).join(", ")))])]):t._e()])])})],2)])};a._withStripped=!0;var n={render:a,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("strong",[e("em",[this._v("Innate Biotics")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("strong",[e("em",[this._v("Biotics")]),this._v(".")])}]};e.a=n},"9moa":function(t,e,s){"use strict";var a=s("vFj+"),n=s("Pg2G"),i=s("xGue"),l=s("Fa3L"),r=s("TLcg"),c=s("TKcB");e.a={components:{NpcAttack:l.a,NpcCommonFeature:i.a,NpcBiotics:r.a,NpcTech:c.a},computed:{skills:function(){return!(!this.stats.skills||!this.stats.skills.length)&&this.stats.skills.map(function(t){return t.name+" +"+t.bonus}).join(", ")}},methods:{renderPoints:function(t){if(t){var e="";return t.mod>0?e=" + "+t.mod:t.mod<0&&(e=" - "+-1*t.mod),t.average+" ("+t.numDice+"d"+t.die+e+")"}return"0"},hasFeature:function(t){return this.stats[t]&&this.stats[t].length>0}},mixins:[a.a,n.a],props:["stats"]}},A8a0:function(t,e,s){"use strict";e.a={props:["feature","npc"]}},AC9q:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("v-layout",[s("v-flex",{staticClass:"xs12 sm6"},[s("p",{staticClass:"title"},[t._v(t._s(t.spell.name))]),s("p",[t.spell.primes?s("span",{class:t.primeTypeCss[t.spell.primes]},[s("strong",[t._v("Primes ("+t._s(t.spell.primes)+")")])]):t._e(),t.spell.primes&&t.spell.detonates?s("span",{staticClass:"mx-2"},[t._v("|")]):t._e(),t.spell.detonates?s("span",{staticClass:"primary--text"},[s("strong",[t._v("Detonates")])]):t._e()])]),s("v-flex",{staticClass:"xs12 sm6"},[s("spell-class-list",{attrs:{spell:t.spell}})],1)],1),s("v-layout",{attrs:{row:"",wrap:"","flex-start":""}},[s("v-flex",{staticClass:"xs12 sm4 md3 attribute mb-2"},[s("label",[t._v("Type")]),s("div",[s("spell-type",{attrs:{spell:t.spell}})],1)]),s("v-flex",{staticClass:"xs12 sm4 md3 attribute mb-2"},[s("label",[t._v("Casting Time")]),s("div",[t._v(t._s(t.spell.casting_time))])]),s("v-flex",{staticClass:"xs12 sm4 md3 attribute mb-2"},[s("label",[t._v("Duration")]),s("div",[s("spell-duration",{attrs:{spell:t.spell}})],1)]),s("v-flex",{staticClass:"xs12 sm4 md3 attribute mb-2"},[s("label",[t._v("Range/Area")]),s("div",[s("spell-range-area",{attrs:{spell:t.spell}})],1)]),s("v-flex",{staticClass:"xs12 sm4 md3 attribute mb-2"},[s("label",[t._v("Attack Type")]),s("ul",{staticClass:"list-unstyled"},t._l(t.spell.attack_type,function(e){return s("li",{key:e},[t._v(t._s(e))])}))]),s("v-flex",{staticClass:"xs12 sm4 md3 attribute mb-2"},[s("label",[t._v("Damage Type")]),s("ul",{staticClass:"list-unstyled"},t._l(t.spell.damage_type,function(e){return s("li",{key:e},[t._v(t._s(e))])}))]),s("v-flex",{staticClass:"xs12 sm4 md3 attribute mb-2"},[s("label",[t._v("Effect")]),s("ul",t._l(t.spell.effect,function(e){return s("li",{key:e},[t._v(t._s(e))])}))])],1),s("div",{staticClass:"hr"}),s("div",{staticClass:"mt-3"},[s("me-element",{attrs:{text:t.spell.mechanic}}),s("p",{staticClass:"title"},[t._v("Advancement Options")]),s("v-layout",{attrs:{row:"",wrap:"","justify-space-around":""}},t._l(t.spell.adv_options,function(t,e){return s("v-flex",{key:e,staticClass:"xs12 md6"},[s("advanced-option",{attrs:{option:t}})],1)}))],1)],1)};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n},AoFd:function(t,e,s){"use strict";var a=s("Mooa"),n=s("/tKz"),i=s("VU/8")(a.a,n.a,!1,null,null,null);i.options.__file="components/shared/SpellDamageEffect.vue",e.a=i.exports},B2XJ:function(t,e,s){"use strict";var a=s("rCtt"),n=s("mzRc"),i=s("Qpt2"),l=s("AoFd"),r=s("81Kz"),c=s("bGpG"),o=s("meh3");e.a={components:{SpellClassList:c.a,AdvancedOption:r.a,SpellType:a.a,SpellDuration:n.a,SpellRangeArea:i.a,SpellDamageEffect:l.a,MeElement:o.a},data:function(){return{primeTypeCss:{force:"purple--text text--darken-1",necrotic:"blue-grey--text text--darken-2",fire:"deep-orange--text text--darken-1",cold:"cyan--text text--darken-1",lightning:"blue--text text--darken-1"}}},props:["spell"]}},CfBL:function(t,e,s){(t.exports=s("FZ+f")(!1)).push([t.i,".me-icon{width:100%}",""])},"CxH+":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",[t.isBookmarked(t.card)?s("v-btn",t._b({attrs:{color:"grey darken-3"},on:{click:function(e){t.removeBookmark({card:t.card,type:t.type})}}},"v-btn",t.props,!1),[s("v-icon",{attrs:{left:""}},[t._v("delete")]),s("span",[t._v("Remove Bookmark")])],1):s("v-btn",t._b({attrs:{color:"primary"},on:{click:function(e){t.addBookmark({card:t.card,type:t.type})}}},"v-btn",t.props,!1),[s("v-icon",{attrs:{left:""}},[t._v("bookmark")]),s("span",[t._v("Bookmark")])],1)],1)};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n},"D/cY":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("4Q3o"),n=s("i9Kg"),i=s("VU/8")(a.a,n.a,!1,null,null,null);i.options.__file="pages/phb/bookmarks.vue",e.default=i.exports},DAzh:function(t,e,s){var a=s("+Noj");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("rjj0")("b25c1f80",a,!1,{sourceMap:!1})},DUmr:function(t,e,s){(t.exports=s("FZ+f")(!1)).push([t.i,".spell-class-list .class-icon{width:50px;height:50px;vertical-align:middle}",""])},DsZQ:function(t,e,s){"use strict";var a=s("ynjy"),n=s("CxH+"),i=s("VU/8")(a.a,n.a,!1,null,null,null);i.options.__file="components/shared/BookmarkButton.vue",e.a=i.exports},ExWu:function(t,e,s){"use strict";var a=s("9moa"),n=s("LaDC"),i=s("VU/8")(a.a,n.a,!1,null,null,null);i.options.__file="components/shared/StatBlock.vue",e.a=i.exports},Fa3L:function(t,e,s){"use strict";var a=s("zTpo"),n=s("Pn0j"),i=s("VU/8")(a.a,n.a,!1,null,null,null);i.options.__file="components/shared/NpcFeatures/NpcAttack.vue",e.a=i.exports},GiRZ:function(t,e,s){"use strict";var a=s("rhbY"),n=s("XjHt"),i=!1;var l=function(t){i||s("/uuP")},r=s("VU/8")(a.a,n.a,!1,l,null,null);r.options.__file="components/shared/MeIcon.vue",e.a=r.exports},Gidd:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("v-layout",[s("v-flex",{staticClass:"xs12 sm6"},[s("h4",[t._v(t._s(t.grenade.name))])])],1),s("v-layout",{attrs:{row:"",wrap:"","flex-start":""}},[s("v-flex",{staticClass:"xs12 md3 attribute mb-2"},[s("label",[t._v("Intensity")]),s("div",[t._v(t._s(t.grenade.damage_amount)+t._s(t.grenade.dd))])]),s("v-flex",{staticClass:"xs12 md3 attribute mb-2"},[s("label",[t._v("Damage/Effect")]),s("div",[t._v(t._s(t.grenade.damage_type))])]),s("v-flex",{staticClass:"xs12 md3 attribute mb-2"},[s("label",[t._v("Range")]),s("div",[t._v(t._s(t.grenade.range))])]),s("v-flex",{staticClass:"xs12 md3 attribute mb-2"},[s("label",[t._v("Blast")]),s("div",[t._v(t._s(t.grenade.blast))])])],1),s("div",{staticClass:"hr"}),s("div",{staticClass:"mt-3"},[s("me-element",{attrs:{text:t.grenade.desc}})],1)],1)};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n},LaDC:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"pb-0"},[s("p",{staticClass:"red--text text--darken-4 headline small-caps mb-0"},[s("strong",[t._v(t._s(t.stats.name))])]),s("p",[s("em",[t._v(t._s(t.stats.size)+" "+t._s(t.stats.type)+", "+t._s(t.stats.alignment))])])]),s("div",{staticClass:"pt-0",staticStyle:{position:"relative"}},[s("div",{staticClass:"hr"}),s("ul",{staticClass:"list-unstyled"},[s("li",[s("strong",[t._v("Armor Class")]),t._v(" "+t._s(t.stats.ac))]),s("li",[s("strong",[t._v("Hit Points")]),t._v(" "+t._s(t.renderPoints(t.stats.hp)))]),t.stats.sp?s("li",[s("strong",[t._v("Shield Points")]),t._v(" "+t._s(t.stats.sp.shields)+" ("+t._s(t.stats.sp.regen)+" regen)")]):t._e(),t.stats.barrier?s("li",[s("strong",[t._v("Barrier")]),t._v(" "+t._s(t.stats.barrier)+" "+t._s(t._f("pluralize")(t.stats.barrier,"tick")))]):t._e(),s("li",[s("strong",[t._v("Speed")]),t._v(" "+t._s(t.stats.speed))])]),s("div",{staticClass:"hr"}),s("v-container",{staticClass:"py-0"},[s("v-layout",t._l(t.stats.abilityScores,function(e,a){return s("v-flex",{key:a,staticClass:"text-xs-center",attrs:{xs2:""}},[s("p",{staticClass:"ma-0"},[s("strong",[t._v(t._s(a.toUpperCase()))])]),s("p",{staticClass:"ma-0"},[t._v(t._s(e)+" ("+t._s(t._f("abilityBonus")(e))+")")])])}))],1),s("div",{staticClass:"hr"}),s("ul",{staticClass:"list-unstyled"},[t.hasFeature("savingThrows")?s("li",[s("strong",[t._v("Saving Throws")]),t._v(" "+t._s(t._f("npcSavingThrows")(t.stats)))]):t._e(),t.skills?s("li",[s("strong",[t._v("Skills")]),t._v(" "+t._s(t.skills))]):t._e(),t.hasFeature("damageVulnerabilities")?s("li",[s("strong",[t._v("Damage Vulnerabilities")]),t._v(" "+t._s(t.stats.damageVulnerabilities.join(", ")))]):t._e(),t.hasFeature("damageResistances")?s("li",[s("strong",[t._v("Damage Resistances")]),t._v(" "+t._s(t.stats.damageResistances.join(", ")))]):t._e(),t.hasFeature("damageImmunities")?s("li",[s("strong",[t._v("Damage Immunities")]),t._v(" "+t._s(t.stats.damageImmunities.join(", ")))]):t._e(),t.hasFeature("conditionImmunities")?s("li",[s("strong",[t._v("Condition Immunities")]),t._v(" "+t._s(t.stats.conditionImmunities.join(", ")))]):t._e(),t.hasFeature("senses")?s("li",[s("strong",[t._v("Senses")]),t._v(" "+t._s(t.stats.senses.join(", ")))]):t._e(),s("li",[s("strong",[t._v("Challenge")]),t._v(" "+t._s(t.stats.cr)+" ("+t._s(t.stats.xp)+" XP)")])]),s("div",{staticClass:"hr"}),t._l(t.stats.features,function(e){return s("p",{key:e.id},[s("npc-common-feature",{attrs:{feature:e,npc:t.stats}})],1)}),t.stats.spellcasting?s("npc-biotics",{attrs:{stats:t.stats}}):t._e(),t.stats.techcasting?s("npc-tech",{attrs:{stats:t.stats}}):t._e(),t.hasFeature("actions")?s("p",{staticClass:"title underline-heading small-caps"},[t._v("Actions")]):t._e(),t._l(t.stats.actions,function(e,a){return s("div",{key:a},["attack"===e.type?s("div",[s("npc-attack",{attrs:{feature:e,npc:t.stats}})],1):"common"===e.type?s("p",[s("npc-common-feature",{attrs:{feature:e,npc:t.stats}})],1):t._e()])}),t.hasFeature("legendaryActions")?s("div",[s("p",{staticClass:"title underline-heading small-caps"},[t._v("Legendary Actions")]),s("p",[t._v("The "+t._s(t.stats.name)+" can take 3 legendary actions, choosing from the options below. Only one legendary action can\nbe used at a time and only at the end of another creature's turn. The "+t._s(t.stats.name)+" regains spent legendary\nactions at the start of his turn.")]),t._l(t.stats.legendaryActions,function(e){return s("p",{key:e.id},[s("npc-common-feature",{attrs:{feature:e,npc:t.stats}})],1)})],2):t._e(),t.hasFeature("reactions")?s("div",[s("p",{staticClass:"title underline-heading small-caps"},[t._v("Reactions")]),t._l(t.stats.reactions,function(e){return s("p",{key:e.id},[s("npc-common-feature",{attrs:{feature:e,npc:t.stats}})],1)})],2):t._e()],2)])};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n},MbNu:function(t,e,s){"use strict";var a=s("GiRZ");e.a={components:{MeIcon:a.a},props:["spell"],data:function(){return{classes:["adept","engineer","infiltrator","sentinel","soldier","vanguard"]}}}},MdZQ:function(t,e,s){var a=s("DUmr");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("rjj0")("0e6cbdaf",a,!1,{sourceMap:!1})},Mooa:function(t,e,s){"use strict";e.a={props:["spell"]}},OIvO:function(t,e,s){"use strict";var a=s("wlCu");e.a={components:{MeText:a.a},name:"MeElement",props:["text"]}},Pg2G:function(t,e,s){"use strict";s.d(e,"a",function(){return a});var a={methods:{dieFromAverage:function(t){return 2*parseFloat(t)-1}}}},Pn0j:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("p",{staticClass:"mb-0"},[s("strong",[s("em",[t._v(t._s(t.feature.name))]),t._v(".")]),t._v(" "),s("em",[t._v(t._s(t.feature.attackType)+" Weapon Attack")]),t._v(": "+t._s(t._f("npcDc")(t._f("npcName")(t.feature.description.attack,t.npc.name),t.npc)))]),s("p",{class:[t.feature.description.miss?"my-0":"mt-0"]},[s("em",[t._v("Hit")]),t._v(": "+t._s(t._f("npcDamage")(t._f("npcDc")(t._f("npcName")(t.feature.description.hit,t.npc.name),t.npc),t.npc)))]),t.feature.description.miss?s("p",{staticClass:"mt-0"},[s("em",[t._v("Miss")]),t._v(": "+t._s(t._f("npcDc")(t._f("npcName")(t.feature.description.miss,t.npc.name),t.npc)))]):t._e()])};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n},Qpt2:function(t,e,s){"use strict";var a=s("yzFV"),n=s("u73p"),i=!1;var l=function(t){i||s("k0Y8")},r=s("VU/8")(a.a,n.a,!1,l,null,null);r.options.__file="components/shared/SpellRangeArea.vue",e.a=r.exports},Qwxa:function(t,e,s){"use strict";e.a={props:["stats"]}},TKcB:function(t,e,s){"use strict";var a=s("2H9w"),n=s("+ZLu"),i=s("VU/8")(a.a,n.a,!1,null,null,null);i.options.__file="components/shared/NpcFeatures/NpcTech.vue",e.a=i.exports},TLcg:function(t,e,s){"use strict";var a=s("Qwxa"),n=s("8ucx"),i=s("VU/8")(a.a,n.a,!1,null,null,null);i.options.__file="components/shared/NpcFeatures/NpcBiotics.vue",e.a=i.exports},TmPi:function(t,e,s){"use strict";var a=s("Dd8w"),n=s.n(a),i=s("NYxO");e.a={computed:n()({},Object(i.mapGetters)(["tooltips"])),name:"MeText",props:["text"],render:function(t){var e=this,s=this.text.split(/(?={)(.*?})/g).map(function(s){if("{"===s.charAt(0)&&"}"===s.substring(s.length-1)){var a=s.replace(/[{|}]/g,""),n=a;if(/prime/gi.test(s)){a="primed";var i=s.replace(/[{|}]/g,"").split("-");n=i[0]+" ("+i[1]+")"}var l=e.tooltips.find(function(t){return t.id===a});return void 0===l?s:t("v-tooltip",{props:{bottom:!0}},[t("span",{slot:"activator",attrs:{class:"primary--text"}},n),t("span",l.mechanic)])}return s});return t("span",s)}}},VHrZ:function(t,e,s){"use strict";e.a={props:["spell","verbose"]}},W8Nb:function(t,e,s){(t.exports=s("FZ+f")(!1)).push([t.i,".con-icon{width:20px;height:20px;vertical-align:middle}",""])},WLSu:function(t,e,s){"use strict";var a=function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("div",{staticClass:"spell-icon"},[e("me-icon",{attrs:{type:"spells",name:this.spell.type}})],1),"biotic"===this.spell.type?e("span",[this._v(" "+this._s(this.level))]):this._e()])};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n},WyXj:function(t,e,s){(t.exports=s("FZ+f")(!1)).push([t.i,".aoe-icon{display:inline-block;width:20px;height:20px;vertical-align:middle}",""])},"XQ/1":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-layout",{staticClass:"spell-class-list",attrs:{"justify-end":""}},t._l(t.classes,function(e){return t.spell[e]?s("div",{key:e,staticClass:"class-icon"},[s("me-icon",{attrs:{type:"classes",name:e}}),"x"!==t.spell[e]?s("span",[t._v(t._s(t.spell[e]))]):t._e()],1):t._e()}))};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n},XjHt:function(t,e,s){"use strict";var a=function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("img",{staticClass:"me-icon",attrs:{src:"/images/"+this.type+"/"+this.name+".svg",title:""+this.name}})])};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n},ZVGc:function(t,e,s){"use strict";var a=s("meh3");e.a={props:["weapon"],components:{MeElement:a.a}}},bGpG:function(t,e,s){"use strict";var a=s("MbNu"),n=s("XQ/1"),i=!1;var l=function(t){i||s("MdZQ")},r=s("VU/8")(a.a,n.a,!1,l,null,null);r.options.__file="components/shared/SpellClassList.vue",e.a=r.exports},cBDT:function(t,e,s){"use strict";e.a={props:["option"],data:function(){return{title:"",text:""}},created:function(){if(this.option){var t=this.option.split(":",2);this.title=t[0],this.text=t[1]}}}},dUT3:function(t,e,s){"use strict";var a=s("iNT0"),n=s("Gidd"),i=s("VU/8")(a.a,n.a,!1,null,null,null);i.options.__file="components/shared/GrenadeInfo.vue",e.a=i.exports},fWkJ:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",[s("strong",[s("em",[t._v(t._s(t._f("featureTitle")(t.feature)))]),t._v(".")]),t._v(" "+t._s(t._f("npcDamage")(t._f("npcDc")(t._f("npcName")(t.feature.description,t.npc.name),t.npc),t.npc)))])};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n},hZRt:function(t,e,s){"use strict";var a=s("GiRZ");e.a={components:{MeIcon:a.a},props:["spell"],created:function(){if("biotic"===this.spell.type)switch(this.spell.level){case"0":this.level="cantrip";break;case"1":this.level="1st-level";break;case"2":this.level="2nd-level";break;case"3":this.level="3rd-level";break;default:this.level=this.spell.level+"th-level"}},data:function(){return{level:""}}}},i9Kg:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{attrs:{fluid:""}},[s("h2",{staticClass:"display-3"},[t._v("Bookmarks")]),t._l(t.bookmarksGroupedByType,function(e,a){return s("v-layout",{key:a,attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("h3",{staticClass:"display-1"},[t._v(t._s(t._f("capitalize")(t._f("pluralize")(2,a))))])]),t._l(e,function(e,n){return s("v-flex",{key:n,attrs:{xs12:"",lg6:""}},[s("v-card",{staticClass:"ma-1"},[s("v-card-text",["spell"===a?s("spell-info",{attrs:{spell:e}}):t._e(),"weapon"===a?s("weapon-info",{attrs:{weapon:e}}):t._e(),"grenade"===a?s("grenade-info",{attrs:{grenade:e}}):t._e(),"npc"===a?s("stat-block",{attrs:{stats:e}}):t._e()],1),s("v-card-actions",[s("bookmark-button",{attrs:{card:e,type:a,props:{flat:!0}}})],1)],1)],1)})],2)})],2)};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n},iNT0:function(t,e,s){"use strict";var a=s("meh3");e.a={components:{MeElement:a.a},props:["grenade"]}},k0Y8:function(t,e,s){var a=s("WyXj");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("rjj0")("43563fb4",a,!1,{sourceMap:!1})},meh3:function(t,e,s){"use strict";var a=s("OIvO"),n=s("7fpg"),i=s("VU/8")(a.a,n.a,!1,null,null,null);i.options.__file="components/shared/MeElement.vue",e.a=i.exports},"mxj+":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("v-layout",[s("v-flex",{staticClass:"xs12 sm6"},[s("h4",{staticClass:"headline"},[t._v(t._s(t.weapon.name))]),s("p",[s("em",[t._v(t._s(t.weapon.tags))])])]),s("v-flex",{staticClass:"hidden-xs-only sm6 md3 offset-md3"},[s("img",{staticStyle:{"max-width":"100%"},attrs:{src:t.weapon.image}})])],1),s("v-layout",{attrs:{row:"",wrap:"","flex-start":""}},[s("v-flex",{staticClass:"xs12 sm4 md2 attribute mb-2"},[s("label",[t._v("Range")]),s("div",[t._v(t._s(t._f("weaponRange")(t.weapon)))])]),s("v-flex",{staticClass:"xs12 sm4 md2 attribute mb-2"},[s("label",[t._v("Damage")]),s("div",[t._v(t._s(t.weapon.damage))])]),"Melee"===t.weapon.type?s("v-flex",{staticClass:"xs12 sm4 md2 attribute mb-2"},[s("label",[t._v("Min STR")]),s("div",[t._v(t._s(t.weapon.minStr))])]):s("v-flex",{staticClass:"xs12 sm4 md2 attribute mb-2"},["Heavy Weapon"===t.weapon.type?s("label",[t._v("Charges")]):s("label",[t._v("Heat")]),s("div",[t._v(t._s(t.weapon.heat))])]),s("v-flex",{staticClass:"xs12 sm4 md2 attribute mb-2"},[s("label",[t._v("Weight")]),s("div",[t._v(t._s(t.weapon.weight))])]),s("v-flex",{staticClass:"xs12 sm4 md2 attribute mb-2"},[s("label",[t._v("Rarity")]),s("div",[t._v(t._s(t.weapon.rarity))])]),s("v-flex",{staticClass:"xs12 sm4 md2 attribute mb-2"},[s("label",[t._v("Cost")]),s("div",[t._v(t._s(t._f("groupDigits")(t.weapon.cost,",")))])])],1),s("div",{staticClass:"hr"}),s("div",{staticClass:"mt-3"},[s("me-element",{attrs:{text:t.weapon.notes}})],1)],1)};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n},mzRc:function(t,e,s){"use strict";var a=s("VHrZ"),n=s("6dm0"),i=!1;var l=function(t){i||s("20iW")},r=s("VU/8")(a.a,n.a,!1,l,null,null);r.options.__file="components/shared/SpellDuration.vue",e.a=r.exports},nOBh:function(t,e,s){"use strict";var a=s("B2XJ"),n=s("AC9q"),i=s("VU/8")(a.a,n.a,!1,null,null,null);i.options.__file="components/shared/SpellInfo.vue",e.a=i.exports},o4K1:function(t,e,s){"use strict";var a=function(){var t=this.$createElement,e=this._self._c||t;return e("v-card",{staticClass:"ma-1"},[e("v-card-title",[this._v(this._s(this.title))]),e("v-card-text",[this._v(this._s(this.text))])],1)};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n},rCtt:function(t,e,s){"use strict";var a=s("hZRt"),n=s("WLSu"),i=!1;var l=function(t){i||s("DAzh")},r=s("VU/8")(a.a,n.a,!1,l,null,null);r.options.__file="components/shared/SpellType.vue",e.a=r.exports},rhbY:function(t,e,s){"use strict";e.a={props:["type","name"]}},u73p:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._v("\n  "+t._s(t.spell.range)+"\n  "),t.spell.aoe?s("span",[t._v("\n    ("+t._s(t.spell.aoe_distance)+" "),s("div",{staticClass:"aoe-icon"},[s("me-icon",{attrs:{type:"aoe",name:t.spell.aoe}})],1),t._v(")\n  ")]):t._e()])};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n},wlCu:function(t,e,s){"use strict";var a=s("TmPi"),n=s("VU/8")(a.a,null,!1,null,null,null);n.options.__file="components/shared/MeText.vue",e.a=n.exports},xGue:function(t,e,s){"use strict";var a=s("A8a0"),n=s("fWkJ"),i=s("VU/8")(a.a,n.a,!1,null,null,null);i.options.__file="components/shared/NpcFeatures/NpcCommonFeature.vue",e.a=i.exports},ynjy:function(t,e,s){"use strict";var a=s("Dd8w"),n=s.n(a),i=s("NYxO");e.a={computed:n()({},Object(i.mapGetters)(["isBookmarked"])),methods:n()({},Object(i.mapActions)(["addBookmark","removeBookmark"])),props:["card","type","props"]}},yzFV:function(t,e,s){"use strict";var a=s("GiRZ");e.a={props:["spell"],components:{MeIcon:a.a}}},zTpo:function(t,e,s){"use strict";e.a={props:["feature","npc"]}}});