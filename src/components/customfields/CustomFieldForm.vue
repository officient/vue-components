<template>
<loading v-if="!loaded" class="supercenter" />
<form v-else @submit.prevent.stop="send">
  <div class="box ui form">
    <CustomFieldFormFields
      :label="$t('VISIBLE_AND_EDITABLE_CUSTOM_FIELDS')"
      :fields="editableFields"
      @onChange="onChange" />

    <CustomFieldFormFields
      :label="$t('VISIBLE_CUSTOM_FIELDS')"
      :fields="nonEditableFields"
      @onChange="onChange" />

    <CustomFieldFormFields
      :label="$t('HIDDEN_CUSTOM_FIELDS')"
      :fields="hiddenFields"
      @onChange="onChange" />
  </div>
  <button class="button blue" @click.prevent.stop="send">{{ $t('SAVE_CHANGES') }}</button>
</form>
</template>

<script>
import CustomFieldFormFields from 'components/customfields/CustomFieldFormFields'
import { getCustomFields, getCustomFieldOptions, setCustomFieldValue } from 'api/customFields'
import getCustomFieldFormData from 'utils/transformers/getCustomFieldFormData'

export default {
  props: ['object_id', 'valuesCustomFields', 'back'],
  components: { CustomFieldFormFields },
  data () {
    return {
      customFields: [],
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
    hiddenFields () {
      return this.customFields.filter(x => x.employee_visibility === 'none')
    },
  },
  methods: {
    async init () {
      this.customFields = await getCustomFieldFormData(getCustomFields, getCustomFieldOptions, this.valuesCustomFields)
      this.loaded = true
    },
    onChange (cf, newValue) {
      this.$set(cf, 'value', newValue)
    },
    async send () {
      const params = { object_id: this.object_id }
      for (const cf of this.customFields) {
        params[`custom_field_${cf.id}`] = cf.value
      }

      await setCustomFieldValue(params)

      Toast.show({ title: this.$t('SAVED'), description: this.$t('CHANGES_SAVED') })
      go(this.back)
    }
  }
}
</script>
