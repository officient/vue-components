<template>
    <div class="beamer-message">
        <h2 v-if="message.translation.linkUrl" class="text-18px text-grey-80 font-medium mb-10px">
            <a
                @click="linkClicked"
                :href="message.translation.linkUrl" 
                :target="!isOfficientLink ? '_blank' : ''" 
                class="link"
            >
                {{message.translation.title}}
            </a>
        </h2>
        <h2 v-else class="text-18px text-grey-80 font-medium mb-10px">{{message.translation.title}}</h2>

        <span class="category" :class="message.category.toLowerCase()">{{ message.category }}</span>
        <span class="feature-date">{{ message.date | dateFormat('LL') }}</span>
        <div class="message-text">
            <!-- makes sure text is correctly split up in paragraphs -->
            <p v-for="(paragraph, i) of message.translation.content.split('\n')" :key="i">
                <!-- makes sure *bold text* is bold -->
                <span v-for="(part, i) of paragraph.split('*')" :key="`part_${i}`" :class="{'font-bold': i%2!=0}">
                    {{part}}
                </span>
            </p>
        </div>
        <div v-if="message.translation.images" class="text-center">
            <figure 
                class="beamer-figure max-w-full cursor-pointer rounded-4px"
                v-for="img of message.translation.images" 
                :key="img"
                @click="imgClicked(img)"
            >
                <img 
                    :src="img"
                    class="beamer-image max-w-full block rounded-4px"
                />
            </figure>
        </div>
        <div v-if="message.translation.linkUrl" class="message-footer">
            <a 
                @click="linkClicked"
                :href="message.translation.linkUrl" 
                :target="!isOfficientLink ? '_blank' : ''" 
                class="link"
            >
                <span>{{ message.translation.linkText || message.translation.linkUrl }}</span><!--
             --><span class="valign-middle ml-5px"><i class="mdi mdi-angle-right bold valign-middle"></i></span>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['message'],
    data(){
        return{
            isOfficientLink: false
        }
    },
    mounted(){
        if(this.message.translation.linkUrl){
            this.isOfficientLink = this.message.translation.linkUrl.charAt(0) == '/'
        }
    },
    methods:{
        linkClicked(){
            if(this.isOfficientLink){
                this.$emit('requestClose')
            }
        },
        imgClicked(url){
            this.$emit('imgClicked', url)
        }
    }
}
</script>
