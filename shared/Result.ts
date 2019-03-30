import Question from './Question'

interface Result {
  question: Question,
  correctAnswerIndex: number,
  localAnswerIndex: number,
  remoteAnswerIndex: number,
  remoteAnswerPercentages: number[],
  localCorrect: boolean,
  remoteCorrect: boolean,
}

export default Result
