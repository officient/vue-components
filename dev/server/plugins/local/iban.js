function isIBANCountry (country_code) {
    switch (country_code) {
      case 'GB': case 'US': case 'ZZ':
        return false
      default:
        return true
    }
  }
  
  export const IBAN_LABEL = function (country_code) {
    if (isIBANCountry(country_code)) {
      return 'Bank account / IBAN'
    } else {
      return 'Bank account'
    }
  }
  
  export const IBAN_PLACEHOLDER = function (country_code) {
    if (!isIBANCountry(country_code)) {
      return 'Bank account'
    } else {
      switch (country_code) {
        case 'BE': return 'BE00 0000 0000 0000'
        case 'FR': return 'FR00 0000 0000 0000 0000 0000 000'
        case 'DE': return 'DE00 0000 0000 0000 0000 00'
        case 'NL': return 'NL00 0000 0000 0000 00'
        case 'ES': return 'ES00 0000 0000 0000 0000 0000'
        case 'IT': return 'IT00 0000 0000 0000 0000 0000 000'
      }
      return 'Bank account / IBAN'
    }
  }
  