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
import routes from './routes'
import PortalVue from 'portal-vue'

Vue.use(PortalVue)

Vue.use(plugin)
initRouter(routes)
new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(App)
    }
})