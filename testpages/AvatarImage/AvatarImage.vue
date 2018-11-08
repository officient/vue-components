<template>
    <div>
        <div class="mt-20px">
            <AvatarImage
                class="inline size-96"
                src="https://www.gravatar.com/avatar/ee1910239c24d8193dcf32bc6c502d7e?d=404"
                name="Ilias Ismanalijev"
            />
        </div>
        <div class="mt-20px">
            <AvatarImage
                class="inline size-96"
                src="https://www.gravatar.com/avatar/ee1910239c24d8193dcf32bc6c7e?d=404"
                name="Willem Delbare"
            />
        </div>

        <div class="mt-20px">
            <AvatarImage
                class="inline size-96"
                :src="src"
                :name="name"
            />
            <input class="block w-full" type="text" v-model="src">
            <input class="block w-full" type="text" v-model="name">
        </div>
    </div>
</template>

<script>
import AvatarImage from '../../components/AvatarImage/AvatarImage.vue'

export default {
    components: {
        AvatarImage,
    },
    data () {
        return {
            src: 'http://404',
            name: 'n y',
        }
    },
    methods: {
        init () {
            
        },
    },
}
</script>