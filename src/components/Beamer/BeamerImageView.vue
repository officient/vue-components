<template>
    <div class="beamer-image-view" @click="closeClicked">
        <img :src="imgUrl" class="rounded" />
    </div>
</template>

<script>
export default {
    props: ['imgUrl'],
    methods:{
        closeClicked(){
            this.$emit('closeClicked')
        }
    }
}
</script>
