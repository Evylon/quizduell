<template>
  <div id="quiz_container">
    <div id="area_status">
      <div class="box_roundIndicator"></div>
      <div class="box_roundIndicator"></div>
      <div class="box_roundIndicator"></div>
      <div id="text_roundIndicator">{{ message }}</div>
    </div>

    <div id="area_question" class="X">
      <div id="text_category_container">
        <div id="area_category">
          <div id=text_category>{{category}}</div>
        </div>
      </div>
      <div id="text_question_container">
        <span id="text_question" >{{question}}</span> 
      </div>
    </div>

    <div id="area_answers_complete">
      <div id=area_answers_1row class="area_answers">
        <button class="button_answer">{{answer1}}</button>
        <button class="button_answer">{{answer2}}</button>
      </div>
      <div id=area_answers_2row class="area_answers">
        <button class="button_answer">{{answer3}}</button>
        <button class="button_answer">{{answer4}}</button>
      </div>
    </div>

    <div id="area_time">
      <div class="X"></div>
    </div>
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
      message: 'Runde 1 gegen Gisi',
      category: 'Medien & Unterhaltung',
      question: 'Wer ist die tollste Freundin der Welt?',
      answer1: 'Melli',
      answer2: 'Melanie',
      answer3: 'Hasi',
      answer4: 'M.A.'
    }
  },
  created() {
    this.message = 'Runde 1 gegen Gisi'
  }
}
</script>

<style lang="scss">

body {
  background-color: #3A99C5;
  margin: 0px 0px 0px 0px;
}

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
  font-family:arial, helvetica, sans-serif; 

  border:0px solid #d7dada; 
  -webkit-border-radius: 4px; 
  -moz-border-radius: 4px;
  border-radius: 4px;
  background-color: #f4f5f5; 
  background-image: -webkit-gradient(linear, left top, left bottom, from(#f4f5f5), to(#dfdddd));
  background-image: -webkit-linear-gradient(top, #f4f5f5, #dfdddd);
  background-image: -moz-linear-gradient(top, #f4f5f5, #dfdddd);
  background-image: -ms-linear-gradient(top, #f4f5f5, #dfdddd);
  background-image: -o-linear-gradient(top, #f4f5f5, #dfdddd);
  background-image: linear-gradient(to bottom, #f4f5f5, #dfdddd);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#f4f5f5, endColorstr=#dfdddd);
}

#text_category_container {
  display: flex;
  align-items: center;
  justify-content: center; 
}

#area_category {
  display:inline-block; 
  padding: 10px 10px 10px 10px;
  border-radius: 0 0 8px 8px;
  box-shadow: 1px 1px 2px  #7d7e7d;
  background-color: #DA579D; background-image: -webkit-gradient(linear, left top, left bottom, from(#DA579D), to(#BF0063));
  background-image: -webkit-linear-gradient(top, #DA579D, #BF0063);
  background-image: -moz-linear-gradient(top, #DA579D, #BF0063);
  background-image: -ms-linear-gradient(top, #DA579D, #BF0063);
  background-image: -o-linear-gradient(top, #DA579D, #BF0063);
  background-image: linear-gradient(to bottom, #DA579D, #BF0063);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#DA579D, endColorstr=#BF0063);
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
  border:0px solid #616261; -webkit-border-radius: 4px; -moz-border-radius: 4px;border-radius: 4px;font-size:18px;font-family:arial, helvetica, sans-serif; padding: 10px 10px 10px 10px; text-decoration:none; display:inline-block;text-shadow: -1px -1px 0 rgba(0,0,0,0.3); color: #FFFFFF;
  background-color: #7d7e7d;
  background-image: -webkit-gradient(linear, left top, left bottom, from(#7d7e7d), to(#181D26));
  background-image: -webkit-linear-gradient(top, #7d7e7d, #181D26);
  background-image: -moz-linear-gradient(top, #7d7e7d, #181D26);
  background-image: -ms-linear-gradient(top, #7d7e7d, #181D26);
  background-image: -o-linear-gradient(top, #7d7e7d, #181D26);
  background-image: linear-gradient(to bottom, #7d7e7d, #181D26);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#7d7e7d, endColorstr=#181D26);
}   
        
.button_answer:hover{
  border:0px solid #4a4b4a;
  background-color: #646464; background-image: -webkit-gradient(linear, left top, left bottom, from(#646464), to(#040507));
  background-image: -webkit-linear-gradient(top, #646464, #040507);
  background-image: -moz-linear-gradient(top, #646464, #040507);
}

#area_time {
  border-radius: 4px;
  background-color: #3A99C5;
  height: 50px;
}

</style>
