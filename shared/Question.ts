interface Question {
  index: number,
  text: string,
  answers: string[],
  category: string,
  remainingTime: number // seconds
}

export default Question
