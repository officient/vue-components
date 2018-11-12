<template>
	<span>
		<days-off-tooltip :item="item"></days-off-tooltip>

		<span class="text" v-if="item.limitation === 'unlimited'">
		  <template v-if="getMinutesUsed > 0">{{ $t('X_DAYS_USED', {amount: floatable(getDaysUsed)}) }}</template>
		  <template v-else>{{ $t('UNLIMITED') }}</template>
		</span>
		<span class="text" v-else-if="item.limitation === 'limit_in_days'">
		  <span v-if="getDaysLeft >= 0">{{ $t('X_DAYS_LEFT', {amount: floatable(getDaysLeft) }) }}</span>
		  <span class="text-red" v-else>{{ $t('X_DAYS_OVER_LIMIT', {amount: floatable(-getDaysLeft) }) }}</span>
		</span>
		<span class="text" v-else-if="item.limitation === 'limit_in_half_days'">
		  <span v-if="getDaysLeft >= 0">{{ $t('X_HALF_DAYS_LEFT', {amount: floatable(getDaysLeft * 2) }) }}</span>
		  <span class="text-red" v-else>{{ $t('X_HALF_DAYS_OVER_LIMIT', {amount: floatable(-getDaysLeft * 2) }) }}</span>
		</span>
		<span class="text" v-else-if="item.limitation === 'limit_in_minutes' || item.limitation === 'limit_by_overtime'">
		  <span v-if="getMinutesLeft >= 0">{{ $t('X_LEFT', {amount: minutesToHoursMinutes(getMinutesLeft) }) }}</span>
		  <span class="text-red" v-else>{{ $t('X_OVER_LIMIT', {amount: minutesToHoursMinutes(-getMinutesLeft) }) }}</span>
		</span>
	</span>
</template>

<script>
import DaysOffTooltip from './DaysOffTooltip'
import { floatable, minutesToHoursMinutes } from '../../utils/filters'

export default {
  name: 'DaysOffTime',
  props: ['item'],
  components: { DaysOffTooltip },
  computed: {
    getDaysUsed () {
      return (parseFloat(this.item.days_approved) + parseFloat(this.item.days_not_approved))
    },
    getDaysLeft () {
      const used = this.getDaysUsed
      const total = this.item.max_yearly_amount_days
      return total - used
    },
    getMinutesUsed () {
      return (parseInt(this.item.minutes_approved) + parseInt(this.item.minutes_not_approved))
    },
    getMinutesLeft () {
      const used = this.getMinutesUsed
      const total = this.item.max_yearly_amount_minutes
      return total - used
    }
  },
  methods: { floatable: floatable, minutesToHoursMinutes: minutesToHoursMinutes }
}
</script>
