import moment from 'moment'
import { dayOffEducationColor, dayOffSickDayColor, companyHolidayColor } from '../../utils/colors'
import groupBy from '../../utils/data/groupBy'
const clone = (obj) => Object.assign({}, obj)

/**
 * @typedef CalendarDay
 * see DayOff (See /server/orm_objects/DayOff)
 *
 * @prop {String}   name        Name of the day
 * @prop {String}   color       Hex color including leading #
 * @prop {Array}    classBools   Array of classes
 * @prop {Object}   barStyles   Styles for each item: backgroundColor, left, width
 */

/**
  * @typedef CalendarItem
  * @prop {Number}               i           day of the month (1 to 31)
  * @prop {String}               dateStr     YYYY-MM-DD date
  * @prop {{}}                   classBools  Boolean map of class names => { today: Boolean }
  * @prop {Array<CalendarDay>}   items       Days off during this day
  */

/**
 * Transforms raw personal_days_off and company_days_off API to calendar-component-ready data
 * @param  {Array}    personal_days_off personal days off from the API
 * @param  {Array}    company_days_off  Company days off from the API
 * @param  {Object}   schedule          Schedule for a person
 * @param  {String}   startDate         YYYY-MM-DD date for the beginning date
 * @param  {Number}   daysCount         A number such as 7, 30. Array will be this length
 * @return {Array<CalendarItem>}        An array of CalendarDay
 */
function transformDaysOffToCalendar ({ personal_days_off_map, personal_days_off, company_days_off, company_days_off_map, schedule, startDate, daysCount }) {
  if (!daysCount) throw new Error('Missing daysCount')
  if (!startDate) throw new Error('Missing startDate')
  if (!schedule) schedule = {}

  if (!personal_days_off_map) {
    personal_days_off_map = groupBy(personal_days_off || [], 'date') || {}
  }
  if (!company_days_off_map) {
    company_days_off_map = groupBy(company_days_off || [], 'date') || {}
  }

  const today = moment().format('YYYY-MM-DD')
  const startMoment = moment(startDate)
  const days = []

  for (var i = 1; i <= daysCount; i++) {
    const day = {
      i: i,
      dateStr: startMoment.clone().add(i - 1, 'days').format('YYYY-MM-DD'),
      classBools: {},
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

    day.classBools = {
      today: today === day.dateStr,
      zeroSchedule: schedule[day.dateStr] === 0,
      clickable: true,
      empty: day.items.length === 0
    }

    days.push(day)
  }

  return days
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
    item.classBools = {
      company: true,
      personal: false,
      pending: false,
    }

    item.color = companyHolidayColor
    item.name = p.special_name

    items.push(item)
  }

  for (const p of personalDaysForDate) {
    const item = clone(p)
    item.classBools = {
      company: false,
      personal: true,
      pending: item.approved === 0,
    }

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

    items.push(item)
  }

  return items
}

function buildBaseRequest (id, formData) {
  return {
    employee_id: id,
    type: formData.activeBudget.type,
    day_off_type_name: formData.activeBudget.name,
    send_notification: formData.send_notification === 'yes' ? 1 : 0,
    optional_message: formData.optional_message
  }
}

/**
 * Creates an array-less object for the addDaysOff API
 * @param {String | Number} id   employee id
 * @param {Object.<string, CalendarItem>} controllerMap
 * @param {Object} formData
 * @param {Object} formData.activeBudget
 * @param {'yes' | 'no'} formData.send_notification
 * @param {String?} formData.optional_message
 * @param {Number} formData.start_minutes
 * @param {Number} formData.duration_minutes
 * @param {Object} formData.weekly_schedule
 * @param {'allDay' | 'morning' | 'afternoon' | 'custom'} formData.when
 */
function buildAddDaysoffRequests (id, controllerMap, formData) {
  const request = buildBaseRequest(id, formData)

  Object.keys(controllerMap).forEach((dateStr, i) => {
    const ddmmyyyy = moment(dateStr).format('DD/MM/YYYY')
    request[`date_${i}`] = ddmmyyyy

    if (formData.when === 'custom') {
      // Use custom duration
      request[`start_minutes_${i}`] = formData.start_minutes
      request[`duration_minutes_${i}`] = formData.duration_minutes
    } else {
      // use duration from weekly schedule
      let duration = 0
      duration = formData.weekly_schedule[dateStr]
      request[`duration_minutes_${i}`] = duration
    }

    if (formData.when === 'morning' || formData.when === 'allDay') {
      // start in the morning
      request[`start_minutes_${i}`] = (9 * 60)
    } else if (formData.when === 'afternoon') {
      // start after lunch
      request[`start_minutes_${i}`] = (13 * 60)
    }

    if (formData.when === 'morning' || formData.when === 'afternoon') {
      // half a day
      request[`duration_minutes_${i}`] = request[`duration_minutes_${i}`] / 2
    }

    if (formData.when === 'allDay') {
      request[`duration_minutes_${i}`] = 'all_day'
    }
  })

  return request
}

export {
  transformDaysOffToCalendar,
  buildAddDaysoffRequests
}
