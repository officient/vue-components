import { mount } from '@vue/test-utils'
import CustomFieldForm from 'components/customfields/CustomFieldForm'
import { globals } from '../../_mocks/mount'
import { sleep } from '../../_mocks/utils'
import CustomFieldFormField from 'components/customfields/CustomFieldFormField'
import * as apiCustomfields from 'api/customFields'

const nonEditableString = {
    "id": 10,
    "name": "nonEditableString",
    "object_type": "employee",
    "type": "string",
    "employee_visibility": "visible"
}
const nonEditableStringValue = { "cf_name": "no", "value": "lol visible", "custom_field_id": 10, "value_name": null, "type": "string" }

const editableMoney = {
    "id": 17,
    "name": "money",
    "object_type": "employee",
    "type": "money",
    "employee_visibility": "visible_and_editable"
}
const editableMoneyValue = { "cf_name": "money", "value": "123", "custom_field_id": 17, "value_name": null, "type": "money" }

const editableSelectOption = {
    "id": 15,
    "name": "select",
    "object_type": "employee",
    "type": "select_option",
    "employee_visibility": "visible_and_editable"
}
const editableSelectOptionValue = { "cf_name": "select", "value": null, "custom_field_id": 15, "value_name": null, "type": "select_option" }

const nonEditableInt = {
    "id": 16,
    "name": "number",
    "object_type": "employee",
    "type": "int",
    "employee_visibility": "visible"
}
const nonEditableIntValue = { "cf_name": "number", "value": null, "custom_field_id": 16, "value_name": null, "type": "int" }

const hiddenInt = {
    "id": 123,
    "name": "number",
    "object_type": "employee",
    "type": "int",
    "employee_visibility": "none"
}
const hiddenIntValue = { "cf_name": "number", "value": null, "custom_field_id": 123, "value_name": null, "type": "int" }


describe('CustomFieldForm.vue', () => {
    let wrapper
    beforeAll(async () => {
        spyOn(apiCustomfields, 'getCustomFields').and.returnValue(Promise.resolve({ body: { data: [nonEditableString, editableMoney, editableSelectOption, nonEditableInt, hiddenInt] } }))
        spyOn(apiCustomfields, 'getCustomFieldOptions').and.returnValue(Promise.resolve({ body: { data: ['1', '2', '3'] } }))

        wrapper = mount(CustomFieldForm, {
            mocks: globals, propsData: {
                valuesCustomFields: [nonEditableStringValue, editableMoneyValue, editableSelectOptionValue, nonEditableIntValue, hiddenIntValue],
                back: '/back'
            }
        })
        spyOn(window, 'go').and.stub()
        window.Toast = { show: jest.fn() }
        await sleep(1)
    })

    it('loads custom fields and options if needed', async () => {
        expect(apiCustomfields.getCustomFields).toBeCalled()
        await sleep(1)
        expect(apiCustomfields.getCustomFieldOptions).toBeCalled() // there is a select-option in the list
    })

    it('should set value to empty string for null select options', () => {
        expect(wrapper.vm.customFields.find(x => x.type === 'select_option').value == '').toBe(true)
    })

    it('can split up fields in editable and non-editable', () => {
        expect(wrapper.text()).toContain('VISIBLE_CUSTOM_FIELDS')
        expect(wrapper.findAll(CustomFieldFormField).length).toBe(5) // all fields rendered
        expect(wrapper.vm.editableFields.map(x => x.id)).toEqual([editableMoney.id, editableSelectOption.id])
        expect(wrapper.vm.nonEditableFields.map(x => x.id)).toEqual([nonEditableString.id, nonEditableInt.id])
    })

    it('save => success', async () => {
        spyOn(apiCustomfields, 'setCustomFieldValue').and.returnValue(Promise.resolve())
        await wrapper.vm.send()
        expect(apiCustomfields.setCustomFieldValue).toBeCalled()
        expect(window.go).toBeCalledWith('/back')
    })
})