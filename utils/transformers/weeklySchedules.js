/**
 * Returns a sorted weekly_schedule_exception array
 * If there are no exception, force the wage detail into an Array
 * @param  {WageDetail} wage
 * @param  {Array<WeeklyScheduleException>} weekly_schedule_exceptions
 * @return {Array<WeeklyScheduleException>}
 */
const toWeeklySchedules = (wage, weekly_schedule_exceptions) => {
  if (weekly_schedule_exceptions && weekly_schedule_exceptions.length > 0) {
    // week_nr 1 on top of list
    return weekly_schedule_exceptions.slice().sort((a, b) => a.week_nr - b.week_nr)
  } else {
    return [ makeWeeklySchedule(wage) ]
  }
}

/**
 * Dereferences and converts a wage detail object to a weekly_schedule_exception
 * @param  {WageDetail} w             Wage detail from the API
 * @param  {[Number]}   week_nr       Optional week_nr to add
 * @return {WeeklyScheduleException}  Same thing but with a week_nr
 */
const makeWeeklySchedule = (w, week_nr) => {
  return {
    week_nr: week_nr || 1,
    time_engagement_monday: w.time_engagement_monday || 0,
    time_engagement_tuesday: w.time_engagement_tuesday || 0,
    time_engagement_wednesday: w.time_engagement_wednesday || 0,
    time_engagement_thursday: w.time_engagement_thursday || 0,
    time_engagement_friday: w.time_engagement_friday || 0,
    time_engagement_saturday: w.time_engagement_saturday || 0,
    time_engagement_sunday: w.time_engagement_sunday || 0,
  }
}

export {
  makeWeeklySchedule,
  toWeeklySchedules
}
