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

    it('pageText is humanizedPage: 1', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 0,
          perPage: 10,
          pageCount: 9
        }
      })

      expect(wrapper.vm.humanizedPage).toBe(1)
      expect(wrapper.vm.pageText).toBe('1')
    })

    it('pageText is humanizedPage: 2', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 1,
          perPage: 10,
          pageCount: 9
        }
      })

      expect(wrapper.vm.humanizedPage).toBe(2)
      expect(wrapper.vm.pageText).toBe('2')
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

  describe('totalCount', () => {
    // totalPageCount
    it('computed totalPageCount is rounded up total / per page', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 1,
          perPage: 10,
          pageCount: 10,
          totalCount: 21
        }
      })
      expect(wrapper.vm.totalPageCount).toBe(3)

      wrapper.setProps({ totalCount: 20 })
      expect(wrapper.vm.totalPageCount).toBe(2)

      wrapper.setProps({ totalCount: 19 })
      expect(wrapper.vm.totalPageCount).toBe(2)
    })

    it('if pagecount is less than max allowed items, disable next', () => {
      // 9 items out of 10 items per page, next is disabled
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 0,
          perPage: 10,
          pageCount: 9,
          totalCount: 19
        }
      })

      expect(wrapper.vm.isNextDisabled).toBe(true)
    })

    it('if page is higher to max pages, disable next', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 2,
          perPage: 10,
          pageCount: 9,
          totalCount: 19
        }
      })

      expect(wrapper.vm.humanizedPage).toBe(3)
      expect(wrapper.vm.totalPageCount).toBe(2)
      expect(wrapper.vm.isNextDisabled).toBe(true)
    })

    it('if page is equal to max pages, disable next', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 1,
          perPage: 10,
          pageCount: 9,
          totalCount: 19
        }
      })

      expect(wrapper.vm.humanizedPage).toBe(2)
      expect(wrapper.vm.totalPageCount).toBe(2)
      expect(wrapper.vm.isNextDisabled).toBe(true)
    })

    it('if page is lower than max pages and page count is perpage count, enable next', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 1,
          perPage: 10,
          pageCount: 10,
          totalCount: 21
        }
      })

      expect(wrapper.vm.humanizedPage).toBe(2)
      expect(wrapper.vm.totalPageCount).toBe(3)
      expect(wrapper.vm.isNextDisabled).toBe(false)
    })

    it('text adds "/ maxpages" with totalCount', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 1,
          perPage: 10,
          pageCount: 10,
          totalCount: 21
        }
      })

      expect(wrapper.vm.humanizedPage).toBe(2)
      expect(wrapper.vm.totalPageCount).toBe(3)
      expect(wrapper.vm.pageText).toBe('2 / 3')
    })
  })

  describe('all use cases with disabled and text', () => {
    it('next disabled prev disabled', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 0,
          perPage: 10,
          pageCount: 9,
        }
      })

      expect(wrapper.vm.isNextDisabled).toBe(true)
      expect(wrapper.vm.isPrevDisabled).toBe(true)
      expect(wrapper.vm.pageText).toBe('1')
    })

    it('next enabled prev disabled', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 0,
          perPage: 10,
          pageCount: 10,
        }
      })

      expect(wrapper.vm.isNextDisabled).toBe(false)
      expect(wrapper.vm.isPrevDisabled).toBe(true)
      expect(wrapper.vm.pageText).toBe('1')
    })

    it('next disabled prev enabled', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 1,
          perPage: 10,
          pageCount: 9,
        }
      })

      expect(wrapper.vm.isNextDisabled).toBe(true)
      expect(wrapper.vm.isPrevDisabled).toBe(false)
      expect(wrapper.vm.pageText).toBe('2')
    })

    it('next enabled prev enabled', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 1,
          perPage: 10,
          pageCount: 10,
        }
      })

      expect(wrapper.vm.isNextDisabled).toBe(false)
      expect(wrapper.vm.isPrevDisabled).toBe(false)
      expect(wrapper.vm.pageText).toBe('2')
    })

    it('next disabled prev disabled, with totalCount', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 0,
          perPage: 10,
          pageCount: 10,
          totalCount: 10
        }
      })

      expect(wrapper.vm.isNextDisabled).toBe(true)
      expect(wrapper.vm.isPrevDisabled).toBe(true)
      expect(wrapper.vm.pageText).toBe('1 / 1')
    })

    it('next enabled prev disabled, with totalCount', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 0,
          perPage: 10,
          pageCount: 10,
          totalCount: 19
        }
      })

      expect(wrapper.vm.isNextDisabled).toBe(false)
      expect(wrapper.vm.isPrevDisabled).toBe(true)
      expect(wrapper.vm.pageText).toBe('1 / 2')
    })

    it('next disabled prev enabled, with totalCount', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 1,
          perPage: 10,
          pageCount: 10,
          totalCount: 20
        }
      })

      expect(wrapper.vm.isNextDisabled).toBe(true)
      expect(wrapper.vm.isPrevDisabled).toBe(false)
      expect(wrapper.vm.pageText).toBe('2 / 2')
    })

    it('next enabled prev enabled, with totalCount', () => {
      const wrapper = shallow(Pagination, {
        propsData: {
          page: 1,
          perPage: 10,
          pageCount: 10,
          totalCount: 21
        }
      })

      expect(wrapper.vm.isNextDisabled).toBe(false)
      expect(wrapper.vm.isPrevDisabled).toBe(false)
      expect(wrapper.vm.pageText).toBe('2 / 3')
    })
  })
})
