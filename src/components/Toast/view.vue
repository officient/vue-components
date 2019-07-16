<template>
  <div id="toast">
    <transition
      name="notification"
      mode="in-out"
      tag="div">
      <div
        class="message"
        v-if="msg.title || msg.description"
        :class="msg.color"
        @click="close(msg.id)">
        <i
          class="mdi"
          v-if="msg.icon"
          :class="msg.icon"/>
        <div
          class="title"
          v-if="msg.title">{{ msg.title }}</div>
        <div
          class="description"
          v-if="msg.description">{{ msg.description }}</div>
        <i class="mdi mdi-close"/>
      </div>
    </transition>
  </div>
</template>

<script>
import controller from './controller'

export default {
  name: 'ToastCenter',
  data () {
    return controller.data
  },
  methods: {
    close (id) {
      controller.hide(id)
    }
  }
}
</script>
