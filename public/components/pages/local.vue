<template>
  <div id="local-container">
    <component
      v-bind:is="currentStateComponent"
      v-bind:question="currentQuestion"
      v-bind:timed="false"
      v-on:answer-selected="answerSelected"
    ></component>
  </div>
</template>

<script lang="ts">
import * as Timeout from 'await-timeout'

import logoVue from '../content/logo.vue'
import questionVue from '../content/question.vue'
import Question from '../../../shared/Question'

export default {
  created: function() {
    this.fetchQuestion()
  },
  data() {
    return {
      currentState: 'wait',
      currentQuestion: undefined,
      currentResults: undefined
    }
  },
  components: {
    logoVue,
    questionVue
  },
  computed: {
    currentStateComponent: function(): string {
      if (this.currentState === 'wait') return 'logoVue'
      return `${this.currentState}Vue`
    }
  },
  methods: {
    setState(state: string): void {
      this.currentState = state
    },
    async fetchQuestion(): Promise<void> {
      while(true) {
        const response = await fetch(`${this.$store.state.baseUrl}/local/question`)
        if (response.status === 200) {
          const question = await response.json()
          console.log(`Received question: ${JSON.stringify(question)}`)
          this.currentQuestion = question
          this.setState('question')
          break
        }
        console.log(`Could not get question, status was: ${response.status}`)
        await Timeout.set(1_000)
      }
    },
    async answerSelected(index: number): Promise<void> {
      const questionIndex = this.currentQuestion.index
      const reponse = await fetch(`${this.$store.state.baseUrl}/local/question/${questionIndex}/answer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'  
        },
        body: JSON.stringify({
          answerIndex: index
        })
      })
      console.log(`Saved answer, index: ${index}`)
      this.setState('wait')
      await Timeout.set(60_000)
      this.fetchQuestion()
    }
  }
}
</script>

<style lang="scss">
</style>
