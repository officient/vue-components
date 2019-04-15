<template>
    <div class="field relative">
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
            <input v-else-if="cf.type === 'email'" :id="`cf_${cf.id}`" type="email" :placeholder="$t('PLEASE_ENTER_EMAIL')" v-model="cf.value" />
          <input v-else-if="cf.type === 'int'" :id="`cf_${cf.id}`" type="number" :placeholder="$t('PLEASE_ENTER_NUMBER')" v-model="cf.value" />
          <input v-else-if="cf.type === 'money'" :id="`cf_${cf.id}`" type="number" :placeholder="$t('PLEASE_ENTER_NUMBER')" v-model="cf.value" />
          <input v-else :id="`cf_${cf.id}`" type="text" placeholder="" v-model="cf.value" /> </div>
        </div>
</template>

<script>
import InputDate from 'components/input/InputDate'

export default {
    props: {
        id: [ String, Number ],
        name: String,
        type: String,
        value: [ String, Number ], 
        options: {type: Array, default: () => [] },
    },
    components: {
        InputDate,
    },
}
</script>
