<template>
  <div class="pagination">
    <div class="arrow left" @click="prevPage" :class="{ disabled: isPrevDisabled }">
      <i class="mdi mdi-angle-left"></i>
    </div>
    <div class="text">{{ humanizedPage }}</div>
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
    }
  },
  computed: {
    humanizedPage () {
      return this.page + 1
    },
    isPrevDisabled () {
      return this.page === 0
    },
    isNextDisabled () {
      return this.pageCount < this.perPage
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
