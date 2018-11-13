<template>
    <div v-if="selectedDaysCount > 0"
        class="calendar-days__mobile box-shadow-t fixed pin-x pin-b p-20px mb-50px w-full bg-white">
        <h2 v-if="singleSelectedDayInfoDate"
            class="sub-title calendar-tooltip-sub-title leading-14px">{{ singleSelectedDayInfoDate }}</h2>
        <h2 v-else-if="selectedDaysCount > 1"
            class="sub-title calendar-tooltip-sub-title leading-14px mb-0">{{ $t('X_DAYS_SELECTED', {amount: selectedDaysCount}) }}</h2>
        <i class="mdi mdi-close pin-t pin-r absolute cursor-pointer hover:bg-blue-lightest rounded-20px p-10px m-10px"
            @click="$emit('resetSelection')"></i>
        <!-- show one day with a "show more" -->
        <CalendarTooltipContentMobile
            v-if="singleSelectedDayInfo"
            :weekly-schedule="weekly_schedule"
            :dateStr="singleSelectedDayInfo.dateStr"
            :slots="singleSelectedDayInfo.items"
            @onShowMore="dayInfoShowMore = true"
        />
    </div>
</template>

<script>
import moment from 'moment'
import CalendarTooltipContentMobile from 'components/daysoff/CalendarTooltipContentMobile'

export default {
    name: 'CalendarSelectionInfo',
    components: { CalendarTooltipContentMobile },
    props: ['selectedMap'],
    computed: {
        selectedDaysCount () {
            return Object.keys(this.selectedMap).length
        },
        singleSelectedDayInfo () {
            if (this.selectedDaysCount === 1) {
                return Object.values(this.selectedMap)[0]
            }
        },
        singleSelectedDayInfoDate(){
            if (this.singleSelectedDayInfo) {
                return moment(this.singleSelectedDayInfo.dateStr).format('LL')
            }
        }
    }
}
</script>

