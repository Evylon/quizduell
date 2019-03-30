<template>
  <div id="quiz_container">

    <div id="area_question"
      v-on:click="next"
    >
      <div id="text_category_container">
        <div id="area_category">
          <div id=text_category>{{ question.category }}</div>
        </div>
      </div>
      <div id="text_question_container">
        <span id="text_question">{{ question.text }}</span> 
      </div>
    </div>

    <div id="area_answers_complete" v-bind:class="{ hasResults: !!result}">
      <div id="area_answers_1row" class="area_answers">
        <button class="button_answer"
          v-on:click="selectAnswer(0)" v-bind:class="createClasses(0)"
          v-bind:style="{ '--percentage': `${ result ? result.remoteAnswerPercentages[0] : 0 }%` }"
        >
          {{ question.answers[0] }}
          <div class="precentage_bubble">{{ (result ? result.remoteAnswerPercentages[0] : 0) + '%' }}</div>
        </button>
        <button class="button_answer"
          v-on:click="selectAnswer(1)" v-bind:class="createClasses(1)"
          v-bind:style="{ '--percentage': `${ result ? result.remoteAnswerPercentages[1] : 0 }%` }"
        >
          {{ question.answers[1] }}
          <div class="precentage_bubble">{{ (result ? result.remoteAnswerPercentages[1] : 0) + '%' }}</div>
        </button>
      </div>
      <div id="area_answers_2row" class="area_answers">
        <button class="button_answer"
          v-on:click="selectAnswer(2)" v-bind:class="createClasses(2)"
          v-bind:style="{ '--percentage': `${ result ? result.remoteAnswerPercentages[2] : 0 }%` }"
        >
          {{ question.answers[2] }}
          <div class="precentage_bubble">{{ (result ? result.remoteAnswerPercentages[2] : 0) + '%' }}</div>
        </button>
        <button class="button_answer"
          v-on:click="selectAnswer(3)" v-bind:class="createClasses(3)"
          v-bind:style="{ '--percentage': `${ result ? result.remoteAnswerPercentages[3] : 0 }%` }"
        >
          {{ question.answers[3] }}
          <div class="precentage_bubble">{{ (result ? result.remoteAnswerPercentages[3] : 0) + '%' }}</div>
        </button>
      </div>
    </div>


    <div id="area_time" v-if="timed">
      <div id="time_box">
        <div id="time_progress"
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
      this.$emit('answer-selected', index)
    },
    selectNoAnswer() {
      this.$emit('no-answer-selected')
    },
    next() {
      this.$emit('question-close')
    },
    createClasses(index) {
      return { 
        selected: this.selectedAnswer == index, 
        correct: this.result && this.result.correctAnswerIndex == index, 
        wrong: this.result && this.result.correctAnswerIndex != index && this.result.localAnswerIndex == index,
        remoteCorrect: this.result && this.result.remoteAnswerIndex == index,
      }
    }
  }
}
</script>

<style lang="scss">

#quiz_container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
}

#area_question {
  display: flex;
  flex-direction: column;
  
  margin-left: 5px;
  margin-right: 5px;
  height: 30vh;
  font-size: 18px;

  border: none;
  border-radius: 8px;
  background-image: linear-gradient(150deg, #f5f5f5, #c8c8c8);
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
  box-shadow: inset 0px -1.5px 0px rgba(0, 0, 0, 0.2);
  background-image: radial-gradient(#ff74ba, #db609d);
}

#text_category {
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
  text-shadow: 0px 1px 0px rgba(0,0,0,0.1);
}

#text_question_container {
  flex-grow: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px 25px;
}

#text_question {
  color: #626262;
  text-shadow: 0px 1px 0px rgba(255,255,255,0.4);
  font-size: 20px;
  font-weight: 400;
  text-align: center;
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
  height: 25vh;
  margin: 5px;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  padding: 10px 20px;
  text-decoration: none;
  display: inline-block;
  color: #FFFFFF;
  text-shadow: 0px 1px 0 rgba(0,0,0,0.8);
  background-image: linear-gradient(to bottom, #434343, #2b2b2b);
  box-shadow: inset 0px -1.5px 0px rgba(0,0,0,.4), inset 0px 1.5px 0px rgba(255,255,255,.2);
}

.button_answer:hover {
  border: none;
  cursor: pointer;
}

.button_answer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--percentage);
  background: rgba(0, 0, 0, .2);
  border-radius: 4px;
  transition: width 1s;
}

.button_answer:focus,
.button_answer:hover {
  outline: none;
}

.button_answer.selected,
.button_answer.selected:hover {
  animation: blink-animation 600ms 4 both;
}

.button_answer.correct {
  background-image: linear-gradient(to bottom, #78cd1b, #65ae17);
}

.button_answer.selected.correct {
  animation: blink-animation-green 600ms 4;
}

.button_answer.wrong {
  background-image: linear-gradient(to bottom, #df203e, #b92929);
}

.button_answer.selected.wrong {
  animation: blink-animation-red 600ms 4;
}

@keyframes blink-animation {
  0%, 50%, 100% {
      background-image: linear-gradient(to bottom, #1094ce, #0e7eb2);
  }
  51%, 99% {
    background-image: linear-gradient(to bottom, #434343, #2b2b2b);
  }
}

@keyframes blink-animation-green {
  0%, 50%, 100% {
      background-image: linear-gradient(to bottom, #1094ce, #0e7eb2);
  }
  51%, 99% {
    background-image: linear-gradient(to bottom, #78cd1b, #65ae17);
  }
}

@keyframes blink-animation-red {
  0%, 50%, 100% {
      background-image: linear-gradient(to bottom, #1094ce, #0e7eb2);
  }
  51%, 99% {
    background-image: linear-gradient(to bottom, #df203e, #b92929);
  }
}

.precentage_bubble { 
  --arrow-size: .6em;
  --height: 2.5em;
  --width: 3.5em;
  --pad-left: .1em;
  font-size: 12px; 
  position:absolute;
  top: 0;
  left: 0%;
	background: #ffffff;
	border-radius: 4px;
  padding: 0 .1em;
  padding-left: var(--pad-left);
  height: var(--height);
  line-height: var(--height);
  width: var(--width);
  margin-top: calc(-1 * (var(--height) + var(--arrow-size)));
  margin-left: calc(-1 * (var(--width) + var(--pad-left)) / 2);
  color: black;
  text-shadow: none;
  transition: left 1s;
  transform-origin: 50% calc(100% + var(--arrow-size));
  transition-property: left, transform, opacity;

  transform: scale(0);
  opacity: 0;
}

.precentage_bubble:after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	height: 0;
	border: var(--arrow-size) solid transparent;
	border-top-color: #ffffff;
	border-bottom: 0;
	margin-left: calc(-1 * var(--arrow-size));
	margin-bottom: calc(-1 * var(--arrow-size));
}

.remoteCorrect .precentage_bubble {
  font-size: 16px; 
  z-index: 10;
  --pad-left: 2.5em;
  background-image: url('../../assets/avatar_family.png');
  background-size: var(--height);
  background-repeat: no-repeat;
  background-position: .3em center;
}

.hasResults .precentage_bubble {
  left: var(--percentage);
  transform: scale(1);
  opacity: 1;
}

#time_box {
  border-radius: 6px;
  background-color: rgba(46,46,46,0.3);
  height: 5vh;
  margin: 5px;
  padding: 5px;
}

#time_progress {
  border-radius: 6px;
  background-color: #82ff3e;
  height: 100%;
  width: 100%;
  transition: width linear;
}

</style>
