<template>
    <div class="field relative"
        :class="{ disabled: isDisabled }">
        <label :for="`cf_${id}`">{{name}}</label>
        <div class="input" :class="{ labelled: type === 'money' }">
            <i class="mdi mdi-currency-eur" v-if="type === 'money'"></i>
            <div class="select" v-if="type === 'select_option'">
                <select :id="`cf_${id}`" :value="value" @input="$emit('input', $event.target.value)" :disabled="isDisabled">
                    <option disabled="disabled" value="">{{ $t('SELECT_OPTION') }}</option>
                    <option v-for="item in options" :key="item.id" :value="item.id">{{item.option_name}}</option>
                </select>
            </div>
            <input-date v-else-if="type === 'date'" placeholder="dd/mm/yyyy" :value="value" @input="$emit('input', $event)" :disabled="isDisabled"></input-date>
            <input v-else-if="type === 'email'" :id="`cf_${id}`" type="email" :placeholder="$t('PLEASE_ENTER_EMAIL')" :value="value" @input="$emit('input', $event.target.value)" :disabled="isDisabled" />
            <input v-else-if="type === 'int'" :id="`cf_${id}`" type="number" :placeholder="$t('PLEASE_ENTER_NUMBER')" :value="value" @input="$emit('input', $event.target.value)" :disabled="isDisabled" />
            <input v-else-if="type === 'money'" :id="`cf_${id}`" type="number" :placeholder="$t('PLEASE_ENTER_NUMBER')" :value="value" @input="$emit('input', $event.target.value)" :disabled="isDisabled" />
            <input v-else :id="`cf_${id}`" type="text" placeholder="" :value="value" @input="$emit('input', $event.target.value)" :disabled="isDisabled" />
        </div>
    </div>
</template>

<script>
import InputDate from 'components/InputDate'

export default {
    props: {
        id: [ String, Number ],
        name: String,
        type: String,
        value: [ String, Number ], 
        employee_visibility: String,
        options: {type: Array, default: () => [] },
    },
    components: {
        InputDate,
    },
    computed: {
        isDisabled () {
            return this.employee_visibility !== 'visible_and_editable'
        },
    }
}
</script>
