<template>
  <div class="pagination">
    <div class="arrow left" @click="prevPage" :class="{ disabled: isPrevDisabled }">
      <i class="mdi mdi-angle-left"></i>
    </div>
    <div class="text">{{ pageText }}</div>
    <div class="arrow right" @click="nextPage" :class="{ disabled: isNextDisabled }">
      <i class="mdi mdi-angle-right"></i>
    </div>
  </div>
</template>

<script>
import '../../scss/pagination.scss'

export default {
  name: 'Pagination',
  props: {
    page: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    pageCount: {
      type: Number,
      required: true
    },
    totalCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    pageText () {
      if (this.totalCount) {
        // if we have total count, compute totalPageCount
        // and append to string: <n/N>
        return `${this.humanizedPage} / ${this.totalPageCount}`
      } else {
        // no total count just show page number: <n>
        return `${this.humanizedPage}`
      }
    },
    humanizedPage () {
      // api is zerobased
      return this.page + 1
    },
    totalPageCount () {
      // only computed when totalCount is set
      return Math.ceil(this.totalCount / this.perPage) || 0
    },
    isPrevDisabled () {
      // page is 0, can not go back further
      return this.page === 0
    },
    isNextDisabled () {
      // end of pagination
      // page contains less items than max allowed
      if (this.pageCount < this.perPage) {
        return true
      }

      // end of pagination
      // if we have total count, compute totalPageCount
      // and check if current page is >= than total pages
      if (this.totalCount && this.humanizedPage >= this.totalPageCount) {
        return true
      }

      return false
    }
  },
  methods: {
    prevPage () {
      if (this.isPrevDisabled === false) {
        const prevPage = this.page - 1
        this.$emit('onPageChanged', prevPage)
      }
    },
    nextPage () {
      if (this.isNextDisabled === false) {
        const nextPage = this.page + 1
        this.$emit('onPageChanged', nextPage)
      }
    }
  }
}
</script>
