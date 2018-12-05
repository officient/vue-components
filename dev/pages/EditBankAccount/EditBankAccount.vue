<template>
	<div class="page">
		<div>
			<h2>{{ iban.title }}</h2>
			<span>Set nationality to</span>
			<a href="#" @click.prevent="setIBANNationality('BE')">BE</a>
			<a href="#" @click.prevent="setIBANNationality('NL')">NL</a>
			<a href="#" @click.prevent="setIBANNationality('IT')">IT</a>
			<a href="#" @click.prevent="setIBANNationality('DE')">DE</a>
			<EditBankAccount :employee="iban.employee" :nationality_country_code="iban.nationality_country_code" />
			<h2>{{ iban_existing.title }}</h2>
			<EditBankAccount :employee="iban_existing.employee" :nationality_country_code="iban_existing.nationality_country_code" />
			<h2>{{ freelancer.title }}</h2>
			<EditBankAccount :employee="freelancer.employee" :nationality_country_code="freelancer.nationality_country_code" />
			<h2>{{ freelancer_existing.title }}</h2>
			<EditBankAccount :employee="freelancer_existing.employee" :nationality_country_code="freelancer_existing.nationality_country_code" />
		</div>
	</div>
</template>

<script>
import EditBankAccount from '../../../lib/components/EditBankAccount'

export default {
	components: { EditBankAccount },
	data() {
		return {
			iban: {
				title: " EU linked bank account - IBAN",
				employee: {
					sync_integration: 'acerta',
					nationality: "BE",
				},
				nationality_country_code: 'BE',
			},
			iban_existing: {
				title: "Existing EU linked bank account - IBAN",
				employee: {
					sync_integration: 'acerta',
					nationality: "BE",
					bank_account_iban: JSON.stringify({ 
						iban: "BE32 7360 3659 1902" 
					}),
				},
				nationality_country_code: 'BE',
			},
			freelancer: {
				title: 'Freelancer - Any bank system',
				employee: {
					sync_integration: null,
					nationality: "US",
				},
				nationality_country_code: 'US',
			},
			freelancer_existing: {
				title: 'Existing Freelancer - Any bank system',
				employee: {
					sync_integration: null,
					nationality: "US",
					bank_account_iban: JSON.stringify({
						country_code: 'US',
						routing_number: '488448',
						account_number: '484889988',
						account_type: 'checking'
					}),
				},
				nationality_country_code: 'US',
			}
		}
	},
	methods: {
		setIBANNationality(nationality) {
			this.iban.employee.nationality = nationality
			this.iban.nationality_country_code = nationality
		}
	}
}
</script>
