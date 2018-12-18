<template>
  <div class="page">
    <p>default</p>
    <div class="ui form">
      <div class="field">
        <input-date placeholder="Pick a date" v-model="date_evaluation"></input-date>
      </div>
    </div>
  </div> 
</template>

<script>
import InputDate from '../../../lib/components/InputDate'

export default {
  components: { InputDate },
  data () {
    return {
      date_evaluation: '',
    }
  }

}
</script>
