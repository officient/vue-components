<template>
    <span v-if="status == 'none'" class="status-tag yellow">{{ $t('ESS_VISIBILITY_NONE') }}</span>
    <span v-else-if="status == 'visible'" class="status-tag green">{{ $t('ESS_VISIBILITY_VISIBLE') }}</span>
    <span v-else-if="status == 'visible_and_editable'" class="status-tag green">{{ $t('ESS_VISIBILITY_VISIBLE_AND_EDITABLE') }}</span>
</template>

<script>
export default {
    props: {
        status: { type: String },
    },
}
</script>

