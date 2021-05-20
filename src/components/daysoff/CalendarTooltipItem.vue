<template>
  <div class="calendar-tooltip-item" :style="itemStyles">
    <span v-if="item.name" class="calendar-tooltip-item-name">{{ $t(item.name) }}</span>
    <span v-else-if="placeholder" class="calendar-tooltip-item-name">{{ $t(placeholder) }}</span>

    <div v-for="item in contract_items" :key="item">
      <div v-if="item.duration_minutes > 0" class="calendar-tooltip-item-details">
        <span>{{ item.duration_minutes | enagementToHoursMinutes }}</span>
        <span v-if="item.contract_name">
          - {{ item.contract_name }}
        </span>
        <span v-else-if="item.duration_minutes > 0 && item.duration_minutes < 5 * 60">
          <!-- If half a day. Show which part of day -->
          - {{ item | daysOffPartOfDay }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { enagementToHoursMinutes, daysOffPartOfDay } from '../../utils/filters'

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
    },
    contract_items () {

      if(!this.item.metadata_json) {
       return [this.item]
      }

      const metadata = JSON.parse(this.item.metadata_json)
      const enriched_items = []
      for (const [index, [contract_uid, duration]] of Object.entries(Object.entries(metadata))) {
        const item = { ...this.item }
        const contract_number = parseInt(index) + 1
        item.contract_name = `${this.$t('CONTRACT')} ${contract_number}`
        item.duration_minutes = duration
        enriched_items.push(item)
      }
      
      return enriched_items

    }
  }
}
</script>
