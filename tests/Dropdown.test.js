import { shallow } from '@vue/test-utils'
import Dropdown from '../src/components/Dropdown/Dropdown'

describe('Dropdown', () => {
  describe('computed', () => {
    it('should have hasDefaultTarget true when no target slot provided', () => {
      const wrapper = shallow(Dropdown)
      expect(wrapper.vm.hasDefaultTarget).toBe(true)
    })

    it('should have hasDefaultTarget false target slot provided', () => {
      const wrapper = shallow(Dropdown, {
        slots: {
          target: '<div />'
        }
      })
      expect(wrapper.vm.hasDefaultTarget).toBe(false)
    })
  })

  describe('methods', () => {
    it('hideList should set listVisible false and clear forcedStyle', () => {
      const wrapper = shallow(Dropdown)
      wrapper.setData({ listVisible: true, forcedStyle: { some: 'data' }})

      wrapper.vm.hideList()
      expect(wrapper.vm.listVisible).toBe(false)
      expect(wrapper.vm.forcedStyle).toEqual({})
    })

    it('onMenuClick should hideList', () => {
      const wrapper = shallow(Dropdown)
      wrapper.setData({ listVisible: true, forcedStyle: { some: 'data' }})

      wrapper.vm.onMenuClick()
      expect(wrapper.vm.listVisible).toBe(false)
      expect(wrapper.vm.forcedStyle).toEqual({})
    })

    it('onMenuClick should not hideList when closeOnClick disabled', () => {
      const wrapper = shallow(Dropdown, { propsData: { closeOnClick: false }})
      wrapper.setData({ listVisible: true, forcedStyle: { some: 'data' }})

      wrapper.vm.onMenuClick()
      expect(wrapper.vm.listVisible).toBe(true)
      expect(wrapper.vm.forcedStyle).toEqual({ some: 'data' })
    })

    it('cleartimer should cleartimeout and set timer to null', () => {
      const autoCloseTimeout = 'VALUE'
      window.clearTimeout = jest.fn()
      const wrapper = shallow(Dropdown)
      wrapper.setData({ autoCloseTimeout })
      wrapper.vm.clearTimer()

      expect(window.clearTimeout).toHaveBeenCalledWith(autoCloseTimeout)
      expect(wrapper.vm.autoCloseTimeout).toBe(null)
    })

    it('showlist should clear timer', () => {
      const autoCloseTimeout = 'VALUE'
      window.clearTimeout = jest.fn()
      const wrapper = shallow(Dropdown)
      wrapper.setData({ autoCloseTimeout })
      wrapper.vm.showList()

      expect(window.clearTimeout).toHaveBeenCalledWith(autoCloseTimeout)
      expect(wrapper.vm.autoCloseTimeout).toBe(null)
    })

    it('showlist should not !listVisble when is visible and closeOnClick false', () => {
      const wrapper = shallow(Dropdown, { propsData: { closeOnClick: false }})
      wrapper.setData({ listVisible: true })
      wrapper.vm.showList()

      expect(wrapper.vm.listVisible).toBe(true)
    })

    it('showlist should !listVisble when is visible and closeOnClick not false', () => {
      const wrapper = shallow(Dropdown, { propsData: { closeOnClick: true }})
      wrapper.setData({ listVisible: true })
      wrapper.vm.showList()

      expect(wrapper.vm.listVisible).toBe(false)
    })

    it('showlist should not clear forcedstyle when list is no longer visible', () => {
      const wrapper = shallow(Dropdown, { propsData: { closeOnClick: true }})
      wrapper.setData({ listVisible: true, forcedStyle: { some: 'data' }})
      wrapper.vm.showList()

      expect(wrapper.vm.listVisible).toBe(false)
      expect(wrapper.vm.forcedStyle).toEqual({ some: 'data' })
    })

    it('showlist should clear forcedstyle when list is visible', () => {
      const wrapper = shallow(Dropdown, { propsData: { closeOnClick: true }})
      wrapper.setData({ listVisible: false, forcedStyle: { some: 'data' }})
      wrapper.vm.showList()

      expect(wrapper.vm.listVisible).toBe(true)
      expect(wrapper.vm.forcedStyle).toEqual({})
    })
  })
})
