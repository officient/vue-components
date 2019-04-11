<template>
    <div class="field"
        :class="{ disabled: employee_visibility === 'visible' }">
        <label :for="`cf_${id}`">{{name}}</label>
        <div class="input" :class="{ labelled: type === 'money' }">
            <i class="mdi mdi-currency-eur" v-if="type === 'money'"></i>
            <div class="select" v-if="type === 'select_option'">
            <select :id="`cf_${id}`" :value="value" @input="$emit('input', $event.target.value)">
                <option disabled="disabled" value="">{{ $t('SELECT_OPTION') }}</option>
                <option v-for="item in options" :key="item.id" :value="item.id">{{item.option_name}}</option>
            </select>
            </div>
            <input-date v-else-if="type === 'date'" placeholder="dd/mm/yyyy" :value="value" @input="$emit('input', $event)"></input-date>
            <input v-else-if="type === 'email'" :id="`cf_${id}`" type="email" :placeholder="name" :value="value" @input="$emit('input', $event.target.value)" />
            <input v-else :id="`cf_${id}`" type="text" :placeholder="name" :value="value" @input="$emit('input', $event.target.value)" /> </div>

            <div v-if="errorText" class="text-red mt-10px text-12px leading-normal">{{ errorText }}</div>
        </div>
</template>

<script>
import InputDate from 'components/InputDate'

export default {
    props: {
        id: [ String, Number ],
        name: String,
        errorText: String,
        type: String,
        value: [ String, Number ], 
        employee_visibility: String,
        options: {type: Array, default: () => [] },
    },
    components: {
        InputDate,
    },
}
</script>
