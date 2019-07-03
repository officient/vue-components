import { shallow, mount } from '@vue/test-utils'
import CalendarTooltipContent from '../src/components/daysoff/CalendarTooltipContent'
import { transformDaysOffToCalendar } from '../src/utils/transformers/daysOff'
import i18n_nl from './i18n/nl.json'
import i18n_en from './i18n/en.json'

const mocks = {
  $t: v => i18n_en[v]
}

describe('CalendarTooltipContent.vue', () => {
  it('renders empty message', () => {
    const wrapper = shallow(CalendarTooltipContent, { mocks, propsData: {
      dateStr: '2018-01-01',
      weeklySchedule: { '2018-01-01': 0 },
      slots: []
    } })

    expect(wrapper.find('.calendar-tooltip-content').text()).toBe('Free day')
  })

  it('renders planned weekly schedule', () => {
    const wrapper = shallow(CalendarTooltipContent, { mocks, propsData: {
      dateStr: '2018-01-01',
      weeklySchedule: { '2018-01-01': 60 },
      slots: []
    } })

    expect(wrapper.find('.calendar-tooltip-title').text()).toBe('Working time')
    expect(wrapper.find('.calendar-tooltip-content').text()).toBe('60')
  })

  it('renders official holiday', () => {
    const days = transformDaysOffToCalendar({
      daysCount: 1,
      startDate: '2018-01-01',
      company_days_off: [
        {
          date: '2018-01-01',
          special_name: 'NEW_YEARS_DAY'
        }
      ],
    })

    const wrapper = mount(CalendarTooltipContent, { mocks, propsData: {
      dateStr: '2018-01-01',
      weeklySchedule: { '2018-01-01': 0 },
      slots: days[0].items
    } })

    expect(wrapper.find('.calendar-tooltip-title').text()).toBe('Official holiday')
    expect(wrapper.find('.calendar-tooltip-item-name').text()).toBe('New Year\'s day')
  })

  it('renders multiple personal days off', () => {
    const days = transformDaysOffToCalendar({
      daysCount: 1,
      startDate: '2018-01-01',
      personal_days_off: [
        {
          date: '2018-01-01',
          duration_minutes: 60,
          type: 'custom',
          custom_type_name: 'hello',
          color: '00FF00',
          approved: 0
        },
        {
          date: '2018-01-01',
          duration_minutes: 60,
          type: 'sick_day',
          approved: 1
        }
      ]
    })

    const wrapper = mount(CalendarTooltipContent, { mocks, propsData: {
      dateStr: '2018-01-01',
      weeklySchedule: { '2018-01-01': 0 },
      slots: days[0].items
    } })

    expect(wrapper.findAll('.calendar-tooltip-title').at(0).text()).toBe('Days off')
    expect(wrapper.findAll('.calendar-tooltip-item-name').at(0).text()).toBe('Sick day')

    expect(wrapper.findAll('.calendar-tooltip-title').at(1).text()).toBe('Days off pending approval')
    expect(wrapper.findAll('.calendar-tooltip-item-name').at(1).text()).toBe('world')
  })

  it('renders multiple personal days off in dutch', () => {
    const days = transformDaysOffToCalendar({
      daysCount: 1,
      startDate: '2018-01-01',
      personal_days_off: [
        {
          date: '2018-01-01',
          duration_minutes: 60,
          type: 'custom',
          custom_type_name: 'hello',
          color: '00FF00',
          approved: 0
        },
        {
          date: '2018-01-01',
          duration_minutes: 60,
          type: 'sick_day',
          approved: 1
        }
      ]
    })

    const mocks = {
      $t: v => i18n_nl[v]
    }

    const wrapper = mount(CalendarTooltipContent, { mocks, propsData: {
      dateStr: '2018-01-01',
      weeklySchedule: { '2018-01-01': 0 },
      slots: days[0].items
    } })

    expect(wrapper.findAll('.calendar-tooltip-title').at(0).text()).toBe('Verlof')
    expect(wrapper.findAll('.calendar-tooltip-item-name').at(0).text()).toBe('Ziekte')

    expect(wrapper.findAll('.calendar-tooltip-title').at(1).text()).toBe('Verlofaanvragen wachtend op goedkeuring')
    expect(wrapper.findAll('.calendar-tooltip-item-name').at(1).text()).toBe('world')
  })
})
