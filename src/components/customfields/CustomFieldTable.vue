<template>
<div class="box-wrap" v-if="customFields.length > 0">
  <div class="box-header">
    <div class="title">{{ $t('CUSTOM_FIELDS') }}</div>
    <a class="action edit" :href="editUrl">
      <i class="mdi mdi-pencil"></i>
    </a>
  </div>
  <div class="box">
    <div class="info-group">
      <div class="tbody three columns">
        <div class="tr" v-for="(item, i) in customFields" :key="i">
          <div class="th">{{item.cf_name}}</div>
          <div class="td" v-if="item.value_name || item.value">{{item.value_name || item.value}}</div>
          <div class="td" v-else>-</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'custom-field-table',
  props: ['editUrl', 'customFields']
}
</script>
