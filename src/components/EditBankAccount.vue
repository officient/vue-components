<template>
  <div class="content">
    <div class="box ui form">
      <div class="fields">
        <input type="hidden" name="bank_account_iban" v-model="bankResult" autocomplete="off">
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
              :title="$local('IBAN_LABEL', nationality_country_code)"
              :placeholder="$local('IBAN_PLACEHOLDER', nationality_country_code)"
              class="span-full"
            />
          </template>
          <template v-else-if="bankType === 'GB'">
            <InputText
              v-model="banks.GB.sort_code"
              name="sort_code"
              :title="$t('SORT_CODE')"
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
	props: [
		'sync_integration',
		'bank_account_iban',
		'nationality_country_code',
	],
	components: {
		InputText,
		InputSelectField,
	},
	data() {
		return {
			availableBankTypes: [],
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
	},
	beforeMount() {
		if (this.sync_integration === null) {
			this.availableBankTypes = Object.keys(this.banks)
		} else {
			this.availableBankTypes = ['IBAN']
		}
		if (this.availableBankTypes.length === 1) {
			this.bankType = this.availableBankTypes[0]
		}
		try {
			const bankAccount = JSON.parse(this.bank_account_iban)
			if (bankAccount.iban) {
				this.banks.IBAN = bankAccount
				this.bankType = 'IBAN'
			} else if (bankAccount.country_code) {
				this.banks[bankAccount.country_code] = bankAccount
				this.bankType = bankAccount.country_code
			}
		} catch (err) {
			/* no bank account */
		}
	},
}
</script>