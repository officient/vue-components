<template>
  <div class="minutes-picker">
    <input
      v-if="name"
      type="hidden"
      :name="name"
      :value="value"
    >
    <input
      ref="input"
      type="text"
      v-model="string"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      @click.prevent.stop="click"
      @keydown="keydown"
      @keyup="keyup"
      @change="keyup"
      @blur="blur"
    >
  </div>
</template>

<script>
export default {
  name: 'MinutesPicker',
  props: {
    value: {
      type: [ Number, String ],
      default: 0
    },
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    // : or h or u
    initDelimiter: {
      type: String,
      default: ''
    }
  },
  data () {
    let hours = this.parseHours()
    let minutes = this.parseMinutes()

    let delimiter = ':'
    if (this.initDelimiter) delimiter = this.initDelimiter

    let string = hours + delimiter + minutes

    return {
      delimiter,
      focus: 'hours',
      string,
      hours,
      minutes
    }
  },
  computed: {
    is24h () {
      return this.type === '24h'
    }
  },
  methods: {
    parseHours () {
      let hours = Math.floor(this.value / 60).toFixed(0)
      if (hours.length === 1) hours = '0' + hours
      return hours
    },
    parseMinutes () {
      let minutes = Math.round(this.value % 60).toFixed(0)
      if (minutes.length === 1) minutes = '0' + minutes
      return minutes
    },
    renderText () {
      let hours = this.parseHours()
      let minutes = this.parseMinutes()
      this.string = hours + this.delimiter + minutes
    },
    renderString () {
      this.string = this.hours + this.delimiter + this.minutes
    },
    setHoursMinutesFromString () {
      if (this.string.indexOf(':') > -1) this.delimiter = ':'
      else if (this.string.indexOf('h') > -1) this.delimiter = 'h'
      else if (this.string.indexOf('u') > -1) this.delimiter = 'u'

      const arr = this.string.split(this.delimiter)
      this.hours = arr[0]
      this.minutes = arr[1]

      if (isNaN(parseInt(this.hours))) this.hours = '00'
      if (isNaN(parseInt(this.minutes))) this.minutes = '00'
      if (!this.minutes) this.minutes = '00'
    },
    emit () {
      const totalMinutes = (parseInt(this.hours) * 60) + parseInt(this.minutes)
      this.$emit('input', totalMinutes)
    },
    select () {
      let start = 0
      let end = this.string.length

      if (this.focus === 'hours') {
        start = 0
        end = this.hours.length
      } else if (this.focus === 'minutes') {
        start = this.hours.length + 1
        end = start + this.minutes.length
      }

      this.$refs.input.setSelectionRange(start, end)
    },

    sendUpdateAndFocus () {
      // send event that updates parent's value
      this.emit()

      this.$nextTick(() => {
        // Wait until value changed in our own component and re-render
        this.renderText()

        this.$nextTick(() => {
          // select text after input value changed
          this.select()
        })
      })
    },
    addHours (amount) {
      let hours = parseInt(this.hours)
      hours += amount
      if (hours < 0) hours = 0
      if (this.is24h && hours > 23) hours = 23
      hours = hours.toFixed(0)
      if (hours.length === 1) hours = '0' + hours

      this.hours = hours
      this.sendUpdateAndFocus()
    },
    addMinutes (amount) {
      let min = parseInt(this.minutes)
      min += amount
      if (amount === -5 && this.minutes == 59) {
        min = 55
      }
      if (min < 0) min = 0
      if (min > 59) min = 59
      min = min.toFixed(0)
      if (min.length === 1) min = '0' + min

      this.minutes = min
      this.sendUpdateAndFocus()
    },
    click () {
      const selectionStart = this.$refs.input.selectionStart
      if (selectionStart > this.hours.length) {
        this.focus = 'minutes'
      } else {
        this.focus = 'hours'
      }
      this.select()
    },
    keydown (e) {
      const preventStop = () => { e.preventDefault(); e.stopPropagation(); return true }

      if (e.keyCode === 9) { // tab
        // go from hours to minutes
        if (this.focus === 'hours' && !e.shiftKey) {
          this.focus = 'minutes'
          this.select()
          return preventStop()
        }

        // go from minutes to hours
        if (this.focus === 'minutes' && e.shiftKey) {
          this.focus = 'hours'
          this.select()
          return preventStop()
        }
      }

      if (e.keyCode === 39) { // right
        // go from hours to minutes
        if (this.focus === 'hours') {
          this.focus = 'minutes'
          this.select()
          return preventStop()
        }
      }

      if (e.keyCode === 37) { // left
        // go from minutes to hours
        if (this.focus === 'minutes') {
          this.focus = 'hours'
          this.select()
          return preventStop()
        }
      }

      if (e.keyCode === 38) { // up
        if (this.focus === 'hours') {
          this.addHours(1)
          return preventStop()
        } else if (this.focus === 'minutes') {
          this.addMinutes(5)
          return preventStop()
        }
      }

      if (e.keyCode === 40) { // down
        if (this.focus === 'hours') {
          this.addHours(-1)
          return preventStop()
        } else if (this.focus === 'minutes') {
          this.addMinutes(-5)
          return preventStop()
        }
      }
    },
    keyup (e) {
      if (this.is24h) {
        if (this.string.length === 2 && e.keyCode !== 8) { // backspace
          this.setHoursMinutesFromString()
          this.renderString()
          this.$nextTick(() => {
            this.focus = 'minutes'
            this.select()
          })
        } else if (this.$refs.input.selectionStart === 2) {
          this.$nextTick(() => {
            this.focus = 'minutes'
            this.select()
          })
        }
      }

      this.setHoursMinutesFromString()
      this.emit()
    },
    blur () {
      this.renderText()
    }
  }
}
</script>
