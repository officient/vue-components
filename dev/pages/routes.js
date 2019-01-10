import AvatarImage from './AvatarImage/AvatarImage.vue'
import Modal from './Modal/Modal.vue'
import MinutesPicker from './MinutesPicker/MinutesPicker.vue'
import BlurryText from './BlurryText/BlurryText.vue'
import InputSwitch from './InputSwitch/InputSwitch.vue'
import EditBankAccount from './EditBankAccount/EditBankAccount.vue'
import Pagination from './Pagination/Pagination.vue'
import InputDate from './InputDate/InputDate.vue'
import BudgetUsage from './BudgetUsage/BudgetUsage.vue'
import Loading from './Loading/Loading.vue'
import Dropdown from './Dropdown/Dropdown.vue'
import TableInlineSearch from './TableInlineSearch/TableInlineSearch.vue'
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
		path: '/EditBankAccount',
		component: EditBankAccount,
	},
	{
		path: '/Pagination',
		component: Pagination,
	},
	{
		path: '/InputDate',
		component: InputDate
	},
	{
		path: '/BudgetUsage',
		component: BudgetUsage,
	},
	{
		path: '/Loading',
		component: Loading,
	},
	{
		path: '/Dropdown',
		component: Dropdown,
	},
	{
		path: '/TableInlineSearch',
		component: TableInlineSearch,
	},
	{
		path: '/*',
		component: Index,
	},
]
