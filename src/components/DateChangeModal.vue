<template>
  <div>
    <!-- this is used inside a <form> element -->
    <input type="hidden" :name="name" :value="value">

    <!-- this is hoisted using PortalVue to the top document element so is no longer in the form -->
    <Modal :show="true" :width="500" :canClose="false">
      <div class="ui form">
        <div class="fields full">
          <div class="field span-full mb-0">
            <label for="inputDate" class="h-auto">{{ label }}</label>
            <InputDate
              ref="date"
              id="inputDate"
              :value="value"
              placeholder="dd/mm/yyyy"
              @input="onInput"
              :class="{ 'error' : !dateIsInRange }"
            />
            <div class="text-red mt-10px" v-if="!dateIsInRange">{{ $t('PICK_DATE_BETWEEN', { startDate: startDate.format('DD/MM/YYYY'), endDate: endDate.format('DD/MM/YYYY') }) }}</div>
          </div>
        </div>
        <div class="mt-15px">
          <div
            class="button blue"
            :class="{ 'disabled' : !dateIsInRange }"
            @click="confirm">{{ $t('CONFIRM') }}</div>
            <div class="button basic" @click="close">{{ $t('CANCEL') }}</div>
        </div>
      </div>
    </Modal>
  </div>
</template>
 
<script>
import moment from 'moment'
import Modal from './Modal'
import InputDate from './InputDate'
 
export default {
  props: ['value', 'name', 'label'],
  components: { Modal, InputDate },
  computed: {
    startDate () {
      return moment().startOf('month')
    },
    endDate () {
      return moment().add(3, 'months').endOf('month')
    },
    dateIsInRange () {
      return moment(this.value, 'DD/MM/YYYY').isBetween(this.startDate, this.endDate, null, [])
    },
  },
  methods: {
    onInput (value) {
      this.$emit('input', value)
    },
    confirm () {
      if (!this.dateIsInRange) return
      this.$emit('save')
    },
    close () {
      this.$emit('close')
    },
  }
}
</script>