<template>
  <div
    class="AvatarImage"
    :class="{ fallback: hasError }">
    <img
      v-if="hasError === false"
      v-show="loaded"
      :src="src"
      @error="imgError"
      @load="imgLoaded">
    <span
      v-if="hasError === true"
      :style="{ backgroundColor }">{{ text }}</span>
  </div>
</template>

<script>
import avatarColors from './avatar-colors'
const errorsList = []
export default {
  name: 'AvatarImage',
  props: {
    'src': {
      type: String,
      default: ''
    },
    'name': {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      hasError: null,
      loaded: false
    }
  },
  mounted () {
    this.checkErrorList()
  },
  computed: {
    text () {
      if (!this.name) return ''
      return this.name.split(' ').map(x => x[0]).slice(0, 2).join('')
    },
    backgroundColor () {
      if (!this.text) return
      const bytes = this.text.split('').reduce((acc, val) => acc + val.charCodeAt(0), 0)
      return avatarColors[ bytes % avatarColors.length ]
    }
  },
  watch: {
    src () {
      this.checkErrorList()
    }
  },
  methods: {
    checkErrorList () {
      this.hasError = errorsList.indexOf(this.src) > -1
    },
    imgLoaded () {
      this.loaded = true
    },
    imgError (e) {
      e.preventDefault()
      e.stopPropagation()
      this.hasError = true
      if (errorsList.indexOf(this.src) === -1) errorsList.push(this.src)
    }
  }
}
</script>

<style lang="scss">
$bold: 700;
$white: white;

.AvatarImage {
  img {
    display: inline-block;
    vertical-align: middle;
    border: none;
    border-radius: 100%;
  }
  span {
    display: block;
    vertical-align: middle;
    text-align: center;
    display: none;
    font-weight: $bold;
    border-radius: 100%;
    text-transform: uppercase;
    color: $white;
    color: rgba(255, 255, 255, .9);
  }

  &.fallback {
    img { display: none; }
    span { display: inline-block; }
  }

  &.inline {
    display: inline-block;
    margin-right: 10px;
    position: relative;
    top: -1px;
    vertical-align: middle;
  }

  &.alignTop {
    img, span {
      vertical-align: top;
    }
  }

  &.size-16 {
    &, img, span {
      width: 16px;
      height: 16px;
    }
    span {
      line-height: 18px;
      font-size: 8px;
    }
  }

  &.size-24 {
    &, img, span {
      width: 25px;
      height: 25px;
    }
    span {
      line-height: 25px;
      font-size: 11px;
      padding: 1px;
    }
  }

  &.size-36 {
    &, img, span {
      width: 36px;
      height: 36px;
    }
    span {
      line-height: 36px;
    }
  }


  &.size-40 {
    &, img, span {
      width: 40px;
      height: 40px;
    }
    span {
      line-height: 40px;
    }
  }

  &.size-48 {
    &, img, span {
      width: 48px;
      height: 48px;
    }
    span {
      line-height: 48px;
    }
  }

  &.size-96 {
    &, img, span {
      height: 96px;
      width: 96px;
    }
    span {
      font-size: 32px;
      line-height: 94px;
      font-weight: $bold;
    }
  }

  &.userpopup {
    img, span {
      vertical-align: top;
    }
    span {
      font-size: 24px;
    }
  }

  &.shadow {
    img, span {
      border: 3px solid white;
      box-sizing: border-box;
      box-shadow: 0px 2px 8px rgba(0,0,0,.1);
    }
  }

  &.marker {
    img, span {
      border: 1px solid white;
      box-sizing: border-box;
      box-shadow: 0px 2px 8px rgba(0,0,0,.3);
      width: 36px;
      height: 36px;
    }
    span {
      line-height: 34px;
    }
  }
}
</style>