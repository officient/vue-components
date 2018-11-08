
import AvatarImage from '../testpages/AvatarImage/AvatarImage.vue'
import Modal from '../testpages/Modal/Modal.vue'
import MinutesPicker from '../testpages/MinutesPicker/MinutesPicker.vue'
import BlurryText from '../testpages/BlurryText/BlurryText.vue'
import InputSwitch from '../testpages/InputSwitch/InputSwitch.vue'
import Index from '../testpages/Index.vue'

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