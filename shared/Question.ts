interface Question {
  index: number,
  text: string,
  answers: string[],
  category: string,
  remainingTime?: number // milliseconds
}

export default Question
