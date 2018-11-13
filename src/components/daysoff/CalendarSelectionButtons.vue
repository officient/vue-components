<template lang="html">
  <div class="buttons fixed-bottom" v-if="canShowMenu">
    <div v-if="isBulk">
      <div class="s-75 big button blue" @click="onClickAdd">{{ $t('ADD_DAYS_BULK', {amount: selectedEmployeeIds.length}) }}</div>
      <div class="s-25 big button" @click="onClickCancel">{{ $t('CANCEL') }}</div>
    </div>
    <div v-else>
      <div class="s-50 big button red" v-if="canRemoveDays" @click="onClickDelete">{{ $tc('DELETE_X_DAYS', countRemoveDays, {amount: countRemoveDays}) }}</div>
      <div :class="addButtonClass" @click="onClickAdd">{{ $tc('ADD_X_DAYS', countAddDays, {amount: countAddDays}) }}</div>
      <div class="s-hidden big button" @click="onClickCancel">{{ $t('CANCEL') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedDays: {
      type: Array,
      default: () => []
    },
    selectedDeleteDays: {
      type: Array,
      default: () => []
    },
    selectedEmployeeIds: {
      type: Array,
      default: () => []
    },
  },
  computed: {
    isBulk () {
      return this.selectedEmployeeIds.length > 1
    },
    canShowMenu () {
      return this.selectedDays.length > 0
    },
    countAddDays () {
      return this.selectedDays.length
    },
    countRemoveDays () {
      return this.selectedDeleteDays.length
    },
    canRemoveDays () {
      return this.selectedDeleteDays.length > 0
    },
    addButtonClass(){
      return this.selectedDeleteDays.length ? 's-50 big button blue' : 's-100 big button blue'
    }
  },
  methods: {
    onClickDelete () {
      this.$emit('onClickDelete')
    },
    onClickAdd () {
      this.$emit('onClickAdd')
    },
    onClickCancel () {
      this.$emit('onClickCancel')
    },
  }
}
</script>
