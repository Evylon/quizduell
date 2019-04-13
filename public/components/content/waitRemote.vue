<template>
  <div id="wait-container" class="remote">
    <h1 class="full-page">{{ brand }}</h1>
    <h2>{{ waitingMessage }}</h2>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      brand: 'Quizduell',
      waitingMessage: 'Warte auf nächste Runde'
    }
  }
}
</script>

<style lang="scss">
#wait-container {
  padding: 0 20px;
}
</style>
