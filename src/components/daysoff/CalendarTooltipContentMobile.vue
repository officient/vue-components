<template>
  <div>
    <CalendarTooltipContent
      :weekly-schedule="weeklySchedule"
      :dateStr="dateStr"
      :slots="visibleSlots"
    />

    <div v-if="slots.length > 1" class="inline-block mt-10px font-bold cursor-pointer touch-area hover:bg-blue-lightest rounded-20px p-5px">
      <span v-if="showMore" @click="showMore = false">{{ $t('SHOW_LESS') }}</span>
      <span v-else @click="showMore = true">{{ $t('PLUS_MORE', [ nonVisibleSlots.length ]) }} <i class="mdi mdi-chevron-down"/></span>
    </div>
  </div>
</template>

<script>
import CalendarTooltipItem from 'officient-vue-components/lib/components/daysoff/CalendarTooltipItem'
import CalendarTooltipContent from 'officient-vue-components/lib/components/daysoff/CalendarTooltipContent'

export default {
  name: 'CalendarTooltipContentMobile',
  components: { CalendarTooltipItem, CalendarTooltipContent },
  props: {
    dateStr: String,
    weeklySchedule: {
      type: Object,
      default: () => ({}),
    },
    slots: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    visibleSlots () {
      if (this.showMore) {
        return this.slots
      }
      return this.slots.slice(0, 1)
    },
    nonVisibleSlots () {
      if (this.showMore) {
        return []
      }
      return this.slots.slice(1)
    },
  },
  data(){
    return {
      showMore: false
    }
  },
}
</script>
