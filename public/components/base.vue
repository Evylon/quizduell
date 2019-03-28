<template>
  <div class="container" id="app">
    <!-- INITIAL-SETUP Navbar goes here if you use one -->
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>

export default {
  watch: {
    $route(endPath) {
      console.log('End path!')
    }
  }
}
</script>

<style lang="scss">
</style>
