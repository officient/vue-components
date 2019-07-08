import { dayOffEducationColor, dayOffSickDayColor } from './colors'

const typeSchema = {
  'type_id': -1,
  'minutes_approved': '0',
  'minutes_not_approved': '0',
  'days_approved': '0.0',
  'days_not_approved': '0.0',
  'type': 'custom',
  'color': 'a24689',
  'max_yearly_amount_days': '0.0',
  'max_yearly_amount_minutes': 0,
  'limitation': 'unlimited',
  'interpretation': 'time_off',
  'name': 'name',
  'employee_id': -1,
  'approval_needed': 1
}

export const sickdayType = {
  ...typeSchema,
  name: 'Sick day',
  type: 'sick_day',
  approval_needed: 0,
  color: dayOffSickDayColor.substr(1)
}

export const educationType = {
  ...typeSchema,
  name: 'Training day',
  type: 'education',
  approval_needed: 1,
  color: dayOffEducationColor.substr(1)
}
