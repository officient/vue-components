<template>
  <div>
    <!-- eslint-disable-next-line vue/no-unused-vars -->
    <div class="calendar-day" v-for="i in blankDays">&nbsp;</div>

    <div class="calendar-day" v-for="d in days" :key="d.i" :class="d.classBools" @click="toggleDay(d)">
      <tooltip class="calendar-tooltip">
        <calendar-tooltip-content
          :weekly-schedule="weekly_schedule"
          :dateStr="d.dateStr"
          :slots="d.items"
        />
      </tooltip>
      <div class="content">
        <div class="rows">
          <div v-for="item in d.items" class="row" :style="item.barStyles"></div>
        </div>
        <div class="text">{{d.i}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../scss/Tooltip.scss'
import Tooltip from '../Tooltip/Tooltip'
import CalendarTooltipContent from './CalendarTooltipContent'

export default {
  name: 'calendar-days-mobile',

  props: [ 'blankDays', 'days', 'weekly_schedule' ],

  components: { Tooltip, CalendarTooltipContent },

  methods: {
    toggleDay (d) {
      this.$emit('onToggleDay', d)
    }
  }
}
</script>
