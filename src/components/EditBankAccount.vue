<template>
  <div class="content">
    <div class="box ui form">
      <div class="fields">
        <input type="hidden" name="bank_account_iban" :value="bankResult" autocomplete="off">
        <InputSelectField
          v-if="availableBankTypes.length > 1"
          v-model="bankType"
          name="bank_type"
          :list="availableBankTypesOptions"
          :title="$t('BANK_TYPE')"
          class="span-full"
        />
        <template v-if="bankType">
          <template v-if="bankType === 'IBAN'">
            <InputText
              v-model="banks.IBAN.iban"
              name="iban"
              :title="$local('IBAN_LABEL', countryCode)"
              :placeholder="$local('IBAN_PLACEHOLDER', countryCode)"
              class="span-full"
            />
          </template>
          <template v-else-if="bankType === 'GB'">
            <InputText
              v-model="banks.GB.sort_code"
              name="sort_code"
              :title="$t('SORT_CODE')"
              placeholder="12-34-56"
              class="span-full"
            />
            <InputText
              v-model="banks.GB.account_number"
              name="account_number"
              :title="$t('ACCOUNT_NUMBER')"
              class="span-full"
            />
          </template>
          <template v-else-if="bankType === 'US'">
            <InputText
              v-model="banks.US.routing_number"
              name="routing_number"
              :title="$t('ROUTING_NUMBER')"
              class="span-full"
            />
            <InputText
              v-model="banks.US.account_number"
              name="account_number"
              :title="$t('ACCOUNT_NUMBER')"
              class="span-full"
            />
            <InputSelectField
              v-model="banks.US.account_type"
              name="account_type"
              :list="accountTypes"
              :title="$t('ACCOUNT_TYPE')"
              class="span-full"
            />
          </template>
          <template v-else-if="bankType === 'CA'">
            <InputText
              v-model="banks.CA.transit_number"
              name="transit_number"
              :title="$t('TRANSIT_NUMBER')"
              class="span-full"
            />
            <InputText
              v-model="banks.CA.institution_number"
              name="institution_number"
              :title="$t('INSTITUTION_NUMBER')"
              class="span-full"
            />
            <InputText
              v-model="banks.CA.account_number"
              name="account_number"
              :title="$t('ACCOUNT_NUMBER')"
              class="span-full"
            />
          </template>
          <template v-else-if="bankType === 'AU'">
            <InputText
              v-model="banks.AU.bsb_number"
              name="bsb_number"
              :title="$t('BSB_NUMBER')"
              placeholder="123456"
              class="span-full"
            />
            <InputText
              v-model="banks.AU.account_number"
              name="account_number"
              :title="$t('ACCOUNT_NUMBER')"
              class="span-full"
            />
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import InputText from './input/InputText.vue'
import InputSelectField from './input/InputSelectField.vue'

export default {
  name: 'EditBankAccount',
  props: {
    onlyIBAN: {
      // restrict bank types to IBAN
      // when user is an integration user
      type: Boolean,
      default: false,
    },
    initialBankData: {
      // initial bank data as of now
      // can be parsed or stringified JSON
      type: [String, Object],
    },
    countryCode: {
      // used for displaying the correct IBAN placeholder and label
      type: [String, Number]
    },
  },
	components: {
		InputText,
		InputSelectField,
	},
	data() {
		return {
			bankType: '',
			banks: {
				IBAN: {
					iban: '',
				},
				GB: {
					country_code: 'GB',
					sort_code: '',
					account_number: '',
				},
				US: {
					country_code: 'US',
					routing_number: '',
					account_number: '',
					account_type: '',
				},
				CA: {
					country_code: 'CA',
					transit_number: '',
					institution_number: '',
					account_number: '',
				},
				AU: {
					country_code: 'AU',
					bsb_number: '',
					account_number: '',
				},
			},
		}
	},
	computed: {
		bankResult() {
			return JSON.stringify(this.banks[this.bankType])
    },
    availableBankTypes () {
      // only allowed IBAN, usually when employee is synced with an integration
			if (this.onlyIBAN) {
				return ['IBAN']
      }
      
      return Object.keys(this.banks)
    },
		availableBankTypesOptions() {
			return this.availableBankTypes.map(id => {
				return {
					id: id,
					title: this.$t(`BANK_TYPE_${id}`),
				}
			})
		},
		accountTypes() {
			return [
				{ id: 'checking', title: this.$t('ACCOUNT_CHECKING') },
				{ id: 'saving', title: this.$t('ACCOUNT_SAVING') },
			]
    },
    initialBankDataParsed () {
      if (!this.initialBankData) {
        // it's null, undefined, empty string, ...
        return
      }

      if (typeof this.initialBankData === 'object') {
        // it's already an object, check if it has the keys we want
        if (this.initialBankData.iban || this.initialBankData.country_code) {
          return this.initialBankData
        }
      }

      try {
        // it's a string, try to parse it
        return JSON.parse(this.initialBankData)
      } catch (err) {}
    },
	},
	mounted() {
		this.setInitialData()
	},
	methods: {
		setInitialData() {
			if (this.availableBankTypes.length === 1) {
        this.bankType = this.availableBankTypes[0]
      }

      const bankAccount = this.initialBankDataParsed
      if (bankAccount) {
        if (bankAccount.iban) {
					this.banks.IBAN = bankAccount
					this.bankType = 'IBAN'
				} else if (bankAccount.country_code) {
					this.banks[bankAccount.country_code] = bankAccount
					this.bankType = bankAccount.country_code
				}
      }
    },
	},
}
</script>