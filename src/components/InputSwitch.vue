<template lang="html">
  <label
    class="input-switch"
    :class="{ 'input-switch-disabled': disabled, 'input-switch-checked': checked }"
    role="switch"
    :aria-checked="checked"
    :aria-disable="disabled"
  >
    <input
      class="input-switch__input"
      type="checkbox"
      @change="handleChange"
      ref="input"
      :name="name"
      :value="value"
      :disabled="disabled"
    >
    <span v-if="labelLeft" class="input-switch__label input-switch__label--left" >
      <span :aria-hidden="checked">{{ labelLeft }}</span>
    </span>
    <span class="input-switch__core" ref="core">
      <span class="input-switch__button"></span>
    </span>
    <span v-if="labelRight" class="input-switch__label input-switch__label--right" >
      <span :aria-hidden="!checked">{{ labelRight }}</span>
    </span>
  </label>
</template>

<script>
import '../scss/InputSwitch.scss'

export default {
  name: 'InputSwitch',
  props: {
    value: {
      type: [Boolean, Number],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    labelRight: String,
    labelLeft: String
  },
  computed: {
    checked () {
      return this.value
    }
  },
  data () {
    return {
      typeOfValue: typeof this.value
    }
  },
  methods: {
    handleChange () {
      let emittedValue = this.$refs.input.checked
      if (this.typeOfValue === 'number') {
        emittedValue = emittedValue ? 1 : 0
      }
      this.$emit('input', emittedValue)
      this.$emit('change', emittedValue)
    },
    switchValue () {
      if (!this.disabled) {
        this.handleChange()
      }
    }
  },
  mounted () {
    this.$refs.input.checked = this.value
  }
}
</script>
