<template>
<loading v-if="!loaded" class="supercenter" />
<form v-else @submit.prevent.stop="send">
  <div class="box ui form">
    <template v-if="editableFields.length > 0">
      <div class="form-field-title">{{ $t('EDITABLE_CUSTOM_FIELDS') }}</div>
      <div class="fields">
        <CustomFieldFormField
          v-for="cf in editableFields"
          :key="cf.id"
          :id="cf.id"
          v-model="cf.value"
          :name="cf.name"
          :type="cf.type"
          :options="cf.options"
          :employee_visibility="cf.employee_visibility"
          :errorText="errors[cf.id]"
        />
      </div>
    </template>

    <template v-if="nonEditableFields.length > 0">
      <div class="form-field-title">{{ $t('NON_EDITABLE_CUSTOM_FIELDS') }}</div>
      <div class="fields">
        <CustomFieldFormField
          v-for="cf in nonEditableFields"
          :key="cf.id"
          :id="cf.id"
          v-model="cf.value"
          :name="cf.name"
          :type="cf.type"
          :options="cf.options"
          :employee_visibility="cf.employee_visibility"
          :errorText="errors[cf.id]"
        />
      </div>
    </template>
  </div>
  <button class="button blue" @click.prevent.stop="send">{{ $t('SAVE_CHANGES') }}</button>
</form>
</template>

<script>
import CustomFieldFormField from 'components/customfields/CustomFieldFormField'
import { getCustomFields, getCustomFieldOptions, setCustomFieldValue } from 'api/customFields'
import getCustomFieldFormData from 'utils/transformers/getCustomFieldFormData'

export default {
  props: ['valuesCustomFields', 'back'],
  components: { CustomFieldFormField },
  data () {
    return {
      customFields: [],
      errors: {},
      loaded: false,
    }
  },
  mounted () {
    // Should be only mounted when valuesCustomFields is loaded
    this.init()
  },
  computed: {
    editableFields () {
      return this.customFields.filter(x => x.employee_visibility === 'visible_and_editable')
    },
    nonEditableFields () {
      return this.customFields.filter(x => x.employee_visibility === 'visible')
    },
  },
  methods: {
    async init () {
      this.customFields = await getCustomFieldFormData(getCustomFields, getCustomFieldOptions, this.valuesCustomFields)
      this.loaded = true
    },
    async send () {
      this.errors = {}

      const promises = this.editableFields.map(x => {
        return setCustomFieldValue({ custom_field_id: x.id, value: x.value }, { disable_toasts: true })
          .catch(e => {
            this.$set(this.errors, x.id, e.body.reason_phrase)
          })
      })

      await Promise.all(promises)
      if (Object.keys(this.errors).length > 0) {
        return // display errors
      }

      Toast.show({ title: this.$t('SAVED'), description: this.$t('CHANGES_SAVED') })
      go(this.back)
    }
  }
}
</script>
