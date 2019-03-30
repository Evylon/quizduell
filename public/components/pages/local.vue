<template>
  <div id="local-container">
    <component
      v-bind:is="currentStateComponent"
      v-bind:question="currentQuestion"
      v-bind:result="currentQuestionResult"
      v-bind:results="currentResults"
      v-bind:timed="false"
      v-on:answer-selected="answerSelected"
    ></component>
  </div>
</template>

<script lang="ts">
import * as Timeout from 'await-timeout'

import logoVue from '../content/logo.vue'
import questionVue from '../content/question.vue'
import resultsVue from '../content/results.vue'
import Question from '../../../shared/Question'
import Result from '../../../shared/Result'
import { resultsMock } from '../../functions/resultsMock'

enum States {
    Wait = 'wait',
    Question = 'question',
    Results = 'results'
}

export default {
  created: function() {
    // MOCK: this.fetchQuestion()
  },
  data() {
    return {
      currentState: States.Question, // MOCK: States.Wait,
      currentQuestion: resultsMock[1].question,
      currentResults: resultsMock // MOCK: []
    }
  },
  components: {
    logoVue,
    questionVue,
    resultsVue
  },
  computed: {
    currentStateComponent: function(): string {
      if (this.currentState === 'wait') return 'logoVue'
      return `${this.currentState}Vue`
    },
    currentQuestionResult: function(): Result {
      const x =  this.currentResults[this.currentQuestion.index]
      console.log(x)
      return x
    }
  },
  methods: {
    setState(state: string): void {
      this.currentState = state
    },
    async fetchQuestion(): Promise<void> {
      while (true) {
        const response = await fetch(`${this.$store.state.baseUrl}/local/question`)
        if (response.status === 200) {
          const question: Question = await response.json()
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
    },
    async fetchResults(): Promise<void> {
      while (true) {
        const response = await fetch(`${this.$store.state.baseUrl}/local/results`)
        if (response.status === 200) {
          const results: Result[] = await response.json()
          console.log(`Received results: ${JSON.stringify(results)}`)
          this.currentResults = results
          this.setState('result')
          break
        }
        console.log(`Could not get results, status was: ${response.status}`)
        await Timeout.set(1_000)
      }
    }
  }
}
</script>

<style lang="scss">
</style>
