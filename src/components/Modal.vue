<template>
  <portal to="modal">
    <transition name="slide-fade">
      <div v-if="show" class="modal-backdrop">
        <div class="modal-wrapper" :style="{ width: `${width}px` }" v-on-clickaway="hideModal">
          <div class="modal-subwrapper">
            <div class="modal-content">
              <i class="mdi mdi-close" v-if="canClose" @click="hideModal"></i>
              <slot/>
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
  methods: {
    // for closing on escape
    escapeHandler (e) {
      if (e.key === 'Escape' && this.show) {
        this.hideModal()
      }
    },
    hideModal () {
      if (this.canClose) this.$emit('close')
    }
  }
}
</script>
