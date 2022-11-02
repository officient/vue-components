
export default async function transformCustomFieldFormData(getCustomFields, getCustomFieldOptions, valuesCustomFields) {
    const res = await getCustomFields()
    const allCustomFields = res.body.data
    const customFields = []

    for (const customFieldWithValue of valuesCustomFields) {
        const y = getCustomFieldById(allCustomFields, customFieldWithValue.custom_field_id)

        // no selection needs to be empty string instead of null, otherwise will select first value!
        if (customFieldWithValue.type === 'select_option' && customFieldWithValue.value == null) {
            customFieldWithValue.value = ''
        }

        customFields.push({
            id: customFieldWithValue.custom_field_id,
            name: customFieldWithValue.cf_name,
            value: customFieldWithValue.value,
            value_name: customFieldWithValue.value_name,
            object_type: y.object_type,
            employee_visibility: y.employee_visibility,
            type: y.type,
            options: await populateOptionsIfNeeded(getCustomFieldOptions, customFieldWithValue.type, customFieldWithValue.custom_field_id)
        })
    }

    return customFields
}

function getCustomFieldById(allCustomFields, id) {
    for (var i = 0; i < allCustomFields.length; i++) {
        if (allCustomFields[i].id === id) {
            return allCustomFields[i]
        }
    }
}

async function populateOptionsIfNeeded(getCustomFieldOptions, type, id) {
    if (type != 'select_option') {
        return []
    }
    const res = await getCustomFieldOptions({ id })
    return res.body.data
}