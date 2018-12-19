<template>
  <div class="select">
    <select
      ref="input"
      :value="value"
      @change="updateValue($event.target.value)"
      :id="id"
      :name="name"
      autocomplete="off"
    >
      <option disabled="disabled" value>{{ $t('CLICK_TO_SELECT') }}</option>
      <option
        v-for="item in list"
        :key="item.id"
        :value="item.id"
        :disabled="item.disabled"
        :title="item.description"
      >{{item.title}}</option>
      <template v-for="(group, i) in groups">
        <optgroup :key="i" v-if="group.list" :label="group.title">
          <option
            v-for="item in group.list"
            :key="item.id"
            :value="item.id"
            :disabled="item.disabled"
            :title="item.description"
          >{{item.title}}</option>
        </optgroup>
        <option
          v-else-if="group.id"
          :key="group.id"
          :value="group.id"
          :disabled="group.disabled"
          :title="group.description"
        >{{group.title}}</option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
	name: 'input-select',
	props: ['groups', 'list', 'value', 'name', 'id'],
	methods: {
		updateValue(value) {
			this.$emit('input', value)
		},
	},
}
</script>
