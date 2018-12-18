<template>
  <div class="page">
    <div class="mt-20px">
      <h2>normal dropdown</h2>
      <dropdown>
        <div slot="target">
          <button>click me to show dropdown</button>
        </div>
        <template slot="menu">
          <div class="item">Action One</div>
          <div class="item">Action Two</div>
        </template>
      </dropdown>
    </div>
    <div class="mt-20px">
      <h2>without target slot but with title prop</h2>
      <pre>:title="'click me'"</pre>
      <dropdown :title="'click me to show dropdown'">
        <template slot="menu">
          <div class="item">Action One</div>
          <div class="item">Action Two</div>
        </template>
      </dropdown>
    </div>
    <div class="mt-20px">
      <h2>autoshow</h2>
      <pre>:showOnInit="true" :hideAfterMs="2000"</pre>
      <dropdown :showOnInit="true" :hideAfterMs="2000">
        <div slot="target">
          <button>click me to show dropdown</button>
        </div>
        <template slot="menu">
          <div class="item">Action One</div>
          <div class="item">Action Two</div>
        </template>
      </dropdown>
    </div>
    <div class="mt-20px">
      <h2>no close on click</h2>
      <pre>:closeOnClick="false"</pre>
      <dropdown :closeOnClick="false">
        <div slot="target">
          <button>click me to show dropdown</button>
        </div>
        <template slot="menu">
          <div class="item">Action One</div>
          <div class="item">Action Two</div>
        </template>
      </dropdown>
    </div>
  </div>
</template>

<script>
import Dropdown from '../../../lib/components/Dropdown'

export default {
  components: { Dropdown }
}
</script>
