<template>
	<div>
		<button @click="show = true">Show me!</button>
		<div style="height: 1000px; background-color: antiquewhite;"><p>This div is to simulate scroll behaviour (for freezing background purpose)</p></div>
		<Modal :show="show" @close="show = false" width="800">
				<div slot="header">This is the header here</div>
				<div>
					<h1>Hello, I'm a Modal!</h1>
					<p style="height: 2000px">By default I freeze your background.<br> 
					Click and scroll around to test my behaviour.<br> 
					If you have ideas to prettify me, please tell Giupetto..</p>
				</div>
				<div slot="footer">
					<button @click="show = false">Close</button>
					<button @click="show = false">Save</button>
				</div>
		</Modal>
	</div>
</template>

<script>
import Modal from '../../../lib/components/Modal'

export default {
	components: { Modal },
	data () {
		return {
			show: false
		}
	},
}
</script>
