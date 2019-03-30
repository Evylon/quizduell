<template>
  <div id="admin-container">
    <button v-on:click="start">Start</button>
  </div>
</template>

<script lang="ts">

export default {
  methods: {
    async start(): Promise<void> {
      await fetch(`${this.$store.state.baseUrl}/admin/start`, {
        method: 'POST'
      })
    }
  }
}
</script>

<style lang="scss">
</style>
