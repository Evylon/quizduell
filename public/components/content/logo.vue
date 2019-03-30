<template>
  <div id="logo-container">
    <h1 class="full-page">{{ brand }}</h1>
    <h2>{{ gameTitle }}</h2>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      brand: 'Quizduell',
      gameTitle: 'Oma & Opa vs. Family'
    }
  }
}
</script>

<style lang="scss">
</style>
