<template>
  <div id="family-container">
    <component
      v-bind:is="currentStateComponent"
      v-bind:question="currentQuestion"
      v-on:answer-selected="answerSelected"
    ></component>
    <button v-on:click="start">Start</button>
    <button v-on:click="fetchQuestion">Fetch question</button>
  </div>
</template>

<script lang="ts">
import * as Timeout from 'await-timeout'

import waitVue from './wait.vue'
import questionVue from './question.vue'
import Question from '../../../shared/Question'

const sampleQuestion: Question = {
  index: 1,
  text: 'Hallo',
  answers: [
    'Melli',
    'Melanie',
    'Hasi',
    'M.A.'
  ],
  category: 'Medien & Unterhaltung',
  remainingTime: 10
}

export default {
  data() {
    return {
      currentState: 'wait',
      currentQuestion: undefined
    }
  },
  components: {
    waitVue,
    questionVue
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
    async start(): Promise<void> {
      await fetch('http://localhost:10000/api/admin/start', {
        method: 'POST'
      })
    },
    async fetchQuestion(): Promise<void> {
      while(true) {
        const response = await fetch('http://localhost:10000/api/remote/question')
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
      const userId = '1234567890' // TODO
      const questionIndex = this.currentQuestion.index
      const reponse = await fetch(`http://localhost:10000/api/remote/question/${questionIndex}/answer/${userId}`, {
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
