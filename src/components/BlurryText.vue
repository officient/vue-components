<template lang="html">
  <span
    v-if="isBlurred"
    class="blurry-text"
    :style="blurryStyle"
    ref="blurry"
    @mouseover="isBlurred = false"
  >
    {{ blurredText }}
  </span>
  <span
    v-else
    @mouseleave="isBlurred = true"
  >
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'BlurryText',
  props: {
    text: {
      type: String,
      default: ''
    },
    blurSize: {
      type: Number,
      default: 12
    },
    blurColor: {
      type: String,
      default: 'rgba(0, 0, 0, .5)'
    }
  },
  data () {
    return {
      isBlurred: true
    }
  },
  computed: {
    blurryStyle () {
      return {
        color: 'transparent',
        textShadow: `0 0 ${this.blurSize}px ${this.blurColor}`
      }
    },
    blurredText () {
      return this.text.split('').sort((a, b) => {
        return (7 - (Math.random() + '')[5])
      }).join('')
    }
  }
}
</script>
