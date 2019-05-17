<template>
  <portal :to="targetPortal">
    <transition name="slide-fade">
      <div v-if="show" class="ovc-modal-backdrop">
        <div class="ovc-modal-wrapper" :style="{ width: `${width}px` }" v-on-clickaway="onBackgroundClick">
          <div class="ovc-modal-content">
            <div class="ovc-modal-header" v-if="hasHeaderSlot">
              <slot name="header"></slot>
            </div>
            <div class="ovc-modal-body">
              <i class="mdi mdi-close" v-if="canClose" @click="onCloseIconClick"></i>
              <slot/>
            </div>
            <div class="ovc-modal-footer" v-if="hasFooterSlot">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </portal>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import { freezeBackground, unfreezeBackground } from '../utils/modals'
import '../scss/Modal.scss'

export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    width: {
      type: [ Number, String ],
      default: 380,
      required: false
    },
    canClose: {
      type: Boolean,
      default: true,
      required: false
    },
    allowBackgroundClose: {
      type: Boolean,
      default: true,
      required: false
    },
    targetPortal: {
      type: String,
      default: 'modal',
      required: false
    }
  },
  mixins: [ clickaway ],
  created () {
    document.addEventListener('keydown', this.escapeHandler)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.escapeHandler)
    unfreezeBackground()
  },
  watch: {
    show (show) {
      if (show) {
        freezeBackground()
      } else {
        unfreezeBackground()
      }
    }
  },
  mounted () {
    if (this.show) {
      freezeBackground()
    }
  },
  computed: {
    hasHeaderSlot () {
      return !!this.$slots['header']
    },
    hasFooterSlot () {
      return !!this.$slots['footer']
    },
  },
  methods: {
    // for closing on escape
    escapeHandler (e) {
      if (e.key === 'Escape' && this.show) {
        this.onCloseIconClick() // simulate icon click
      }
    },
    onCloseIconClick () {
      if (!this.canClose) {
        return
      }
      this.$emit('close')
    },
    onBackgroundClick(){
      if(!this.canClose){
        return
      }
      // If 'allowBackgroundClose' is false, the modal can only be closed by clicking the mdi-close icon.
      // this check is used if e.g. you don't want people to accidentally close the modal by clicking next to it.
      if (!this.allowBackgroundClose) {
        return
      }
      this.$emit('close')
    }
  }
}
</script>
