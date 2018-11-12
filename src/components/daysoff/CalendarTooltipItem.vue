<template>
  <div class="calendar-tooltip-item" :style="itemStyles">
    <span v-if="item.name" class="calendar-tooltip-item-name">{{ $t(item.name) }}</span>
    <span v-else-if="placeholder" class="calendar-tooltip-item-name">{{ $t(placeholder) }}</span>

    <div v-if="item.duration_minutes > 0" class="calendar-tooltip-item-details">
      <span>{{ item.duration_minutes | enagementToHoursMinutes }}</span>
      <span v-if="item.duration_minutes > 0 && item.duration_minutes < 5 * 60">
        <!-- If half a day. Show which part of day -->
        - {{ item | daysOffPartOfDay }}
      </span>
    </div>
  </div>
</template>

<script>
import '../Tooltip/Tooltip.scss'
import { enagementToHoursMinutes, daysOffPartOfDay } from '../../../lib/utils/filters'

export default {
  name: 'CalendarTooltipitem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  filters: { enagementToHoursMinutes, daysOffPartOfDay },
  computed: {
    itemStyles () {
      return {
        borderColor: this.item.color
      }
    }
  }
}
</script>
