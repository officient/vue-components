<template>
	<div class="page">
		<p>default</p>
		<div class="ui form">
			<div class="field">
				<input-switch v-model="value1" />
			</div>
		</div>
		<p>disabled</p>
		<div class="ui form">
			<div class="field">
				<input-switch v-model="value2" disabled />
			</div>
			<div class="field">
				<input-switch v-model="value3" disabled />
			</div>
		</div>
		<p>with labels</p>
		<div class="ui form">
			<div class="field">
				<input-switch v-model="value4" label-right="right label" />
			</div>
			<div class="field">
				<input-switch v-model="value4" label-left="left label" />
			</div>
		</div>
		<p>with number v-model</p>
		<div class="ui form">
			<div class="field">
				<input-switch v-model="num" />
				<span>{{num}}</span>
			</div>
			<div class="field">
				<input-switch v-model="bool" />
				<span>{{bool}}</span>
			</div>
		</div>
	</div> 
</template>

<script>
import InputSwitch from '../../lib/components/InputSwitch'

export default {
	components: { InputSwitch },
	data () {
		return {
			value1: false,
			value2: false,
			value3: true,
			value4: false,
			num: 1,
			bool: true
		}
	}

}
</script>
