<template>
<transition name="slide-fade">
  <div class="popup" v-show="showSignPopup === true" :style="{ width: width }" :class="{ done }">
    <div class="box compact" v-show="contract.internal_status === 'pending' && !contract.document.document_OK_all_values_found">
      <p class="boxxed">
        <i class="mdi mdi-alert-outline"></i>
        <b>Unable to sign.</b>
        <br>The following information is missing. Click an item to edit:</p>
      <ul class="link boxxed list">
        <li v-for="item in contract.document.missing_values" :key="item">
          <a :href="`/people/${contract.employee_id}/${$t('LINK_' + item)}?back=${$route.path}`">{{$t('TAG_' + item)}}</a>
        </li>
      </ul>
    </div>
    <div class="box ui form" v-show="contract.internal_status === 'pending' && contract.document.document_OK_all_values_found" v-on-clickaway="hidePopup">
      <div class="done-filter" v-if="done"></div>
      <div class="tabs">
        <div class="tab" :class="{ active: signMode === 'text' }" @click="setModeText">
          <i class="mdi mdi-keyboard"></i>Text</div>
        <div class="tab" :class="{ active: signMode === 'draw' }" @click="setModeDraw">
          <i class="mdi mdi-pencil"></i>Draw</div>
      </div>
      <label for="name">Your name</label>
      <input class="input" id="name" ref="name" autocomplete="off" type="text" v-model="name" @keyup="setText" placeholder="Enter your full name" />
      <label>Signature &emsp;</label>
      <div class="canvas">
        <canvas :width="width" height="200" ref="canvas"></canvas>
        <a class="clear" href="#" @click="clearSig" v-if="signMode === 'draw'" v-show="!isDrawing">Clear</a>
        <div class="placeholder" v-if="name.length === 0 && !isDrawing && signMode === 'text'">Type your full name above</div>
        <div class="line"></div>
      </div>
      <div class="buttons">
        <div class="button" @click="hidePopup">Cancel</div>
        <div class="button" :class="{ blue: !notSigned }" @click="signSig">
          <template v-if="!done">Sign</template>
          <div class="contract-done" v-if="done">
            <svg class="file fadeout" viewBox="9.1 16.3 19 19">
              <path class="file-check done" d="M26.8,20.6L14.9,32.5l-5.7-5.7l2.1-2.1l3.6,3.6l9.8-9.9L26.8,20.6z" />
              <circle class="file-loading load" cx="-7" cy="19" r="7.7" /> </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
/* eslint-disable import/no-unresolved */
import SignaturePad from 'signature_pad'
import { mixin as clickaway } from 'vue-clickaway'
import { signContract } from 'api/contracts'
import profile from 'utils/profile'

export default {
  name: 'contract-sign-popup',
  props: [ 'showSignPopup', 'contract' ],
  mixins: [ clickaway ],
  data () {
    return {
      id: -1,
      signaturePad: null,
      name: '',
      signMode: 'text',
      prevDraw: null,
      width: 700,
      done: false,
      isDrawing: false // when pointer is down
    }
  },
  created () {
    window.addEventListener('resize', this.resizeCanvas)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeCanvas)
  },
  watch: {
    showSignPopup () {
      if (this.showSignPopup === true) {
        profile.getProfile().then(res => {
          this.name = res.user.real_name
          this.setText()
        })
      }
    }
  },
  mounted () {
    this.initSignature()
    this.setModeText()
    this.resizeCanvas()
  },
  computed: {
    notSigned () {
      if (this.name === '') return true
      else if (this.signMode === 'draw') return this.signaturePad.isEmpty()
      else return false
    }
  },
  methods: {
    resizeCanvas () {
      const margin = 22
      const maxWidth = Math.min(document.body.offsetWidth - margin, 700 - margin)
      this.width = maxWidth - margin
      this.setText()
    },
    hidePopup () {
      this.$emit('close')
    },
    initSignature () {
      this.signaturePad = new SignaturePad(this.$refs.canvas, {
        onBegin: () => this.isDrawing = true,
        onEnd: () => this.isDrawing = false
      })
    },
    clearSig (e) {
      if (e && e.stopPropagation) e.stopPropagation()
      if (e && e.preventDefault) e.preventDefault()
      this.signaturePad.clear()
    },
    setModeText () {
      this.signMode = 'text'
      this.setText()
      this.signaturePad.off()
    },
    setModeDraw () {
      this.clearSig()
      this.signMode = 'draw'
      this.signaturePad.on()
    },
    setText () {
      if (this.signMode === 'text') {
        this.clearSig()
        const ctx = this.$refs.canvas.getContext('2d')
        ctx.font = '32px phontphreaks_handwritingRg'
        ctx.textAlign = 'center'
        ctx.fillStyle = 'black'
        ctx.textBaseline = 'middle'
        ctx.fillText(this.name, this.$refs.canvas.offsetWidth / 2, this.$refs.canvas.offsetHeight / 2)
      }
    },
    signSig () {
      if (!this.name) {
        this.$refs.name.focus()
        return Toast.show({ description: this.$t('FILL_IN_NAME'), color: 'red' })
      }

      if (this.notSigned) {
        return Toast.show({ description: this.$t('YOUR_SIGNATURE_REQUIRED'), color: 'red' })
      }

      // signing animation is happening
      if (this.done) return

      const img = this.signaturePad.toDataURL()
      this.done = true
      signContract({ id: this.contract.id, name: this.name, base64_signature: img }).then(res => {
        this.finalizeSignature()
      }).catch(() => {
        this.done = false
      })
    },
    finalizeSignature () {
      setTimeout(() => {
        this.hidePopup()
        this.$emit('signed')
      }, 3000)
    }
  }
}
</script>
