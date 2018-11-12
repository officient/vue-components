<template lang="html">
  <div class="calendar-day" :class="day.classBools">
    <transition name="fade">
    <div v-if="loaded" class="content">
      <tooltip class="calendar-tooltip" md-direction="top">
        <calendar-tooltip-content
          :weekly-schedule="weekly_schedule"
          :dateStr="day.dateStr"
          :slots="day.items"
        />
      </tooltip>

      <div v-if="showNotWorkingToday" class="box-day box-day__notWorking">
        <span>{{ $t('ZERO_SCHEDULE_DAY') }}</span>
      </div>

      <div v-for="(item, i) in day.items" :key="`personal_${day.dateStr}_${i}`">
        <div class="box-day" :class="item.classBools" :style="{ backgroundColor: item.color }">
          <span v-if="item.name">{{ $t(item.name) }}</span>
          <span v-else-if="item.classBools.company">{{ $t('COMPANY_DAY_OFF') }}</span>
        </div>
      </div>

      <calendar-coworkers-content
        :list="coworkers_days_off[day.dateStr]"
      />
    </div>
    </transition>
    <div class="calendar-day-number">
      <div class="calendar-day-number-inner">
        {{day.i}}
      </div>
    </div>
  </div>
</template>

<script>
import '../../scss/Tooltip.scss'
import Tooltip from '../Tooltip/Tooltip'
import CalendarTooltipContent from './CalendarTooltipContent'
import CalendarCoworkersContent from './CalendarCoworkersContent'

export default {
  name: 'CalendarDesktopDay',
  components: { Tooltip, CalendarTooltipContent, CalendarCoworkersContent },
  props: {
    day: Object,
    weekly_schedule: {
      type: Object,
      default: () => ({}),
    },
    coworkers_days_off: {
      type: Object,
      default: () => ({}),
    },
    loaded: Boolean,
  },
  computed: {
    showNotWorkingToday () {
      if (this.day.items.length === 0) {
        if (this.weekly_schedule[this.day.dateStr] === 0) {
          return true
        }
      }
      return false
    },
  }
}
</script>
