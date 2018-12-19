// for development only!!!

import Vue from 'vue'
import moment from 'moment'

const available = require('../server/config/languages')
const messages = {
  // () => import() creates a chunk in the /html/js/chunks folder with the
  // given webpackChunkName in the comment. Returns a promise
  en: () => import( /* webpackChunkName: 'en' */ './en.json'),
}

// load our language chunk and set our language after request
// will refresh the views with the new language immediately
export function loadLanguage (lang) {
  if (available.indexOf(lang) !== -1) {
    moment.locale(lang)

    messages[lang]().then(i18n => {
      Vue.config.lang = i18n.locale
      Vue.locale(i18n.locale, i18n)
    })
  } else {
    console.warn('Unknown language', lang)
  }
}

export default {
  install (Vue) {
    Vue.config.missingHandler = (lang, key) => {
      if (process.env.NODE_ENV !== 'production') {
        if (!window.missingBag) {
          window.missingBag = {}
        }
        window.missingBag[key] = key
        console.debug('missing translation for', lang, key)
      }
    }

    // load the language for our current build so we don't have to wait until
    // language files are loaded if we know the language from the cookie already
    const i18n = require('./' + process.env.LANGUAGE + '.json')
    moment.locale(i18n.locale)
    Vue.config.lang = i18n.locale
    Vue.locale(i18n.locale, i18n)
  }
}
