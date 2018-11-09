
/**
 * Base layer for selecting days in a calendar
 * Has the behaviour for selecting a single day
 *
 * Can be extended by CalendarPaintingMixin
 * Can be extended by CalendarShiftClickSelectionMixin
 */
export default {
  data () {
    return {
      selectedDays: [],
      selectedYear: null,
      selectedEmployeeIds: [],
    }
  },
  computed: {
    selectedDeleteDays () {
      return this.selectedDays.filter(selectedDay => selectedDay.type === 'delete')
    },
    /**
     * Map of all dateStr only, to check for duplicates
     */
    selectedDateStrs () {
      return this.selectedDays.map(x => x.day.dateStr)
    },
  },
  methods: {
    mapSelectionDays (selectedDay) {
      return selectedDay.day
    },
    getIndexInSelection (dateStr) {
      return this.selectedDays.map(selectedDay => selectedDay.day.dateStr).indexOf(dateStr)
    },
    isDaySelected (dateStr) {
      return this.getIndexInSelection(dateStr) > -1
    },
    resetSelection () {
      this.selectedDays = []
      this.selectedYear = null
      this.selectedEmployeeIds = []

      // If we're using CalendarShiftClickSelectionMixin
      if (this.lastClickedDay) {
        this.lastClickedDay = null
      }
    },
    canDeleteDay (day) {
      // no items to delete
      if (!day.items.length) return false

      // has items, but it's only a company day off
      if (day.items.filter(x => !x.classBools.company).length === 0) return false

      // has items, and they're not exclusively company days off
      return true
    },
    toggleSelectedEmployeeIds (personEmployeeId, selectedPersonIds) {
      let newSelectedEmployeeIds = [].concat(this.selectedEmployeeIds)

      const idIndex = this.selectedEmployeeIds.indexOf(personEmployeeId)
      if (idIndex > -1) {
        newSelectedEmployeeIds.splice(idIndex, 1)
      } else {
        newSelectedEmployeeIds = selectedPersonIds
      }

      return newSelectedEmployeeIds
    },
    /**
     * Add a day to the selected days list
     */
    addDayToSelection (day) {
      if (this.selectedDateStrs.indexOf(day.dateStr) > -1) {
        return // don't add twice
      }
      let selectedDay
      if (this.canDeleteDay(day)) { // 'delete' day type (day has a time slot)
        selectedDay = { type: 'delete', day: day }
      } else { // 'add' day type (no time slots)
        selectedDay = { type: 'add', day: day }
      }
      this.selectedDays.push(selectedDay)
    },

    /**
     * Called in toggleDay, during a click. Should reset when:
     * - selecting a different year (because day off types likely differ)
     * - when selecting multiple people:
     *   - a different day is selected than there is for other people
     *   - more than 1 day is selected
     *
     * @param {{ i: number, dateStr: string, classBools: {}, items: [] }} day clicked day
     * @param {number} personEmployeeId
     */
    resetIfNeeded (day, personEmployeeId) {
      const year = parseInt(day.dateStr.split('-')[0], 10)

      if (this.selectedYear && this.selectedYear !== year) {
        Toast.show({ title: this.$t('CURRENT_SELECTION_RESET') })
        this.resetSelection()
        return
      }

      const selectedPersonIds = Array.from(new Set([ ...this.selectedEmployeeIds, personEmployeeId ]))
      // selecting multiple people
      if (selectedPersonIds.length > 1) {
        // and new day is not selected
        if (!this.isDaySelected(day.dateStr)) {
          this.resetSelection()
          return
        }

        // and selecting more than two days
        if (this.selectedDays.length > 1) {
          this.resetSelection()
          return
        }
      }
    },

    /**
     * A day has been clicked and should be toggled.
     * The click happened without shift-click
     *
     * @param {{ i: number, dateStr: string, classBools: {}, items: [] }} day clicked day
     * @param {number} personEmployeeId
     */
    toggleDay (day, personEmployeeId) {
      this.resetIfNeeded(day, personEmployeeId)

      const year = parseInt(day.dateStr.split('-')[0], 10)
      const isDaySelected = this.isDaySelected(day.dateStr)
      const selectedPersonIds = Array.from(new Set([ ...this.selectedEmployeeIds, personEmployeeId ]))
      const countSelectedPersons = selectedPersonIds.length

      this.selectedYear = year

      if (isDaySelected && countSelectedPersons === 1) { // day is selected: remove it
        const selectedDayIndex = this.getIndexInSelection(day.dateStr)
        this.selectedDays.splice(selectedDayIndex, 1)

        // also reset selectedEmployeeIds if last day is removed
        if (!this.selectedDays.length) {
          this.selectedEmployeeIds = []
        }
        this.setLastClickedDay(null)
      } else if (isDaySelected) { // day is selected, but we have multiple people: remove this day from a person
        // remove selectedEmployee if it already selected, else add to selectedId
        this.selectedEmployeeIds = this.toggleSelectedEmployeeIds(personEmployeeId, selectedPersonIds)
      } else { // day is NOT selected: add it to the selection
        this.addDayToSelection(day)
        this.selectedEmployeeIds = selectedPersonIds
        this.setLastClickedDay(day) // call again because maybe resetIfNeeded was called
      }
    },

    /**
     * Can be overwritten by CalendarShiftClickSelection
     * but it called in toggleDay, so can't be removed
     */
    setLastClickedDay () {
      // nothing
    },

    /**
     * Go to the confirm page.
     * `onSubmitSelection` should be defined in the component using this mixin!
     *
     * @param {'add' | 'delete'} mode
     */
    gotoConfirm (mode) {
      const year = this.selectedYear
      const employee_ids = this.selectedEmployeeIds

      let days = []
      if (mode === 'add') {
        days = this.selectedDays.map(this.mapSelectionDays)
      } else {
        days = this.selectedDeleteDays.map(this.mapSelectionDays)
      }

      this.onSubmitSelection(year, mode, employee_ids, days)
    },
  }
}
