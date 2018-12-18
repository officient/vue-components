<template>
  <div>
    <div v-if="emptyDay" class="calendar-tooltip-row">
      <div class="calendar-tooltip-content">{{ $t('ZERO_SCHEDULE_DAY') }}</div>
    </div>

    <div class="calendar-tooltip-row" v-if="workTime > 0 && companyDaysoffSlots.length === 0">
      <div class="calendar-tooltip-title">{{ $t('WORKING_TIME') }}</div>
      <div class="calendar-tooltip-content">{{  workTime | minutesToHoursMinutes }}</div>
    </div>

    <div v-if="companyDaysoffSlots.length > 0" class="calendar-tooltip-row">
      <div class="calendar-tooltip-title">{{ $t('COMPANY_DAY_OFF') }}</div>
      <div class="calendar-tooltip-content">
        <calendar-tooltip-item v-for="item in companyDaysoffSlots" :key="item.id" :item="item" placeholder="ALL_DAY" />
      </div>
    </div>

    <div v-if="daysOffSlots.length > 0" class="calendar-tooltip-row">
      <div class="calendar-tooltip-title">{{ $t('DAYS_OFF') }}</div>
      <div class="calendar-tooltip-content">
        <calendar-tooltip-item v-for="item in daysOffSlots" :key="item.id" :item="item" />
      </div>
    </div>

    <div v-if="activitySlots.length > 0" class="calendar-tooltip-row">
      <div class="calendar-tooltip-title">{{ $t('OVERTIME') }}</div>
      <div class="calendar-tooltip-content">
        <calendar-tooltip-item v-for="item in activitySlots" :key="item.id" :item="item" />
      </div>
    </div>

    <div v-if="pendingDaysOffSlots.length > 0" class="calendar-tooltip-row">
      <div class="calendar-tooltip-title">{{ $t('DAYS_OFF_PENDING_APPROVAL') }}</div>
      <div class="calendar-tooltip-content">
        <calendar-tooltip-item v-for="item in pendingDaysOffSlots" :key="item.id" :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import '../../scss/Tooltip.scss'
import CalendarTooltipItem from './CalendarTooltipItem'
import { minutesToHoursMinutes } from '../../utils/filters'

export default {
  name: 'CalendarTooltipContent',
  components: { CalendarTooltipItem },
  filters: { minutesToHoursMinutes },
  props: {
    dateStr: String,
    weeklySchedule: {
      type: Object,
      default: () => ({})
    },
    slots: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    plannedHours () {
      const { weeklySchedule, dateStr } = this
      if (weeklySchedule && dateStr) {
        return weeklySchedule[dateStr] || 0
      }
      return 0
    },
    companyDaysoffSlots () {
      return this.slots.filter(x => x.classBools.company)
    },
    pendingDaysOffSlots () {
      return this.slots.filter(x => x.classBools.pending)
    },
    activitySlots () {
      const { slots, pendingDaysOffSlots } = this
      return slots.filter(x => {
        if (pendingDaysOffSlots.indexOf(x) > -1) return false
        if (x.interpretation === 'activity') return true
      })
    },
    daysOffSlots () {
      const { slots, activitySlots, companyDaysoffSlots, pendingDaysOffSlots } = this
      return slots.filter(x => {
        if (activitySlots.indexOf(x) > -1) return false
        if (companyDaysoffSlots.indexOf(x) > -1) return false
        if (pendingDaysOffSlots.indexOf(x) > -1) return false
        return true
      })
    },
    workTime () {
      const timeOffTotal = this.daysOffSlots.reduce((timeOffMinutes, slot) => timeOffMinutes + slot.duration_minutes, 0)
      const workTimeSchedule = this.weeklySchedule[this.dateStr] || 0
      const workTime = workTimeSchedule - timeOffTotal
      return Math.max(0, workTime)
    },
    emptyDay () {
      return this.slots.length === 0 && !this.plannedHours
    },
    showPlannedHours () {
      return this.plannedHours &&
        this.slots.length === 0
    }
  }
}
</script>
