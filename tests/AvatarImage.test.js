import Vue from 'vue'
import { shallow } from '@vue/test-utils'
import AvatarImage from '../src/components/AvatarImage'

const sleep = (scs = 0) => new Promise((resolve, reject) => setTimeout(() => resolve(), scs))

const eventMock = {
  preventDefault: jest.fn(),
  stopPropagation: jest.fn()
}

describe('AvatarImage.vue', () => {
  it('renders a circle with JD', async () => {
    const wrapper = shallow(AvatarImage, {
      propsData: { src: '404no_exists', name: 'John Doe' }
    })

    await sleep()
    expect(wrapper.contains('img')).toBe(true)

    wrapper.vm.imgError(eventMock)

    await sleep()
    expect(wrapper.contains('img')).toBe(false)
    expect(wrapper.vm.hasError).toBe(true)
    expect(wrapper.classes()).toContain('fallback')
    expect(wrapper.contains('span')).toBe(true)
    expect(wrapper.text()).toBe('JD')
  })
})
