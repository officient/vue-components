
import AvatarImage from '../pages/AvatarImage/AvatarImage.vue'
import Modal from '../pages/Modal/Modal.vue'
import MinutesPicker from '../pages/MinutesPicker/MinutesPicker.vue'
import BlurryText from '../pages/BlurryText/BlurryText.vue'
import InputSwitch from '../pages/InputSwitch/InputSwitch.vue'
import Index from '../pages/Index.vue'

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