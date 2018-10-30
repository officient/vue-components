
import AvatarImage from '../components/AvatarImage/_page.vue'
import Index from './pages/Index.vue'

export default [
    {
        path: '/AvatarImage',
        component: AvatarImage
    },
    {
        path: '/*',
        component: Index
    }
]