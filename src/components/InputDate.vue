<template>
  <input :id="id" ref="input" type="text" :name="name" autocomplete="off" :placeholder="placeholder" :value="value" @keyup="keyup" />
</template>

<script>
import Pikaday from 'pikaday'
import moment from 'moment'
const format = 'DD/MM/YYYY'

export default {
  name: 'input-date',
  props: [ 'id', 'placeholder', 'name', 'value'],
  mounted () {
    const self = this
    let field = this.$el
    this.picker = new Pikaday({
      field, format,
      yearRange: [1900, new Date().getFullYear() + 5],
      firstDay: 1,
      showDaysInNextAndPreviousMonths: true,
      onSelect (date) {
        self.$emit('input', self.picker.toString(format))
      }
    })
    self.$emit('input', self.picker.toString(format))
  },
  beforeDestroy () {
    this.picker.destroy()
    this.picker = null
  },
  methods: {
    keyup () {
      this.$emit('input', this.$refs.input.value)
    }
  }
}
</script>
