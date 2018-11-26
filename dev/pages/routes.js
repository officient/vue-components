import AvatarImage from './AvatarImage/AvatarImage.vue'
import Modal from './Modal/Modal.vue'
import MinutesPicker from './MinutesPicker/MinutesPicker.vue'
import BlurryText from './BlurryText/BlurryText.vue'
import InputSwitch from './InputSwitch/InputSwitch.vue'
import Loading from './Loading/Loading.vue'
import Index from './Index.vue'

export default [
	{
		path: '/AvatarImage',
		component: AvatarImage,
	},
	{
		path: '/Modal',
		component: Modal,
	},
	{
		path: '/MinutesPicker',
		component: MinutesPicker,
	},
	{
		path: '/BlurryText',
		component: BlurryText,
	},
	{
		path: '/InputSwitch',
		component: InputSwitch,
	},
	{
		path: '/Loading',
		component: Loading,
	},
	{
		path: '/*',
		component: Index,
	},
]
