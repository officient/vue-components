import * as iban from './iban'

const local = {
  ...iban
}

export default {
  install (Vue, options) {
    Vue.prototype.$local = function (key, ...other) {
      if (local[key]) return local[key].apply(this, other)
      else {
        console.warn('Localization :: Undefined', key, other)
      }
    }
  }
}
