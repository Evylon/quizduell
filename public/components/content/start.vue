<template>
  <div id="start-container" class="local"
    v-on:click="next"
  >
    <h1 class="full-page">{{ brand }}</h1>
    <h2>{{ gameTitle }}</h2>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      brand: 'Quizduell',
      gameTitle: 'Melanie vs. Jutta' // 'Oma & Opa vs. Familie'
    }
  },
  methods: {
    next() {
      this.$emit('start-close')
    }
  }
}
</script>

<style lang="scss">
#start-container {
  padding: 0 20px;
}
</style>
