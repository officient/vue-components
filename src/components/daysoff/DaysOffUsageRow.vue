<template>
<div class="tr m-block" @click="$emit('selected')">
  <div class="td collapsing bold budget-section-name">
    <div class="item calendar-color">
      <span class="circle" :style="{ backgroundColor: `#${item.color}` }"></span>
      <a class="text link" v-if="showLink" :href="link">{{ $t(item.name) }}</a>
      <span class="text" v-else>{{ $t(item.name) }}</span>
    </div>
  </div>
  <div class="td budget-section-progress">
    <budget-usage :item="item"></budget-usage>
  </div>
  <div class="td collapsing budget-section-time">
    <days-off-time :item="item"></days-off-time>
  </div>
  <slot name="action" :item="item"></slot>
</div>
</template>

<script>
import BudgetUsage from './BudgetUsage'
import DaysOffTime from './DaysOffTime'

export default {
  name: 'DaysOffUsageRow',
  components: { DaysOffTime, BudgetUsage },
  props: {
    item: Object,
    link: String,
    showLink: {
      type: Boolean,
      default: true
    }
  }
}
</script>
