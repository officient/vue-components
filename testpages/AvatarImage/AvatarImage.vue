<template>
	<div>
		<div class="mt-20px">
			<AvatarImage
				class="inline size-96"
				src="https://www.gravatar.com/avatar/ee1910239c24d8193dcf32bc6c502d7e?d=404"
				name="Ilias Ismanalijev"
			/>
			found gravatar
		</div>
		<div class="mt-20px">
			<AvatarImage
				class="inline size-96"
				src="https://www.gravatar.com/avatar/ee1910239c24d8193dcf32bc6c7e?d=404"
				name="Willem Delbare"
			/>
			not found gravatar
		</div>
		<div class="mt-20px">
			<AvatarImage
				class="inline size-96"
				src="https://www.gravatar.com/avatar/ee1910239c24d8193dcf32bc6c502d7e?d=404"
				name="Ilias Ismanalijev"
				:forceInitials="true"
			/>
			Force initials
		</div>
		<div class="mt-20px">
			<AvatarImage
				class="inline size-96 shadow"
				src="https://www.gravatar.com/avatar/ee1910239c24d8193dcf32bc6c7e?d=404"
				name="Willem Delbare"
			/>
			with shadow
		</div>
		<div class="mt-20px">
			<AvatarImage
				class="inline marker"
				src="https://www.gravatar.com/avatar/ee1910239c24d8193dcf32bc6c7e?d=404"
				name="Willem Delbare"
			/>
			marker on a map
		</div>
		<div class="mt-20px">
			<AvatarImage
				class="inline size-16"
				src="https://www.gravatar.com/avatar/ee1910239c24d8193dcf32bc6c7e?d=404"
				name="1 6"
			/>
			<AvatarImage
				class="inline size-24"
				src="https://www.gravatar.com/avatar/ee1910239c24d8193dcf32bc6c7e?d=404"
				name="2 4"
			/>
			<AvatarImage
				class="inline size-36"
				src="https://www.gravatar.com/avatar/ee1910239c24d8193dcf32bc6c7e?d=404"
				name="3 6"
			/>
			<AvatarImage
				class="inline size-40"
				src="https://www.gravatar.com/avatar/ee1910239c24d8193dcf32bc6c7e?d=404"
				name="4 0"
			/>
			<AvatarImage
				class="inline size-48"
				src="https://www.gravatar.com/avatar/ee1910239c24d8193dcf32bc6c7e?d=404"
				name="4 8"
			/>
			<AvatarImage
				class="inline size-62"
				src="https://www.gravatar.com/avatar/ee1910239c24d8193dcf32bc6c7e?d=404"
				name="6 2"
			/>
			<AvatarImage
				class="inline size-62"
				src="https://www.gravatar.com/avatar/ee1910239c24d8193dcf32bc6c7e?d=404"
				name="9 6"
			/>
		</div>

		<div class="mt-20px">
			<AvatarImage class="inline size-96" :src="src" :name="name" />
			<input class="block w-full" type="text" v-model="src" />
			<input class="block w-full" type="text" v-model="name" />
		</div>
	</div>
</template>

<script>
import AvatarImage from '../../components/AvatarImage/AvatarImage.vue'

export default {
	components: {
		AvatarImage,
	},
	data() {
		return {
			src: 'http://404',
			name: 'n y',
		}
	},
}
</script>
