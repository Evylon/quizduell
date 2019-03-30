<template>
  <div id="quiz_container">

    <div id="area_question">
      <div id="text_category_container">
        <div id="area_category">
          <div id=text_category>{{ question.category }}</div>
        </div>
      </div>
      <div id="text_question_container">
        <span id="text_question">{{ question.text }}</span> 
      </div>
    </div>

    <div id="area_answers_complete">
      <div id="area_answers_1row" class="area_answers">
        <button class="button_answer"
          v-on:click="selectAnswer(0)"
          v-bind:class="{ selected: selectedAnswer == 0, correct: result.correctAnswerIndex == 0, wrong: result.correctAnswerIndex != 0 && result.localAnswerIndex == 0}"
          v-bind:style="{ '--progress': `${ result.remoteAnswerPercentages[0] ? result.remoteAnswerPercentages[0] : 0 }%` }"
        >{{ question.answers[0] }}</button>
        <button class="button_answer"
          v-on:click="selectAnswer(1)"
          v-bind:class="{ selected: selectedAnswer == 1, correct: result.correctAnswerIndex == 1, wrong: result.correctAnswerIndex != 1 && result.localAnswerIndex == 1 }"
          v-bind:style="{ '--progress': `${ result.remoteAnswerPercentages[1] ? result.remoteAnswerPercentages[1] : 0 }%` }"
        >{{ question.answers[1] }}</button>
      </div>
      <div id="area_answers_2row" class="area_answers">
        <button class="button_answer"
          v-on:click="selectAnswer(2)"
          v-bind:class="{ selected: selectedAnswer == 2, correct: result.correctAnswerIndex == 2, wrong: result.correctAnswerIndex != 2 && result.localAnswerIndex == 2 }"
          v-bind:style="{ '--progress': `${ result.remoteAnswerPercentages[2] ? result.remoteAnswerPercentages[2] : 0 }%` }"
        >{{ question.answers[2] }}</button>
        <button class="button_answer"
          v-on:click="selectAnswer(3)"
          v-bind:class="{ selected: selectedAnswer == 3, correct: result.correctAnswerIndex == 3, wrong: result.correctAnswerIndex != 3 && result.localAnswerIndex == 3 }"
          v-bind:style="{ '--progress': `${ result.remoteAnswerPercentages[3] ? result.remoteAnswerPercentages[3] : 0 }%` }"
        >{{ question.answers[3] }}</button>
      </div>
    </div>


    <div id="area_time" v-if="timed">
      <div id="time_box">
        <div id="time_progress"
          ref="progress"
          v-bind:class="{ started }"
          v-bind:style="{ transitionDuration: `${timeRemainingMilliseconds}ms`, width: `${timeRemainingPercent}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as Timeout from 'await-timeout'

import { QUESTION_TIME } from '../../../shared/constants'
import Question from '../../../shared/Question'
import Result from '../../../shared/Result'

export default {
  props: {
    question: {
      type: Object,
      note: 'Question'
    },
    timed: Boolean,
    result: {
      type: Object,
      note: 'Result'
    }
  },
  data() {
    return {
      selectedAnswer: undefined,
      timeRemainingMilliseconds: this.question.remainingTime,
      timeRemainingPercent: this.question.remainingTime / QUESTION_TIME * 100,
      started: false,
    }
  },
  async created() {
    this.message = `Frage ${this.question.index} gegen Gisi`
    if (this.timed) {
      // Doesn't work for some reason :(
      // this.maxTimerWidth = this.$refs.progress.clientWidth
      console.log(this.question.remainingTime)
      console.log(this.timeRemainingMilliseconds)
      console.log(this.timeRemainingPercent)
      await Timeout.set(100)
      this.timeRemainingPercent = 2
      await Timeout.set(this.timeRemainingMilliseconds)
      this.selectNoAnswer()
    }
  },
  methods: {
    selectAnswer(index: number) {
      this.selectedAnswer = index
      // const currentTimerWidth = this.$refs.timeprogress.clientWidth
      // this.timeRemainingPercent = (currentTimerWidth / this.maxTimerWidth).toFixed(0)
      this.$emit('answer-selected', index)
    },
    selectNoAnswer() {
      this.$emit('no-answer-selected')
    }
  }
}
</script>

<style lang="scss">

body {
  background-image: url('../../assets/background.svg');
  background-size: cover;
  background-position: bottom center;
}

#quiz_container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
}

.box_roundIndicator {
  background-color: #BEBEBD;
  width: 30px;
  height: 10px;
  border-radius: 4px;
  padding: 10px;
  margin: 2px;
}

#text_roundIndicator {
  margin-left: 20px;
  color: #ffffff;
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;   
}

#area_question {

  display: flex;
  flex-direction: column;
  
  border-radius: 4px;
  margin-left: 5px;
  margin-right: 5px;
  height: 200px;
  font-size:18px;

  border:0px solid #d7dada;
  border-radius: 4px;
  background-image: linear-gradient(to bottom, #f4f5f5, #dfdddd);
}

#text_category_container {
  display: flex;
  align-items: center;
  justify-content: center; 
}

#area_category {
  display: inline-block; 
  padding: 10px;
  border-radius: 0 0 8px 8px;
  box-shadow: 1px 1px 2px  #7d7e7d;
  background-image: linear-gradient(to bottom, #DA579D, #BF0063);
}

#text_category {
  font-size: 18px;
  font-weight: 600;
  color: #FFFFFF;
}

#text_question_container {
  color: #575657;
  font-size: 16px;
  flex-grow: 3; 
  display: flex;
  align-items: center;
  justify-content: center;
}

#text_question {
  font-size: 18px;
}

#area_answers_complete {
  margin-top: 10px;
  margin-bottom: 10px;
}

.area_answers {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.button_answer {
  position: relative;
  width: 50%;
  height: 150px;
  margin: 5px 5px 5px 5px;
  border: 0px solid #616261;
  border-radius: 4px;
  font-size: 18px;
  padding: 10px;
  text-decoration: none;
  display: inline-block;
  text-shadow: -1px -1px 0 rgba(0,0,0,0.3);
  color: #FFFFFF;
  background-image: linear-gradient(to bottom, #7d7e7d, #181D26);
  overflow:hidden;
} 
.button_answer::after {
  content:'';
  position: absolute;
  top:0;
  left:0;
  bottom:0;
  width: var(--progress);
  background:rgba(0, 0, 0, .3);
  transition: width 1s;
}

.button_answer:focus, .button_answer:hover {
  outline: none;
}

.button_answer.selected,
.button_answer.selected:hover {
  animation: blink-animation 600ms 4 both;
}

@keyframes blink-animation {
  0%, 50%, 100% {
      background-image: linear-gradient(to bottom, #1094ce, #0e7eb2);
  }
  51%, 99% {
    background-image: linear-gradient(to bottom, #7d7e7d, #181D26);
  }
}

.button_answer:hover {
  border: 0px solid #4a4b4a;
  background-image: linear-gradient(to bottom, #646464, #040507);
}

.button_answer.correct {
  background-image: linear-gradient(to bottom, green, green);
}

.button_answer.wrong {
  background-image: linear-gradient(to bottom, red, red);
}



#time_box {
  border-radius: 4px;
  background-color: rgba(46,46,46,0.3);
  height: 50px;
  margin: 5px;
  padding: 5px;
}

#time_progress {
  border-radius: 4px;
  background-color: #81ff3e;
  height: 100%;
  width: 100%;
  transition: width linear;
}

</style>
