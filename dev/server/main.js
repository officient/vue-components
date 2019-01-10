// Polyfills
import Promise from 'promise-polyfill'
import setAsap from 'setasap'
if (!window.Promise) {
	window.Promise = Promise
	window.Promise._immediateFn = setAsap
}

import Vue from 'vue'
import App from './App.vue'
import { plugin, initRouter } from './plugins/router'
import routes from '../pages/routes'
import PortalVue from 'portal-vue'
import VueI18n from 'vue-i18n'
import i18n from '../i18n'
import VueLocal from './plugins/local/_plugin'
import IconsPlugin from './plugins/local/Icons'

Vue.use(PortalVue)

Vue.use(VueI18n)
Vue.use(i18n)
Vue.use(VueLocal)
Vue.use(IconsPlugin)

Vue.use(plugin)
initRouter(routes)
new Vue({
	el: '#app',
	render: function(createElement) {
		return createElement(App)
	},
})
