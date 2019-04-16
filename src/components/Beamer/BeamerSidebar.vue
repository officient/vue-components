<template>
    <div class="beamer">
        <BeamerImageView 
            v-if="showImageView" 
            :imgUrl="imageViewUrl"
            @closeClicked="showImageView = false"
        />
        <div class="beamer-overlay" @click="closeClicked"></div>
        <div class="beamer-aside">
            <div class="beamer-header">
                <span>{{ $t('WHATS_NEW_IN_OFFICIENT') }}</span>
                <i class="mdi mdi-close" @click="closeClicked"></i>
            </div>
            <div class="beamer-body" ref="beamerBody">
                <loading v-if="!initialLoad" class="absolute-center"/>
                <BeamerMessage 
                    v-for="message of posts" 
                    :key="message.id"
                    :message="message"
                    @requestClose="closeClicked"
                    @imgClicked="imgClicked"
                />
                <loading v-if="loadingNext" class="w-full h-30px mb-15px"/>
            </div>
        </div>
    </div>
</template>

<script>
import { getBeamerPosts } from 'api/beamer'
import profile from 'utils/profile'
import BeamerMessage from './BeamerMessage'
import BeamerImageView from './BeamerImageView'
import { freezeBackground, unfreezeBackground } from 'utils/modals'

export default {
    components: { BeamerMessage, BeamerImageView },
    data(){
        return{
            posts: [],
            lastScrollPosition: 0,
            page: -1,
            language: 'en',
            userId: -1,
            initialLoad: false,
            loadingNext: false,
            allLoaded: false,
            imageViewUrl: '',
            showImageView: false
        }
    },
    mounted(){
        this.$refs.beamerBody.addEventListener('scroll', this.scrollHandler)
    },
    async created(){
        document.addEventListener('keydown', this.escapeHandler)
        freezeBackground()

        const profileRes = await profile.getProfile()
        this.language = profileRes.user.language || 'en'
        this.userId = profileRes.user.user_id

        await this.addPosts()
        this.initialLoad = true
    },
    beforeDestroy () {
        document.removeEventListener('keydown', this.escapeHandler)
        this.$refs.beamerBody.removeEventListener('scroll', this.scrollHandler)
        unfreezeBackground()
    },
    methods:{
        translationsToObject(posts, language){
            for(let post of posts){

                let translation
                let fallbackTranslation

                for(let tl of post.translations){
                    if(tl.language.toLowerCase() == language.toLowerCase()){
                        translation = tl
                    }
                    if(tl.language.toLowerCase() == 'en'){
                        fallbackTranslation = tl
                    }
                }

                post.translation = fallbackTranslation
                if(translation){
                    post.translation = translation
                }
                // other translations are not needed
                delete post.translations
            }
            return posts
        },
        async addPosts(){
            this.page++
            const beamerPostsRes = await getBeamerPosts({user_id: this.userId, page: this.page})
            this.posts = this.posts.concat(this.translationsToObject(beamerPostsRes.body, this.language))
            if(beamerPostsRes.body.length == 0){
                // everything is loaded
                this.allLoaded = true
            }
        },
        async scrollHandler(){
            // used for scroll pagination
            const clientHeight = this.$refs.beamerBody.clientHeight
            const scrollTop = this.$refs.beamerBody.scrollTop
            const scrollHeight = this.$refs.beamerBody.scrollHeight

            if(scrollHeight - clientHeight < scrollTop + 100){
                // 100px to scroll left
                // load the next posts
                if(this.loadingNext || this.allLoaded){
                    return
                }
                this.loadingNext = true
                await this.addPosts()
                this.loadingNext = false
            }
            
        },
        escapeHandler(e){
            if (e.key === 'Escape') {
                this.closeClicked()
            }
        },
        imgClicked(url){
            this.imageViewUrl = url
            this.showImageView = true
        },
        closeClicked(){
            this.$emit('closeClicked')
        }
    }
}
</script>