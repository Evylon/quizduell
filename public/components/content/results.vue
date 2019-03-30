<template>
  <div id="results_container" 
    v-on:click="next"
  >

    <div id="container_grid">
      <div id="header" class="font_shadow">{{ brand }}</div>

      <div id="container_result_overall"> 
        <img id="avatar_1" src="../../assets/avatar_gisi.png" />
        <div id="score_overall" class="font_shadow">{{ localScore }} - {{ remoteScore }}</div>
        <img id="avatar_2" src="../../assets/avatar_family.png" />
        <div id=avatar_name_1 class="avatar_name_styling font_shadow">{{ localName }}</div> 
        <div id=avatar_name_2 class="avatar_name_styling font_shadow">{{ remoteName }}</div> 
      </div>

      <div v-for="round in rounds" class="round_grid">
        <div class="round_number font_shadow">
          <div>{{ roundTitle }} {{ round.index }}</div>
        </div>
        <div class="round_result">
          <div class="round_result_avatar_1 round_result_avatar">
            <div class="question_result"
              v-bind:class="{
                correct: round.results[0].localCorrect === true,
                wrong: round.results[0].localCorrect === false
              }"
            ></div>
            <div class="question_result"
              v-bind:class="{
                correct: round.results[1].localCorrect === true,
                wrong: round.results[1].localCorrect === false
              }"
            ></div>
            <div class="question_result"
              v-bind:class="{
                correct: round.results[2].localCorrect === true,
                wrong: round.results[2].localCorrect === false
              }"
            ></div>
          </div>
        
          <div class="topic">{{ gameTitle }}</div>

          <div class="round_result_avatar_2 round_result_avatar">
            <div class="question_result"
              v-bind:class="{
                correct: round.results[0].remoteCorrect === true,
                wrong: round.results[0].remoteCorrect === false
              }"
            ></div>
            <div class="question_result"
              v-bind:class="{
                correct: round.results[1].remoteCorrect === true,
                wrong: round.results[1].remoteCorrect === false
              }"
            ></div>
            <div class="question_result"
              v-bind:class="{
                correct: round.results[2].remoteCorrect === true,
                wrong: round.results[2].remoteCorrect === false
              }"
            ></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import * as Timeout from 'await-timeout'
import * as _ from 'lodash'

import Result from '../../../shared/Result'

interface Round {
  index: number,
  results: Result[]
}

export default {
  props: {
    results: {
      type: Array,
      note: 'Results'
    }
  },
  data() {
    return {
      brand: 'Quizduell',
      gameTitle: 'Oma & Opa vs. Family',
      roundTitle: 'Runde',
      localName: 'Oma & Opa',
      remoteName: 'Family'
    }
  },
  computed: {
    localScore: function(): number {
      return _.filter(this.results, result => result.localCorrect === true).length
    },
    remoteScore: function(): number {
      return _.filter(this.results, result => result.remoteCorrect === true).length
    },
    rounds: function(): Round[] {
      const rounds: Round[] = []
      let roundIndex = 0
      for (let i = 2; i < this.results.length; i += 3) {
        const round: Round = {
          index: roundIndex,
          results: [
            this.results[i - 2],
            this.results[i - 1],
            this.results[i]
          ]
        }
        rounds.push(round)
        roundIndex += 1
      }
      console.log(rounds)
      return rounds
    }
  },
  methods: {
    next() {
      this.$emit('results-close')
    }
  }
}
</script>

<style lang="scss">

.font_shadow {
  text-shadow: 0.04em 0.04em #0f678f; 
}

#container_grid {
  display: grid;
  grid-template-rows: 1 1 1 1 1 1 1 1;
  grid-template-columns: 1 ; 
  grid-row-gap: 30px;
  grid-template-areas:  
    "header" 
    "result_overall" 
    "round_1" 
    "round_2" 
    "round_3"
    "round_4" 
    "round_5" 
    "round_6";
}

#header {
  grid-area: header;
  text-align: center;
  font-size: 30pt;
  margin-top: 15px;
  margin-bottom: 15px;
  font-weight: 700;
}

#container_result_overall {
  grid-area: result_overall;
  max-width: 100%;
  display: grid;
  grid-template-rows: 1 1;
  grid-template-columns: 37% 26% 37% ; 
  grid-template-areas:
    "column_1 column_2 column_3"
    "avatar_name_1 . avatar_name_2";
  align-items: center;
  justify-items: center;
  margin-bottom: 16px;
  margin-left: 40px;
  margin-right: 40px;
  font-weight: 700;
}

#container_round_1 {
  grid-area: round_1;
}

#container_round_2 {
  grid-area: round_2;
}

#container_round_3 {
  grid-area: round_3;
}

#container_round_4 {
  grid-area: round_4;
}

#container_round_5 {
  grid-area: round_5;
}

#container_round_6 {
  grid-area: round_6;
}


/* Child elements from container_result_overall */

#avatar_1 {
  grid-area: column_1;
  width: 80px;
  height: 68px;
}

#score_overall {
  grid-area: column_2;
  font-size: 36pt;
  text-align: center;
}

#avatar_2 {
  grid-area: column_3;
  width: 80px;
  height: 68px;
  
}

#avatar_name_1 {
  grid-area: avatar_name_1;
  text-align: center;
   
}

#avatar_name_2 {
  grid-area: avatar_name_2;
  text-align: center;
}

.avatar_name_styling {
  margin-top: 10px;
  font-size: 22pt;
}

/* Grid definition for each round result */

.round_grid {
  display: grid;
  grid-template-rows: 1  1;
  grid-template-columns: 1  ; 
  grid-template-areas:
    "round_name"
    "round_result"; 
}

.round_number {
  grid-area: round_name;
  justify-self: self-center;
  align-self: end;
  text-align: center;
  text-transform: uppercase;
}

.round_number>div {
  margin-bottom: 10px;
}

.round_result {
  grid-area: round_result;
  align-self: start;
  justify-self: center;
}

.topic {
  text-align: center;
  margin-left:10px;
  margin-right:10px;
  font-size: 11pt;
}

/* Styledefinition question result rectangle */

.question_result {
  background-color: #BEBEBD;
  width: 30px;
  height: 10px;
  border-radius: 4px;
  padding: 10px;
  margin: 2px; 
}

.round_result_avatar {
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  border-radius: 4px;
} 

.round_result {
  background-color:#0f678f;
  border-radius: 8px; 
  grid-area: round_result;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2px 2px 2px 2px;
  margin-left: 10px;
  margin-right:10px;
}

.correct {
  background: linear-gradient(0deg, rgba(129,255,63,1) 0%, rgba(150,255,95,1) 100%);
  box-shadow: inset 0px -1.5px 0px rgba(0,0,0,.4), inset 0px 1.5px 0px rgba(255,255,255,.2);
}

.wrong {
  background: linear-gradient(4deg, rgba(255,51,24,1) 0%, rgba(255,88,65,1) 100%);
  box-shadow: inset 0px -1.5px 0px rgba(0,0,0,.4), inset 0px 1.5px 0px rgba(255,255,255,.2);
}
</style>
