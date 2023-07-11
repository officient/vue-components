export function minutesToHoursMinutes (minutes) {
	if (minutes >= 60) {
		const hours = Math.floor(minutes / 60)
		if (minutes % 60 > 0) return `${hours}h${Math.round(minutes % 60)}min`
		else return `${hours}h`
	} else if (minutes > 0) {
		return `${minutes}min`
	} else {
		return '0h'
	}
}

export function engagementToHoursMinutes (minutes) {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    if (minutes % 60 > 0) return `${hours}h${Math.round(minutes % 60)}`
    else return `${hours}h`
  } else if (minutes > 0) {
    return `${minutes}min`
  } else {
    return '0h'
  }
}

export function daysOffPartOfDay ({ start_minutes, duration_minutes }) {
  const middle = start_minutes + (duration_minutes / 2)

  if (duration_minutes <= (5 * 60)) {
    if (middle < (12 * 60)) {
      return 'morning'
    } else {
      return 'afternoon'
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
  Vue.filter('engagementToHoursMinutes', engagementToHoursMinutes)
  Vue.filter('floatable', floatable)
}
