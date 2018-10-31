<template>
	<div class="page">
		<div class="ui form">
			<div class="field">
				<label>Minutes</label>
				<MinutesPicker v-model="minutes1"/>
			</div>
		</div>
		<div class="ui form">
			<div class="field">
				<label>Hours</label>
				<MinutesPicker v-model="minutes2" initDelimiter="h" />
			</div>
		</div>
		<div class="ui form">
			<div class="field">
				<label>Time</label>
				<MinutesPicker v-model="minutes3" type="24h" />
			</div>
		</div>
	</div>
</template>

<script>
import MinutesPicker from './MinutesPicker'

export default {
    components: { MinutesPicker },
    data () {
        return {
					minutes1: 90,
					minutes2: 1234,
					minutes3: 1400
        }
    }
}
</script>
