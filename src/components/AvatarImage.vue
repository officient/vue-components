<template>
  <div
    class="AvatarImage"
    :class="{ fallback: hasError || forceInitials }">
    <img
      v-if="hasError === false && !forceInitials"
      v-show="loaded"
      :src="src"
      @error="imgError"
      @load="imgLoaded"
    />
    <span
      v-if="hasError === true || forceInitials"
      :style="{ backgroundColor }">{{ text }}</span>
  </div>
</template>

<script>
import avatarColors from '../utils/avatar-colors'

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
    },
    'forceInitials': {
      type: Boolean,
      default: false,
    },
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