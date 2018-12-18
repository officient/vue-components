<template>
    <div>
        <div v-for="r in routes" :key="r.path" class="mt-20px">
            <a :href="r.path">{{ r.path }}</a>
        </div>
    </div>
</template>

<script>
import './icomoon.scss'
import routes from './routes'

export default {
	data() {
		return {
			routes,
		}
	},
}
</script>