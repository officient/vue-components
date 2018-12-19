<template>
  <div class="field" :disabled="disabled">
    <label :for="`input${name}`">
      {{title}}
      <span v-if="required" class="required">*</span>
    </label>
    <InputSelect
      :value="value"
      @input="$emit('input', $event)"
      :name="name"
      :list="list"
      :groups="groups"
    />
  </div>
</template>

<script>
import InputSelect from './InputSelect.vue'
export default {
	name: 'InputSelectField',
	props: ['groups', 'list', 'value', 'name', 'title', 'required', 'disabled'],
	components: { InputSelect },
}
</script>
