<template>
  <img v-if="hasError === false" v-show="loaded" :src="src" @error="imgError" @load="imgLoaded"/>
</template>

<script>
export default {
  name: 'TryImage',
  props: ['src'],
  data () {
    return {
      hasError: false,
      loaded: false
    }
  },
  methods: {
    imgLoaded () {
      this.hasError = false
      this.loaded = true
    },
    imgError (e) {
      e.preventDefault()
      e.stopPropagation()
      this.hasError = true
    }
  }
}
</script>
