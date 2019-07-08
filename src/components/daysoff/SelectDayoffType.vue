<template>
  <div class="calendar-dayofftypes budget-section budget-section--dropdown">
    <dropdown class="full select-dayoff-type" ref="dropdown" :menu-class="menuClass">
      <template slot="target" class="px-5px">
        <div class="item calendar-color overflow-auto" v-if="value">
          <budget-usage-dropdown-item :item="value"/>
        </div>
        <span v-else>
          <div class="item calendar-color">
            <span class="text grey select-day-off-type--large-screen">{{ text }}</span>
            <span v-if="textMobile" class="text grey select-day-off-type--small-screen">{{ textMobile }}</span>
            <span v-else class="text grey select-day-off-type--small-screen">{{ text }}</span>
            <i class="mdi mdi-chevron-down"/>
          </div>
        </span>
      </template>
      <template slot="menu">
        <div v-if="showHeaders" class="item select-dayoff-header disabled">{{ $t('TIME_OFF') }}</div>
        <div class="tbody table list boxxed">
          <days-off-usage-row v-for="(item, i) in timeOffList" :key="i" :item="item" @selected="selectItem(item)" :showLink="false"/>
        </div>
        <div v-if="showHeaders" class="item select-dayoff-header disabled">{{ $t('ACTIVITY') }}</div>
        <div class="tbody table list boxxed">
          <days-off-usage-row v-for="(item, i) in activityList" :key="i" :item="item" @selected="selectItem(item)" :showLink="false"/>
        </div>
      </template>
    </dropdown>
  </div>
</template>

<script>
import { listBudgetUsage } from 'api/requests'
import Dropdown from '../Dropdown/Dropdown'
import profile from 'utils/profile'
import BudgetUsageDropdownItem from './BudgetUsageDropdownItem'
import DaysOffUsageRow from './DaysOffUsageRow'
import { sickdayType, educationType } from '../../utils/dayoffTypes'
import '../../scss/Calendar.scss'
import '../../scss/budgetsection.scss'

export default {
  name: 'SelectDayoffType',
  components: { Dropdown, BudgetUsageDropdownItem, DaysOffUsageRow },
  props: {
    year: Number,
    value: Object,
    menuClass: String,
    person: Object,
    text: {
      type: String,
      required: true
    },
    textMobile: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      budgetTypes: []
    }
  },
  computed: {
    timeOffList () {
      return this.budgetTypes.filter(x => x.interpretation === 'time_off')
    },
    activityList () {
      return this.budgetTypes.filter(x => x.interpretation === 'activity')
    },
    showHeaders () {
      // show headers if both time_off and activity available
      return this.timeOffList.length && this.activityList.length
    },
  },
  watch: {
    year () {
      this.getData()
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      listBudgetUsage({ year: this.year }).then(res => {
        this.budgetTypes = res.body.budgets.custom_types
        profile.getProfile().then(res => {
          if (!res.disable_days_off_education_type) {
            this.budgetTypes.push(educationType)
          }
        })
        this.budgetTypes.push(sickdayType)
        const { value, budgetTypes } = this
        if (value) { // on refresh, find same budget
          for (const i of budgetTypes) {
            if (i.type === value.type && i.type_id === value.type_id) {
              this.$emit('input', i)
              return
            }
          }
        }
      })
    },
    selectItem (item) {
      this.$emit('input', item)
    },
    showList () {
      this.$refs.dropdown.showList()
    }
  }
}
</script>