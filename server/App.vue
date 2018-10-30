<template>
  <div id="app">
    <a class="mt-20px block" href="/">Index</a>
    <div class="page-container">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { RouterView, data } from './plugins/router'

export default {
  name: 'app',
  components: {
    RouterView
  },
  data () {
    return {
      route: data,
    }
  },
}
</script>
