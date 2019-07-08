<template>
  <span class="progress-budget-dropdown-item">
    <div class="title">
      <span class="circle" :style="{ backgroundColor: `#${item.color}` }"/>
      <span class="text ">{{ $t(item.name) }}</span>
      <i class="mdi mdi-chevron-down"/>
    </div>
    <budget-usage :item="item"></budget-usage>
    <days-off-time :item="item"></days-off-time>
  </span>
</template>

<script>
import BudgetUsage from './BudgetUsage'
import DaysOffTime from './DaysOffTime'

export default {
  name: 'BudgetUsageDropdownItem',
  components: { BudgetUsage, DaysOffTime },
  props: ['item']
}
</script>
