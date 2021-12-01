<template>
	<span class="progress-budget" :class="{ full: isMaxed, dropdown: dropdown }">
	  <days-off-tooltip v-if="!hideTooltip" :item="item"></days-off-tooltip>
	  <span class="bar approved" :style="approvedStyles" v-if="approvedWidth != 0"></span>
	  <span class="bar pending" :style="pendingStyles" v-if="getPending != 0"></span>
	</span>
</template>

<script>
/* eslint-disable vue/return-in-computed-property */
import DaysOffTooltip from './DaysOffTooltip'

export default {
  name: 'BudgetUsage',
  components: { DaysOffTooltip },
  props: ['item', 'dropdown', 'hideTooltip'],
  computed: {
    approvedWidth () {
      return 100 - (this.getApproved + this.getPending)
    },
    approvedStyles () {
      return {
        backgroundColor: `#${this.item.color}`,
        width: this.isMaxed ? 0 : `${this.approvedWidth}%`,
      }
    },
    pendingStyles () {
      return {
        backgroundColor: `#${this.item.color}`,
        left: this.isMaxed ? 0 : `${this.approvedWidth}%`,
        width: `${this.getPending}%`,
      }
    },

    limit () {
      return this.item.limitation
    },

    isMaxed () {
      if (this.limit === 'unlimited') {
        return false
      } else if (this.limit === 'limit_in_days' || this.limit === 'limit_in_half_days') {
        return parseFloat(this.item.max_yearly_amount_days) <= (parseFloat(this.item.days_approved) + parseFloat(this.item.days_not_approved))
      } else if (this.limit === 'limit_in_minutes' || this.limit === 'limit_by_overtime') {
        return parseInt(this.item.max_yearly_amount_minutes) <= (parseInt(this.item.minutes_approved) + parseInt(this.item.minutes_not_approved))
      }
    },
    getApproved () {
      if (this.limit === 'unlimited') {
        return 0
      } else if (this.limit === 'limit_in_days' || this.limit === 'limit_in_half_days') {
        if (!this.item.max_yearly_amount_days) return 0
        return ((parseFloat(this.item.days_approved) / this.item.max_yearly_amount_days) * 100)
      } else if (this.limit === 'limit_in_minutes' || this.limit === 'limit_by_overtime') {
        if (!this.item.max_yearly_amount_minutes) return 0
        return ((this.item.minutes_approved / this.item.max_yearly_amount_minutes) * 100)
      }
    },
    getPending () {
      if (this.limit === 'unlimited') {
        return 0
      } else if (this.limit === 'limit_in_days' || this.limit === 'limit_in_half_days') {
        if (!this.item.max_yearly_amount_days) return 0
        return ((parseFloat(this.item.days_not_approved) / this.item.max_yearly_amount_days) * 100)
      } else if (this.limit === 'limit_in_minutes' || this.limit === 'limit_by_overtime') {
        if (!this.item.max_yearly_amount_minutes) return 0
        return ((this.item.minutes_not_approved / this.item.max_yearly_amount_minutes) * 100)
      }
    }
  }
}
</script>
