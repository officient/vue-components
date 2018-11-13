import { shallow } from '@vue/test-utils'
import Pagination from '../src/components/Pagination/Pagination'

describe('Pagination.vue', () => {
  describe('computed', () => {
    it('humanizedPage returns the page + 1 (zerobased)', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 0,
          perPage: 10,
          pageCount: 9
        }
      })

      expect(wrapper.vm.humanizedPage).toBe(1)
    })

    it('isPrevDisabled returns true when on first page (0)', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 0,
          perPage: 10,
          pageCount: 9
        }
      })

      expect(wrapper.vm.isPrevDisabled).toBe(true)
    })

    it('isPrevDisabled returns false when not on first page (0)', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 1,
          perPage: 10,
          pageCount: 9
        }
      })

      expect(wrapper.vm.isPrevDisabled).toBe(false)
    })

    it('isNextDisabled returns true when pageCount < perPage', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 1,
          perPage: 10,
          pageCount: 9
        }
      })

      expect(wrapper.vm.isNextDisabled).toBe(true)
    })

    it('isNextDisabled returns false when pageCount !< perPage', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 1,
          perPage: 10,
          pageCount: 10
        }
      })

      expect(wrapper.vm.isNextDisabled).toBe(false)
    })
  })

  describe('methods', () => {
    it('prevPage emits onPageChanged with current page - 1', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 1,
          perPage: 10,
          pageCount: 10
        }
      })

      wrapper.vm.prevPage()
      expect(wrapper.emitted('onPageChanged')).toEqual([[ 0 ]])
    })

    it('nextPage emits onPageChanged with current page + 1', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 1,
          perPage: 10,
          pageCount: 10
        }
      })

      wrapper.vm.nextPage()
      expect(wrapper.emitted('onPageChanged')).toEqual([[ 2 ]])
    })
  })
})
