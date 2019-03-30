<template>
  <div id="family-container">
    <component
      v-bind:is="currentStateComponent"
      v-bind:question="currentQuestion"
      v-bind:timed="true"
      v-on:answer-selected="answerSelected"
      v-on:no-answer-selected="noAnswerSelected"
    ></component>
  </div>
</template>

<script lang="ts">
import * as Timeout from 'await-timeout'

import { QUESTION_TIME, QUESTION_GRACE_TIME } from '../../../shared/constants'
import waitVue from '../content/wait.vue'
import questionVue from '../content/question.vue'
import Question from '../../../shared/Question'

export default {
  created: function() {
    this.fetchQuestion()
  },
  components: {
    waitVue,
    questionVue
  },
  data() {
    return {
      currentState: 'wait',
      currentQuestion: undefined
    }
  },
  computed: {
    currentStateComponent: function(): string {
      return `${this.currentState}Vue`
    }
  },
  methods: {
    setState(state: string): void {
      this.currentState = state
    },
    async fetchQuestion(): Promise<void> {
      while(true) {
        const response = await fetch(`${this.$store.state.baseUrl}/remote/question`)
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
      const userId = this.$store.state.userId
      const questionIndex = this.currentQuestion.index
      const reponse = await fetch(`${this.$store.state.baseUrl}/remote/question/${questionIndex}/answer/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'  
        },
        body: JSON.stringify({
          answerIndex: index
        })
      })
      console.log(`Saved answer, index: ${index}, userId: ${userId}`)
      await Timeout.set(2_000) // Keep the selected answer visible for a short time
      this.setState('wait')
      await Timeout.set(QUESTION_TIME + QUESTION_GRACE_TIME)
      this.fetchQuestion()
    },
    async noAnswerSelected(): Promise<void> {
      this.setState('wait')
      await Timeout.set(QUESTION_TIME + QUESTION_GRACE_TIME)
      this.fetchQuestion()
    }
  }
}
</script>

<style lang="scss">
</style>
