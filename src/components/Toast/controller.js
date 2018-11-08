var timers = null

const controller = {
  data: {
    msg: {}
  },
  // Remove the toast msg from the data array
  hide () {
    controller.data.msg = {}
  },
  // internal use
  setTimer (timeOut) {
    if (timers) window.clearTimeout(timers)
    timers = window.setTimeout(function () {
      controller.hide()
    }, timeOut)
  },
  // Adds a toast message with a title, description and icon
  // Then automatically removes the file after timeOut time...
  show ({ title, description, icon, color, timeOut }) {
    if (timeOut == null) timeOut = 3000
    controller.data.msg = { title, description, icon, color }
    if (timeOut !== 0) controller.setTimer(timeOut)
  },

  // On uncaught XHR exceptions
  showError (res) {
    console.error('Toast', res)
    const msg = res.body && res.body.reason_phrase ? res.body.reason_phrase : res.statusText
    controller.show({ title: 'Error', description: msg, color: 'red' })
  }
}

export default controller
