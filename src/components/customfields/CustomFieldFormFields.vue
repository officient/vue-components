<template>
    <div v-if="fields.length > 0">
        <div v-if="isLabelVisible"
            class="form-field-title">{{ label }}</div>

        <div class="fields">
            <CustomFieldFormField
                v-for="cf in fields"
                :key="cf.id"
                :id="cf.id"
                :value="cf.value"
                @input="onChange(cf, $event)"
                :name="cf.name"
                :type="cf.type"
                :options="cf.options"
                :employee_visibility="cf.employee_visibility"
            />
        </div>
    </div>
</template>

<script>
import CustomFieldFormField from 'components/customfields/CustomFieldFormField'

export default {
    props: {
        label: String,
        fields: { type: Array, default: () => [] },
    },
    components: {
        CustomFieldFormField,
    },
    computed: {
        isLabelVisible () {
            for (const i of this.fields) {
                return i.object_type === 'employee'
            }
        },
    },
    methods: {
        onChange (cf, newValue) {
            this.$emit('onChange', cf, newValue)
        },
    }
}
</script>