<template>
  <h1>{{ waitingMessage }}</h1>
</template>

<script lang="ts">
export default {
  data() {
    return {
      waitingMessage: 'Warte auf nächste Runde'
    }
  }
}
</script>

<style lang="scss">

h1 {
  color: #fff;
  text-align: center;
  margin-top: 40vh;
}

</style>
