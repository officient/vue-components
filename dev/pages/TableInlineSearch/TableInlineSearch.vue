<template>
  <div class="table">
    <div class="tbody">
      <div class="tr">
        <td class="colspan" colspan="100%">
          <TableInlineSearch v-model="search_term" placeholder="Search" @input="searchTermChanged"/>
        </td>
      </div>
  	</div>
  </div>
</template>

<script>
import TableInlineSearch from '../../../lib/components/TableInlineSearch'

export default {
  components: { TableInlineSearch },
  data () {
    return {
      search_term: ''
    }
  },
  methods: {
    searchTermChanged () {
      console.log('doing stuff here')
    }
  }
}
</script>

<style scoped lang="scss">
.table {
  display: table;
  width: 400px;
  
  .tbody {
    display: table-row-group;
    vertical-align: middle;
  }
  .tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }
}
</style>

