<template>
<div class="box ui form customfielddemo">
  <h2 class="sub-title">{{ $t(`CUSTOMFIELD_OBJECT_${object_type}`) }}</h2>
  <div class="fields">
    <div class="field">
      <label for="example">{{name}}</label>
      <div class="input" :class="{ labelled: type === 'money' }">
        <i class="mdi mdi-currency-eur" v-if="type === 'money'"></i>
        <div class="select" v-if="type === 'select_option'">
          <select>
            <option disabled="disabled" selected="selected" value="">{{ $t('SELECT_OPTION') }}</option>
            <option v-for="item in exampleOptions" :value="item">{{item}}</option>
          </select>
        </div>
        <input-date v-else-if="type === 'date'" placeholder="dd/mm/yyyy" :value="new Date() | dateFormat"></input-date>
        <input v-else-if="type === 'email'" type="email" :placeholder="name" :value="exampleText" />
        <input v-else type="text" :placeholder="name" :value="exampleText" /> </div>
    </div>
  </div>
</div>
</template>

<script>
import InputDate from 'components/input/InputDate'

export default {
  name: 'custom-field-example',
  props: [ 'name', 'object_type', 'type', 'options' ],
  components: { InputDate },
  computed: {
    exampleOptions () {
      if (this.options) {
        return this.options.map(x => x.option_name).filter(x => x)
      }
      return ['Apples', 'Oranges', 'Pears']
    },
    exampleText () {
      switch (this.type) {
        case 'string': return 'Sample Text'
        case 'int': return Math.round(Math.random() * 1000)
        case 'money': return (Math.random() * 2000).toFixed(2)
        case 'email': return 'some@email.com'
      }
    }
},
}
</script>
