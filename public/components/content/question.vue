<template>
  <div id="quiz_container">
    <div id="area_status">
      <div class="box_roundIndicator"></div>
      <div class="box_roundIndicator"></div>
      <div class="box_roundIndicator"></div>
      <div id="text_roundIndicator">{{ message }}</div>
    </div>

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
        <button class="button_answer" v-on:click="selectAnswer(0)">{{ question.answers[0] }}</button>
        <button class="button_answer" v-on:click="selectAnswer(1)">{{ question.answers[1] }}</button>
      </div>
      <div id="area_answers_2row" class="area_answers">
        <button class="button_answer" v-on:click="selectAnswer(2)">{{ question.answers[2] }}</button>
        <button class="button_answer" v-on:click="selectAnswer(3)">{{ question.answers[3] }}</button>
      </div>
    </div>

    <div id="area_time">
      <div id="time_progress"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Question from '../../../shared/Question'

export default {
  props: {
    question: {
      type: Object,
      note: 'Question'
    }
  },
  created() {
    this.message = `Runde ${this.question.index} gegen Gisi`
  },
  methods: {
    selectAnswer(index: number) {
      // Pass to parent component
      this.$emit('answer-selected', index)
    }
  }
}
</script>

<style lang="scss">

#quiz_container {
  max-width: 700px;
  margin: 0 auto;
}

#area_status {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px;
  align-items: center;
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
  margin-bottom: 50px;
}

.area_answers {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.button_answer {
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
}   

.button_answer:hover {
  border: 0px solid #4a4b4a;
  background-image: linear-gradient(to bottom, #646464, #040507);
}

#area_time {
  border-radius: 4px;
  background-color: #3A99C5;
  height: 50px;
}

</style>
