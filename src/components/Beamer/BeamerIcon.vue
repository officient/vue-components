<template>
    <a @click="openBeamer" class="header-item icon m-hide" hide-readonly="hide-readonly" v-if="!minimal">
      <i class="mdi mdi-gift-outline mdi-header"></i>
      <div class="header badge" v-show="beamerPending > 0">{{ beamerPending }}</div>
    </a>
</template>

<script>
import profile from 'utils/profile'
import { getBeamerUnreadCount } from 'api/beamer'

export default {
    props: [ 'minimal' ], // minimal = header in /developer page
    data(){
        return{
            beamerPending: 0,
        }
    },
    async mounted(){
        const profileRes = await profile.getProfile()
        const beamerRes = await getBeamerUnreadCount({user_id: profileRes.user.user_id})
        this.beamerPending = beamerRes.body.count
    },
    methods:{
        openBeamer () {
            this.$emit('openBeamer')
            this.beamerPending = 0
        },
    }
}
</script>
