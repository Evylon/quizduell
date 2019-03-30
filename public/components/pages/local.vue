<template>
  <div id="local-container">
    <transition name="fade" mode="out-in">
      <component
        v-bind:is="currentStateComponent"
        v-bind:question="currentQuestion"
        v-bind:result="currentQuestionResult"
        v-bind:results="currentResults"
        v-bind:timed="false"
        v-on:answer-selected="answerSelected"
        v-on:results-close="resultsClose"
        v-on:question-close="questionClose"
      ></component>
    </transition>
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

enum State {
    Wait = 'wait',
    Question = 'question',
    Results = 'results'
}

export default {
  created: function() {
    this.fetchQuestion()
  },
  data() {
    return {
      currentState: State.Wait,
      currentQuestion: undefined,
      currentResults: []
    }
  },
  components: {
    logoVue,
    questionVue,
    resultsVue
  },
  computed: {
    currentStateComponent: function(): string {
      if (this.currentState === State.Wait) return 'logoVue'
      return `${this.currentState}Vue`
    },
    currentQuestionResult: function(): Result {
      const currentQuestion = this.currentQuestion
      const currentResults = this.currentResults
      if (!currentQuestion || !currentResults) return undefined
      const currentResult = currentResults[currentQuestion.index]
      console.log(currentResult)
      return currentResult
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
          this.setState(State.Question)
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
      this.fetchResults()
    },
    async displayResults(): Promise<void> {
      this.setState(State.Results)
    },
    async fetchResults(): Promise<void> {
      const response = await fetch(`${this.$store.state.baseUrl}/results`)
      const results: Result[] = await response.json()
      console.log(`Received results: ${JSON.stringify(results)}`)
      this.currentResults = results
    },
    async resultsClose(): Promise<void> {
      console.log('Results closed')
      this.setState(State.Wait)
      await Timeout.set(60_000)
      this.fetchQuestion()
    },
    async questionClose(): Promise<void> {
      console.log('Question closed')
      const questionIndex = this.currentQuestion.index
      if ((questionIndex + 1) % 3 === 0) {
        console.log('Will display results next')
        this.displayResults()
        return
      }
      console.log('Will display question next')
      this.setState(State.Wait)
      await Timeout.set(1_000)
      this.fetchQuestion()
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: all 0.8s ease-in-out;
}

.fade-enter {
  transform: translateY(100px);
  opacity: 0;
}

.fade-leave-to {
  transform: translateY(-250px);
  opacity: 0;
}
</style>
