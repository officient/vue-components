import { shallow } from '@vue/test-utils'
import CalendarSelectionButtons from '../components/daysoff/CalendarSelectionButtons'

describe('component: CalendarSelectionButtons', () => {
  beforeEach(() => {
    window.Toast = { show: jest.fn() }
  })

  const days = [{ day: { dateStr: '2018-06-06' }, type: 'add' }, { day: { dateStr: '2018-06-07' }, type: 'delete' }]
  const selectedDeleteDays = [ { day: { dateStr: '2018-06-07' }, type: 'delete' } ]
  const mocks = { $t: v => v, $tc: v => v }

  it('countAddDays should return length of all days', () => {
    const wrapper = shallow(CalendarSelectionButtons, { mocks })
    wrapper.setData({ selectedDays: days })
    expect(wrapper.vm.countAddDays).toBe(2)
  })

  it('countRemoveDays should return length of delete days', () => {
    const wrapper = shallow(CalendarSelectionButtons, { mocks })
    wrapper.setData({ selectedDays: days , selectedDeleteDays })
    expect(wrapper.vm.countRemoveDays).toBe(1)
  })

  it('canRemoveDays is true when delete length is > 1', () => {
    const wrapper = shallow(CalendarSelectionButtons, { mocks })
    wrapper.setData({ selectedDays: days, selectedDeleteDays })
    expect(wrapper.vm.canRemoveDays).toBe(true)
  })

  it('canRemoveDays is false when delete length is not > 1', () => {
    const wrapper = shallow(CalendarSelectionButtons, { mocks })
    wrapper.setData({ selectedDays: [ days[0], days[0] ]})
    expect(wrapper.vm.canRemoveDays).toBe(false)
  })

  it('canShowMenu is true when days length > 0: 1', () => {
    const wrapper = shallow(CalendarSelectionButtons, { mocks })
    wrapper.setData({ selectedDays: [ days[0], days[0] ]})
    expect(wrapper.vm.canShowMenu).toBe(true)
  })

  it('canShowMenu is true when days length > 0: 2', () => {
    const wrapper = shallow(CalendarSelectionButtons, { mocks })
    wrapper.setData({ selectedDays: [] })
    expect(wrapper.vm.canShowMenu).toBe(false)
  })
})
