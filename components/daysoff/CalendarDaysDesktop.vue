<template>
  <div>
    <!-- eslint-disable-next-line vue/no-unused-vars -->
    <div class="calendar-day calendar-day-blank" v-for="i in blankDays">&nbsp;</div>

    <calendar-desktop-day
      v-for="day in days"
      :key="day.i + blankDays"
      :day="day"
      :weekly_schedule="weekly_schedule"
      :coworkers_days_off="coworkers_days_off"
      :loaded="loaded"
      @click.native="toggleDay(day)"
    />

    <div class="clearfix"></div>
  </div>
</template>

<script>
import '../Tooltip/Tooltip.scss'
import CalendarDesktopDay from './CalendarDesktopDay'

export default {
  name: 'calendar-days-desktop',

  props: [ 'blankDays', 'days', 'weekly_schedule', 'coworkers_days_off', 'loaded' ],

  components: { CalendarDesktopDay },

  methods: {
    toggleDay (d) {
      this.$emit('onToggleDay', d)
    }
  }
}
</script>
