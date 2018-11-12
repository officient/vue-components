import { shallow } from '@vue/test-utils'
import CalendarTooltipItem from '../components/daysoff/CalendarTooltipItem'
import i18n_nl from './i18n/nl.json'

const mocks = {
  $t: v => v,
}

describe('CalendarTooltipItem.vue', () => {
  it('renders day off correctly', () => {
    const wrapper = shallow(CalendarTooltipItem, { mocks, propsData: {
      item: {
        name: 'Hello',
        color: '#00FF00',
        start_minutes: 9 * 60,
        duration_minutes: 8 * 60
      }
    } })

    expect(wrapper.find('.calendar-tooltip-item-name').text()).toBe('Hello')
    expect(wrapper.find('.calendar-tooltip-item-details').text().trim()).toBe('8h')
  })

  it('renders half day off correctly', () => {
    const wrapper = shallow(CalendarTooltipItem, { mocks, propsData: {
      item: {
        name: 'Hello',
        color: '#00FF00',
        start_minutes: 16 * 60,
        duration_minutes: 4 * 60
      }
    } })

    expect(wrapper.find('.calendar-tooltip-item-name').text()).toBe('Hello')
    expect(wrapper.find('.calendar-tooltip-item-details').text().replace(/\s+/gm, ' ').trim()).toBe('4h - afternoon')
    expect(wrapper.find('.calendar-tooltip-item').attributes().style).toBe('border-color: #00ff00;')
  })

  it('renders translated value in dutch', () => {
    const mocks = {
      $t: v => i18n_nl[v]
    }

    const wrapper = shallow(CalendarTooltipItem, { mocks, propsData: {
      item: {
        name: 'Sick day',
        color: '#00FF00',
        start_minutes: 9 * 60,
        duration_minutes: 8 * 60
      }
    } })

    expect(wrapper.find('.calendar-tooltip-item-name').text()).toBe('Ziekte')
  })
})
