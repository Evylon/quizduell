<template>
  <div class="row">
    <h3>{{ message }}</h3>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    exampleProp: {
      type: String,
      // VSCode auto fill shows this note when adding props to components
      note: 'An example description'
    }
  },
  data() {
    return {
      message: 'This will be overwritten in created()'
    }
  },
  created() {
    this.message = 'Hello Quizduell'
  }
}
</script>
