<template>
  <div class="container" id="app">
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>
import { User } from '../functions/User'

export default {
  created: function () {
    const user = new User()
    this.$store.commit('setUserId', {
      userId: user.id
    })
  }
}
</script>

<style lang="scss">
html {
  height: 100%;
}


body {
  min-height: 100%;
  
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background-color: #0f75a4;
  color: #fff;
  margin: 0px;
  font-weight: 200;
  background-image: url('../assets/background.svg');
  background-size: cover;
  background-position: bottom center;
  background-repeat: no-repeat;
  background-attached: fixed;

  overflow-wrap: break-word;
  word-wrap: break-word;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
}

#app {
  max-width: 700px;
  margin: 0 auto;
}

h1 {
  color: #fff;
  text-align: center;
  font-size: 60px;
  font-weight: 700;
  text-shadow: 0.04em 0.04em #0f678f; 
}

.local h1 {
  font-size: 100px;
}

h1.full-page {
  padding-top: 25vh;
}

.local h1.full-page {
  padding-top: 30vh;
}

h2 {
  color: #fff;
  text-align: center;
  font-size: 35px;
  font-weight: 700;
  text-shadow: 0.04em 0.04em #0f678f; 
}

.local h2 {
  font-size: 60px;
}

</style>
