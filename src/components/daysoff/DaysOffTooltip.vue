<template>
<tooltip class="BudgetTooltip">
  <template v-if="this.item.limitation === 'limit_in_half_days'">
    <table>
      <tbody>
        <tr v-if="item.days_approved > 0">
          <th>{{ $t('APPROVED') }}</th>
          <td>{{ $t('X_HALF_DAYS', {amount: floatable(item.days_approved * 2)}) }}</td>
        </tr>
        <tr v-if="item.days_not_approved > 0">
          <th>{{ $t('PENDING') }}</th>
          <td>{{ $t('X_HALF_DAYS', {amount: floatable(item.days_not_approved * 2)}) }}</td>
        </tr>
        <tr>
          <th>{{ $t('LIMIT') }}</th>
          <td>{{ $t('X_HALF_DAYS', {amount: floatable(item.max_yearly_amount_days * 2) }) }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  <template v-else-if="this.item.limitation === 'limit_in_days'">
    <table>
      <tbody>
        <tr v-if="item.days_approved > 0">
          <th>{{ $t('APPROVED') }}</th>
          <td>{{ $t('X_DAYS', {amount: floatable(item.days_approved) }) }}</td>
        </tr>
        <tr v-if="item.days_not_approved > 0">
          <th>{{ $t('PENDING') }}</th>
          <td>{{ $t('X_DAYS', {amount: floatable(item.days_not_approved) }) }}</td>
        </tr>
        <tr>
          <th>{{ $t('LIMIT') }}</th>
          <td>{{ $t('X_DAYS', {amount: floatable(item.max_yearly_amount_days) }) }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  <template v-else>
    <table>
      <tbody>
        <tr v-if="item.minutes_approved > 0">
          <th>{{ $t('APPROVED') }}</th>
          <td>{{item.minutes_approved | enagementToHoursMinutes}}</td>
        </tr>
        <tr v-if="item.minutes_not_approved > 0">
          <th>{{ $t('PENDING') }}</th>
          <td>{{item.minutes_not_approved | enagementToHoursMinutes}}</td>
        </tr>
        <tr>
          <th>{{ $t('LIMIT') }}</th>
          <td v-if="item.limitation === 'unlimited'">{{ $t('UNLIMITED') }}</td>
          <td v-else>{{item.max_yearly_amount_minutes | enagementToHoursMinutes}}</td>
        </tr>
      </tbody>
    </table>
  </template>
</tooltip>
</template>

<script>
import Tooltip from '../Tooltip'
import { floatable } from '../../utils/filters'

export default {
  name: 'DaysOffTooltip',
  components: { Tooltip },
  props: ['item'],
  methods: { floatable: floatable }
}
</script>
