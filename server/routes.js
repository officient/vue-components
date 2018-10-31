
import AvatarImage from '../components/AvatarImage/_page.vue'
import Modal from '../components/Modal/_page.vue'
import MinutesPicker from '../components/MinutesPicker/_page.vue'
import BlurryText from '../components/BlurryText/_page.vue'
import InputSwitch from '../components/InputSwitch/_page.vue'
import Index from './pages/Index.vue'

export default [
    {
        path: '/AvatarImage',
        component: AvatarImage
    },
    {
        path: '/Modal',
        component: Modal
    },
    {
        path: '/MinutesPicker',
        component: MinutesPicker
    },
    {
        path: '/BlurryText',
        component: BlurryText
    },
    {
        path: '/InputSwitch',
        component: InputSwitch
    },
    {
        path: '/*',
        component: Index
    }
]