<template>
  <div class="dropdown" v-on-clickaway="hideList">
    <span class="target" @click="showList" :aria-expanded="listVisible">
      <template v-if="hasDefaultTarget">
        <span>{{ title }}</span>
        <i class="mdi mdi-chevron-down"></i>
      </template>
      <slot name="target"></slot>
    </span>

    <div
      ref="list"
      v-if="listVisible"
      class="menu"
      @click="onMenuClick"
      :class="menuClass"
      :style="forcedStyle"
    >
      <slot name="menu"></slot>
    </div>
  </div>
</template>

<script>
/* eslint-disable import/no-unresolved */
import { mixin as clickaway } from 'vue-clickaway'
import { getCoordsOfElem } from './../../../lib/utils/dom.js'

export default {
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      default: ''
    },
    menuClass: {
      type: String,
      default: ''
    },
    showOnInit: {
      type: Boolean,
      default: false
    },
    closeOnClick: {
      type: Boolean,
      default: true
    },
    hideAfterMs: {
      type: Number,
      default: 3000
    }
  },
  mixins: [ clickaway ],
  data () {
    return {
      listVisible: false,
      autoCloseTimeout: null,
      forcedStyle: {}
    }
  },
  mounted () {
    if (this.showOnInit) {
      this.showList()
      this.autoCloseTimeout = setTimeout(() => this.hideList(), this.hideAfterMs)
    }
  },
  computed: {
    hasDefaultTarget () {
      return !this.$slots['target']
    }
  },
  methods: {
    showList () {
      // when manually showing the list, clear any pending timeouts
      this.clearTimer(this.autoCloseTimeout)

      // this function can also hide the list when it's already active.
      // It should not do that when the closeOnClick flag is false
      if (this.listVisible && this.closeOnClick === false) return

      this.listVisible = !this.listVisible
      if (!this.listVisible) return

      this.forcedStyle = {}
      this.$nextTick(() => {
        if (this.$refs.list) {
          var current = this.$refs.list.querySelector('.active')
          if (current) {
            this.$refs.list.scrollTop = current.offsetTop - 50
          }
          this.rePosition()
        }
      })
    },
    clearTimer () {
      clearTimeout(this.autoCloseTimeout)
      this.autoCloseTimeout = null
    },
    onMenuClick () {
      if (this.closeOnClick === false) return
      this.hideList()
    },
    hideList () {
      this.listVisible = false
      this.forcedStyle = {}
    },
    rePosition () {
      if (!this.$refs.list) return

      const margin = 25
      const position = getCoordsOfElem(this.$refs.list)
      const width = this.$refs.list.offsetWidth
      const windowWidth = window.innerWidth
      const leftMostPosition = position.left + width + margin
      const style = {}

      if (leftMostPosition > windowWidth) { // out of bounds
        style.left = 'auto'
        style.right = '0px'

        // Check if align rights works
        if (position.left - this.$refs.list.offsetWidth < 0) {
          style.position = 'fixed'
          style.left = window.innerWidth - (this.$refs.list.offsetWidth + margin) + 'px'
          style.top = position.top + 'px'
          style.right = null
        }
      }

      if (style.left < 0 || (width + margin + margin ) > windowWidth) { // Window too small
        style.position = 'fixed'
        style.left = margin + 'px'
        style.top = position.top + 'px'
        style.width = (windowWidth - margin - margin) + 'px'
        style.minWidth = 'auto'
      }

      this.forcedStyle = style
    }
  }
}
</script>
