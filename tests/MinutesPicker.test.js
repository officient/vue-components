import { shallow } from '@vue/test-utils'
import MinutesPicker from '../src/components/MinutesPicker'

function simulateKeydownEvent (element, code) {
  var event = document.createEvent('Event')
  event.keyCode = code
  event.initEvent('keydown', false, true)
  element.dispatchEvent(event)
}

// const digits = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]

describe('MinutesPicker.vue', () => {
  it('displays time correctly', () => {
    const wrapper = shallow(MinutesPicker, {
      propsData: { value: 90 }
    })

    expect(wrapper.vm.hours).toBe('01')
    expect(wrapper.vm.minutes).toBe('30')
    expect(wrapper.vm.string).toBe('01:30')
  })

  it('can change time', () => {
    const wrapper = shallow(MinutesPicker, {
      propsData: { value: 0, initDelimiter: 'h', type: '24h' }
    })
    wrapper.vm.$on('input', (val) => {
      wrapper.setProps({ value: val })
      wrapper.vm.renderText()
    })

    expect(wrapper.vm.string).toBe('00h00')

    wrapper.vm.addMinutes(30)
    expect(wrapper.vm.string).toBe('00h30')

    wrapper.vm.addHours(50) // limited to 24h
    expect(wrapper.vm.string).toBe('23h30')

    wrapper.vm.addHours(-100)
    expect(wrapper.vm.string).toBe('00h30')

    wrapper.vm.addMinutes(-100)
    expect(wrapper.vm.string).toBe('00h00')
  })

  it('can listen to keyboard events', () => {
    const wrapper = shallow(MinutesPicker, {
      propsData: { value: 90 },
      attachToDocument: true
    })
    wrapper.vm.$on('input', (val) => {
      wrapper.setProps({ value: val })
      wrapper.vm.renderText()
    })

    expect(wrapper.vm.string).toBe('01:30')
    var element = document.querySelector('.minutes-picker input[type="text"]')

    simulateKeydownEvent(element, 38) // up
    expect(wrapper.vm.string).toBe('02:30')

    simulateKeydownEvent(element, 39) // right
    expect(wrapper.vm.focus).toBe('minutes')

    simulateKeydownEvent(element, 40) // down
    expect(wrapper.vm.string).toBe('02:25')

    simulateKeydownEvent(element, 37) // left
    expect(wrapper.vm.focus).toBe('hours')
  })
})
