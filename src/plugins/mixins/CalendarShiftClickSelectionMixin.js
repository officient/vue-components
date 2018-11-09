import { formatDate, forEachDateBetween, isSameMonth } from '../../utils/date'
import groupBy from '../../utils/data/groupBy'

/**
 * Shift-click selection for selecting a group of days
 *
 * Requires CalendarSelectionMixin
 * Requires shiftClick event
 */
export default {
  data () {
    return {
      lastClickedDay: null,
    }
  },
  methods: {
    /**
     * @override
     * @param {{ i: number, dateStr: string, classBools: {}, items: [] }} day clicked day
     */
    setLastClickedDay (day) {
      this.lastClickedDay = day
    },

    canShiftClick (day, personEmployeeId,) {
      const year = parseInt(day.dateStr.split('-')[0], 10)

      if (!this.lastClickedDay || this.selectedDays.length === 0) {
        return false // nothing selected
      }

      if (this.selectedYear && this.selectedYear !== year) {
        Toast.show({ title: this.$t('SELECTION_WARN_YEAR'), color: 'red' })
        return false // different year
      }

      if (!isSameMonth(this.lastClickedDay.dateStr, day.dateStr)) {
        Toast.show({ title: this.$t('SHIFT_SELECTION_WARN_MONTH'), color: 'red' })
        return false // different month
      }

      if (this.selectedEmployeeIds.indexOf(personEmployeeId) === -1 ||
        this.selectedEmployeeIds.length > 1) {
        return false // only 1 person allowed
      }

      return true
    },

    /**
     * Shift-clicking works by remembering the last clicked day and adding "blank" days on top
     * between the last clicked and the currently clicked day
     *
     * @param {{ i: number, dateStr: string, classBools: {}, items: [] }} day clicked day
     * @param {number} personEmployeeId
     * @param {Array<{ i: number, dateStr: string, classBools: {}, items: [] }>} allDays list of days
     */
    shiftToggleDays (day, personEmployeeId, allDays) {
      if (!this.canShiftClick(day, personEmployeeId)) {
        return
      }

      const allDaysMap = groupBy(allDays, 'dateStr')
      forEachDateBetween(this.lastClickedDay.dateStr, day.dateStr, (day) => {
        const dateStr = formatDate(day)
        const foundDayOrEmptyDay = allDaysMap[dateStr][0] || { dateStr: dateStr, items: [] }
        this.addDayToSelection(foundDayOrEmptyDay)
      })
    },
  }
}
