<template>
  <div>
    <div class="mt-20px">
      <pre>:page="0" :perPage="10" :pageCount="9"</pre>
      <Pagination :page="0" :perPage="10" :pageCount="9" @onPageChanged="pageChanged" />
    </div>
    <div class="mt-20px">
      <pre>:page="0" :perPage="10" :pageCount="10"</pre>
      <Pagination :page="0" :perPage="10" :pageCount="10" @onPageChanged="pageChanged" />
    </div>
    <div class="mt-20px">
      <pre>:page="1" :perPage="10" :pageCount="9"</pre>
      <Pagination :page="1" :perPage="10" :pageCount="9" @onPageChanged="pageChanged" />
    </div>
    <div class="mt-20px">
      <pre>:page="1" :perPage="10" :pageCount="10"</pre>
      <Pagination :page="1" :perPage="10" :pageCount="10" @onPageChanged="pageChanged" />
    </div>
    <hr>
    <div class="mt-20px">
      <pre>:page="0" :perPage="10" :pageCount="10" :totalCount="10"</pre>
      <Pagination :page="0" :perPage="10" :pageCount="10" :totalCount="10" @onPageChanged="pageChanged" />
    </div>
    <div class="mt-20px">
      <pre>:page="0" :perPage="10" :pageCount="10" :totalCount="19"</pre>
      <Pagination :page="0" :perPage="10" :pageCount="10" :totalCount="19" @onPageChanged="pageChanged" />
    </div>
    <div class="mt-20px">
      <pre>:page="1" :perPage="10" :pageCount="10" :totalCount="20"</pre>
      <Pagination :page="1" :perPage="10" :pageCount="10" :totalCount="20" @onPageChanged="pageChanged" />
    </div>
    <div class="mt-20px">
      <pre>:page="1" :perPage="10" :pageCount="10" :totalCount="21"</pre>
      <Pagination :page="1" :perPage="10" :pageCount="10" :totalCount="21" @onPageChanged="pageChanged" />
    </div>
  </div>
</template>

<script>
import Pagination from '../../../lib/components/Pagination'

export default {
  components: { Pagination },
  methods: {
    pageChanged (newPage) {
      alert(`new page: ${newPage} (zerobased api)`)
    }
  }
}
</script>
