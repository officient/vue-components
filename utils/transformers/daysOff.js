import moment from 'moment'
import { dayOffEducationColor, dayOffSickDayColor, calendarGray } from 'utils/colors'
import groupBy from 'utils/data/groupBy'
const clone = (obj) => Object.assign({}, obj)

/**
 * @name CalendarDay
 * @type {Object}
 * @see DayOff (See /server/orm_objects/DayOff)
 *
 * @prop {String}   name        Name of the day
 * @prop {String}   color       Hex color including leading #
 * @prop {Array}    className   Array of classes
 * @prop {Object}   barStyles   Styles for each item: backgroundColor, left, width
 */

/**
  * @name CalendarItem
  * @type {Object}
  *
  * @prop {Number}               i           day of the month (1 to 31)
  * @prop {String}               dateStr     YYYY-MM-DD date
  * @prop {Object}               className   Boolean map of class names => { today: Boolean }
  * @prop {Array<CalendarItem>}  items       Days off during this day
  */

/**
 * Transforms raw personal_days_off and company_days_off API to calendar-component-ready data
 * @param  {Array}    personal_days_off personal days off from the API
 * @param  {Array}    company_days_off  Company days off from the API
 * @param  {Object}   schedule          Schedule for a person
 * @param  {String}   startDate         YYYY-MM-DD date for the beginning date
 * @param  {Number}   daysCount         A number such as 7, 30. Array will be this length
 * @return {Array<CalendarDay>}         An array of CalendarDay
 */
function transformDaysOffToCalendar ({ personal_days_off, company_days_off, schedule, startDate, daysCount }) {
  if (!daysCount) throw new Error('Missing daysCount')
  if (!startDate) throw new Error('Missing startDate')
  if (!schedule) schedule = {}

  const personal_days_off_map = groupBy(personal_days_off || [], 'date') || {}
  const company_days_off_map = groupBy(company_days_off || [], 'date') || {}

  const today = moment().format('YYYY-MM-DD')
  const startMoment = moment(startDate)
  const days = []

  for (var i = 1; i <= daysCount; i++) {
    const day = {
      i: i,
      dateStr: startMoment.clone().add(i - 1, 'days').format('YYYY-MM-DD'),
      className: {},
      items: [],
    }

    day.items = getItemsFromPersonalAndCompanyDays(day.dateStr, personal_days_off_map, company_days_off_map)

    day.items.forEach((item, i) => {
      item.barStyles = {
        backgroundColor: item.color,
        left: ((i / day.items.length) * 100) + '%',
        width: ((1 / day.items.length) * 100) + '%',
      }
    })

    day.className = {
      today: today === day.dateStr,
      disabled: isDayDisabled(day, schedule)
    }
    day.className.clickable = !day.className.disabled // inverse

    days.push(day)
  }

  return days
}

function isDayDisabled (day, schedule) {
  var isDayDisabled = false

  // Day is disabled if there is a company day off on that day
  day.items.forEach(x => {
    if (x.className.indexOf('company') > -1) {
      isDayDisabled = true
    }
  })

  // Empty schedule and no other items means disabled
  if (schedule[day.dateStr] === 0 && day.items.length === 0) {
    isDayDisabled = true
  }

  return isDayDisabled
}

/**
 * - Creates an array of CalendarItem
 * - Will transform our special days such as sick_day and education
 * - Add colors or set a default
 * @param  {String} dateStr                YYYY-MM-DD
 * @param  {Object}  personal_days_off_map personal days off grouped by date
 * @param  {Object}  company_days_off_map  Company days off grouped by date
 * @return {Array<CalendarItem>}           Company and personal days off for dateStr
 */
function getItemsFromPersonalAndCompanyDays (dateStr, personal_days_off_map, company_days_off_map) {
  if (!dateStr) throw new Error('Missing dateStr')

  const items = []
  const personalDaysForDate = personal_days_off_map[dateStr] || []
  const companyDaysForDate = company_days_off_map[dateStr] || []

  for (const p of companyDaysForDate) {
    const item = clone(p)
    item.className = ['company']
    item.color = calendarGray
    item.name = p.special_name

    items.push(item)
  }

  for (const p of personalDaysForDate) {
    const item = clone(p)
    item.className = ['personal']

    if (item.type === 'education') {
      item.color = dayOffEducationColor
      item.name = 'Training day'
    } else if (p.type === 'sick_day') {
      item.color = dayOffSickDayColor
      item.name = 'Sick day'
    } else {
      item.color = `#${(p.color || '1C99FC')}`
      item.name = p.custom_type_name
    }
    if (item.approved === 0) {
      item.className.push('pending')
    }

    items.push(item)
  }

  return items
}

export {
  transformDaysOffToCalendar
}
