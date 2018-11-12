<template lang="html">
  <div>
    <div v-for="(item, i) in limitedList" :key="i" class="box-day box-day__coworker">
      <span><b>{{ item.name.split(' ')[0] }}</b>: {{ item.duration_minutes | enagementToHoursMinutes }}</span>
    </div>

    <div v-if="moreList.length > 0" class="box-day box-day__more">
      <tooltip class="calendar-tooltip">
        <div v-if="moreList.length > 0" class="calendar-tooltip-row">
          <div class="calendar-tooltip-title">{{ $t('COWORKERS') }}</div>
          <div class="calendar-tooltip-content">
            <div v-for="item in moreList" class="calendar-tooltip-item">
              <span class="calendar-tooltip-item-name">{{ item.name.split(' ')[0] }}</span>: {{ item.duration_minutes | enagementToHoursMinutes }}
            </div>
          </div>
        </div>
      </tooltip>
      <span>{{ $t('PLUS_MORE', moreList.length) }}  </span>
    </div>
  </div>
</template>

<script>
import '../../scss/Tooltip.scss'
import Tooltip from '../Tooltip'
import CalendarTooltipItem from './CalendarTooltipItem'

export default {
  name: 'CalendarCoworkersContent',
  components: { Tooltip, CalendarTooltipItem },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    limitedList () {
      return this.list.slice(0, 2)
    },
    moreList () {
      return this.list.slice(2)
    }
  }
}
</script>
