import moment from 'moment'

/**
 * Formats a Date to YYYY-MM-DD
 * @param {Date | string} date
 * @param {*} format
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  if (format === 'YYYY-MM-DD') {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = d.getFullYear()
     if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
     return [year, month, day].join('-')
  }
}

/**
 *
 * @param {Date[]} dates
 * @returns {moment.Moment[]}
 */
function toMoments (dates) {
  return dates.map(m => moment(m))
}

/**
 * returns oldest Date
 * @param  {...Date} dates
 * @returns {Date}
 */
export function minimumDate (...dates) {
  return moment.min(...toMoments(dates)).toDate()
}

/**
 * returns youngest Date
 * @param  {...Date} dates
 * @returns {Date}
 */
export function maximumDate (...dates) {
  return moment.max(...toMoments(dates)).toDate()
}

/**
 * Checks if otherDate isSameOrBefore currentDate
 * ```
  isSameOrBefore('2010-10-20', '2010-10-21')  // true
  isSameOrBefore('2010-10-20', '2010-10-20')  // true
  isSameOrBefore('2010-10-20', '2010-10-19')  // false
 ```
 *
 * @param {Date | String} otherDate
 * @param {Date | String} currentDate
 * @returns {Boolean}
 */
export function isSameOrBefore (otherDate, currentDate) {
  return moment(otherDate).isSameOrBefore(currentDate, 'day')
}

/**
 * Check if dates are in the same month
 * @param {Date | String} dirtyDateA
 * @param {Date | String} dirtyDateB
 * @returns {Boolean}
 */
export function isSameMonth (dirtyDateA, dirtyDateB) {
  return moment(dirtyDateA).isSame(dirtyDateB, 'month')
}

/**
 * Loop between two dates and execute a function.
 *
 * @param {Date | String} dirtyDateA
 * @param {Date | String} dirtyDateB
 * @param {Function<Date>} fn
 */
export function forEachDateBetween (dirtyDateA, dirtyDateB, fn) {
  // sort the dates so we always from from oldest to youngest
  const startDate = minimumDate(new Date(dirtyDateA), new Date(dirtyDateB))
  const endDate = maximumDate(new Date(dirtyDateA), new Date(dirtyDateB))

  for (
    let day = startDate;
    isSameOrBefore(day, endDate);
    day.setDate(day.getDate() + 1)
  ) {
    fn(day)
  }
}
