import Result from '../../shared/Result'

const resultsMock: Result[] = [{
    question: {
    index: 0,
    text: 'Frage 0',
    answers: ['Antwort 0.0', 'Antwort 0.1', 'Antwort 0.2', 'Antwort 0.3'],
    category: 'Category 0',
    remainingTime: null
  },
  correctAnswerIndex: 0,
  localAnswerIndex: 2,
  remoteAnswerPercentages: [50, 20, 20, 20],
  localCorrect: false,
  remoteCorrect: true,
},{
    question: {
    index: 1,
    text: 'Frage 1',
    answers: ['Antwort 1.0', 'Antwort 1.1', 'Antwort 1.2', 'Antwort 1.3'],
    category: 'Category 1',
    remainingTime: null
  },
  correctAnswerIndex: 0,
  localAnswerIndex: 0,
  remoteAnswerPercentages: [50, 20, 20, 20],
  localCorrect: false,
  remoteCorrect: true,
},{
    question: {
    index: 2,
    text: 'Frage 2',
    answers: ['Antwort 2.0', 'Antwort 2.1', 'Antwort 2.2', 'Antwort 2.3'],
    category: 'Category 2',
    remainingTime: null
  },
  correctAnswerIndex: 0,
  localAnswerIndex: 0,
  remoteAnswerPercentages: [50, 20, 20, 20],
  localCorrect: true,
  remoteCorrect: false,
},{
    question: {
    index: 3,
    text: 'Frage 3',
    answers: ['Antwort 3.0', 'Antwort 3.1', 'Antwort 3.2', 'Antwort 3.3'],
    category: 'Category 3',
    remainingTime: null
  },
  correctAnswerIndex: 0,
  localAnswerIndex: 0,
  remoteAnswerPercentages: [50, 20, 20, 20],
  localCorrect: true,
  remoteCorrect: true,
},{
    question: {
    index: 4,
    text: 'Frage 4',
    answers: ['Antwort 4.0', 'Antwort 4.1', 'Antwort 4.2', 'Antwort 4.3'],
    category: 'Category 4',
    remainingTime: null
  },
  correctAnswerIndex: 0,
  localAnswerIndex: 0,
  remoteAnswerPercentages: [50, 20, 20, 20],
  localCorrect: true,
  remoteCorrect: true,
},{
    question: {
    index: 0,
    text: 'Frage 5',
    answers: ['Antwort 5.0', 'Antwort 5.1', 'Antwort 5.2', 'Antwort 5.3'],
    category: 'Category 5',
    remainingTime: null
  },
  correctAnswerIndex: 0,
  localAnswerIndex: 0,
  remoteAnswerPercentages: [50, 20, 20, 20],
  localCorrect: true,
  remoteCorrect: true,
}]

export { resultsMock }
