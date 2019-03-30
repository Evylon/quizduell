import Question from './Question'

interface Result {
  question: Question,
  correctAnswerIndex: number,
  localAnswerIndex: number,
  remoteAnswerPercentages: {
    [index: number]: number
  },
  localCorrect: boolean,
  remoteCorrect: boolean,
}

type Results = Result[]
