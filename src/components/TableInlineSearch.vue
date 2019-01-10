<template lang="html">
  <div class="table-inline-search">
    <div class="table-inline-search__close" v-if="value" @click="sendInputToParent('')">
      <icon-close />
    </div>
    <input
      :value="value"
      type="text"
      :placeholder="placeholder"
      @input="sendInputToParent($event.target.value)" />
  </div>
</template>

<script>
import '../scss/TableInlineSearch.scss'
import '../scss/Icons.scss'

export default {
  name: 'TableInlineSearch',
  props: {
    value: String,
    placeholder: String
  },
  methods: {
    sendInputToParent (newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>
