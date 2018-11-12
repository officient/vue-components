<template>
	<div class="page">
		<div>
			<BlurryText text="hey"/>
		</div>
		<div :style="{ fontSize: '64px' }">
			header: <BlurryText :blur-size="64" text="€ 2000.43" />
		</div>
		<div :style="{ color: 'red' }">
			lorem <BlurryText blur-color="red" text="ipsum sit amet" /> end
		</div>
	</div>
</template>

<script>
import BlurryText from '../../../lib/components/BlurryText'

export default {
	components: { BlurryText }
}
</script>
