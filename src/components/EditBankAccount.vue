<template>
<div class="content">
  <div class="box ui form">
    <div class="three fields">
      <div class="field span-full">
        <label>Bank system</label>
        <div class="select">
          <select id="inputbank_account_type" v-model="bankType">
            <option value="" disabled="disabled">{{ $t('CLICK_TO_SELECT') }}</option>
            <option value="IBAN" v-if="availableBankTypes.indexOf('IBAN') > -1" :selected="availableBankTypes.length === 1">IBAN</option>
            <option value="GB" v-if="availableBankTypes.indexOf('GB') > -1">Great Britain</option>
            <option value="US" v-if="availableBankTypes.indexOf('US') > -1">United States</option>
            <option value="CA" v-if="availableBankTypes.indexOf('CA') > -1">Canada</option>
            <option value="AU" v-if="availableBankTypes.indexOf('AU') > -1">Australia</option>
          </select>
        </div>
      </div>
    </div>
    <input type="hidden" name="bank_account_iban" v-model="bankResult" autocomplete="off"/>
    <template v-if="bankType">
      <template v-if="bankType === 'IBAN'">
        <div class="three fields">
          <div class="field span-full">
            <label>{{ $local('IBAN_LABEL', nationality_country_code) }}</label>
            <input type="text" id="inputbank_account_iban" name="iban" v-model="banks.IBAN.iban" autocomplete="off" :placeholder="$local('IBAN_PLACEHOLDER', nationality_country_code)" /> 
          </div>
        </div>
      </template>
      <template v-else-if="bankType === 'GB'">
        <div class="three fields">
          <div class="field span-full">
            <label>Sort code</label>
            <input type="text" name="sort_code" v-model="banks.GB.sort_code" autocomplete="off" /> 
          </div>
        </div>
        <div class="three fields">
          <div class="field span-full">
            <label>Account number</label>
            <input type="text" name="account_number" v-model="banks.GB.account_number" autocomplete="off" /> 
          </div>
        </div>
      </template>
      <template v-else-if="bankType === 'US'">
        <div class="three fields">
          <div class="field span-full">
            <label>Routing number</label>
            <input type="text" name="routing_number" v-model="banks.US.routing_number" autocomplete="off" /> 
          </div>
        </div>
        <div class="three fields">
          <div class="field span-full">
            <label>Account number</label>
            <input type="text" name="account_number" v-model="banks.US.account_number" autocomplete="off" /> 
          </div>
        </div>
        <div class="three fields">
          <div class="field span-full">
            <label>Account type</label>
            <div class="select">
              <select v-model="banks.US.account_type">
                <option value="" disabled="disabled">{{ $t('CLICK_TO_SELECT') }}</option>
                <option value="checking">Checking</option>
                <option value="saving">Saving</option>
              </select>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="bankType === 'CA'">
        <div class="three fields">
          <div class="field span-full">
            <label>Transit number</label>
            <input type="text" name="routing_number" v-model="banks.CA.routing_number" autocomplete="off" /> 
          </div>
        </div>
        <div class="three fields">
          <div class="field span-full">
            <label>Institution number</label>
            <input type="text" name="institution_number" v-model="banks.CA.institution_number" autocomplete="off" /> 
          </div>
        </div>
        <div class="three fields">
          <div class="field span-full">
            <label>Account number</label>
            <input type="text" name="account_number" v-model="banks.CA.account_number" autocomplete="off" /> 
          </div>
        </div>
      </template>
      <template v-else-if="bankType === 'AU'">
        <div class="three fields">
          <div class="field span-full">
            <label>BSB number</label>
            <input type="text" name="bsb_number" v-model="banks.AU.bsb_number" autocomplete="off" /> 
          </div>
        </div>
        <div class="three fields">
          <div class="field span-full">
            <label>Account number</label>
            <input type="text" name="account_number" v-model="banks.AU.account_number" autocomplete="off" /> 
          </div>
        </div>
      </template>
    </template>
  </div>
</div>
</template>
 <script>
export default {
  name: 'EditBankAccount',
  props: ['sync_integration', 'bank_account_iban', 'nationality_country_code'],
  data () {
    return {
      availableBankTypes: [],
      bankType: '',
      banks: {
        IBAN: {
          iban: ''
        },
        GB: {
          country_code: 'GB',
          sort_code: '',
          account_number: ''
        },
        US: {
          country_code: 'US',
          routing_number: '',
          account_number: '',
          account_type: ''
        },
        CA: {
          country_code: 'CA',
          transit_number: '',
          institution_number: '',
          account_number: ''
        },
        AU: {
          country_code: 'AU',
          bsb_number: '',
          account_number: ''
        }
      }
    }
  },
  computed: {
    bankResult() {
      return JSON.stringify(this.banks[this.bankType])
    }
  },
  beforeMount() {
    if(this.sync_integration === null) {
      this.availableBankTypes = Object.keys(this.banks)
    } else {
      this.availableBankTypes = [ "IBAN" ]
    }
    if(this.availableBankTypes.length === 1) {
      this.bankType = this.availableBankTypes[0]
    }
    try {
      const bankAccount = JSON.parse(this.bank_account_iban)
      if(bankAccount.iban) {
        this.banks.IBAN = bankAccount
        this.bankType = "IBAN"
      } else if(bankAccount.country_code) {
        this.banks[bankAccount.country_code] = bankAccount
        this.bankType = bankAccount.country_code
      }
    } catch(err) { /* no bank account */ }
  }
}
</script>