import Vue from 'vue'

export function minutesToHoursMinutes (minutes) {
	if (minutes >= 60) {
		const hours = Math.floor(minutes / 60)
		if (minutes % 60 > 0) return Vue.t('HOURS_MINS', [hours, Math.round(minutes % 60)])
		else return Vue.t('HOURS_SHORT', [hours])
	} else if (minutes > 0) {
		return Vue.t('MINS_SHORT', [minutes])
	} else {
		return Vue.t('HOURS_SHORT', [0])
	}
}

export function enagementToHoursMinutes (minutes) {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    if (minutes % 60 > 0) return Vue.t('HOURS_MINS_SHORT', [hours, Math.round(minutes % 60)])
    else return Vue.t('HOURS_SHORT', [hours])
  } else if (minutes > 0) {
    return Vue.t('MINS_SHORT', [minutes])
  } else {
    return Vue.t('HOURS_SHORT', [0])
  }
}

export function daysOffPartOfDay ({ start_minutes, duration_minutes }) {
  const middle = start_minutes + (duration_minutes / 2)

  if (duration_minutes <= (5 * 60)) {
    if (middle < (12 * 60)) {
      return Vue.t('MORNING').toLowerCase()
    } else {
      return Vue.t('AFTERNOON').toLowerCase()
    }
  }
}

/**
 * Displays a float with max. amount of `decimals` if required
 * 5.06 -> 5.06
 * 5.00 -> 5
 * @param {Number} number
 * @param {Number} decimals
 */
export function floatable (number, decimals) {
  let precision = 100
  if (decimals) {
    precision = Math.pow(10, decimals)
  }
  return Math.round(number * precision) / precision
}

export default (Vue) => {
  Vue.filter('minutesToHoursMinutes', minutesToHoursMinutes)
  Vue.filter('enagementToHoursMinutes', enagementToHoursMinutes)
  Vue.filter('floatable', floatable)
}
