<template>
  <div class="field" :disabled="disabled">
    <label :for="`input${name}`">
      {{title}}
      <span v-if="required" class="required">*</span>
    </label>
    <div class="input" :style="{ position: 'relative' }">
      <slot name="label"></slot>
      <input
        :id="`input${name}`"
        :name="name"
        :type="type"
        autocomplete="off"
        :placeholder="placeholder"
        :value="value"
        @input="input($event.target.value)"
        @keyup="validate"
        :disabled="disabled"
      >
    </div>
  </div>
</template>

<script>
export default {
	name: 'InputText',
	props: {
		name: String,
		title: String,
		placeholder: {
			type: [String, Number],
			default: '',
		},
		disabled: Boolean,
		value: [String, Number],
		type: {
			type: String,
			default: 'text',
		},
		required: Boolean,
	},
	methods: {
		input(value) {
			this.$emit('input', value)
		},
		validate(event) {
			// make sure the method does exist on the parent,
			// don't try to crash by deeply accessing props
			if (
				this.$parent &&
				this.$parent.$options &&
				this.$parent.$options.methods &&
				this.$parent.$options.methods.validateOnKeyUp
			) {
				// use the context scope of the parent via call
				this.$parent.$options.methods.validateOnKeyUp.call(
					this.$parent,
					event
				)
			}
		},
	},
}
</script>
