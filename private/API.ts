import * as express from 'express'

interface Questions {
  questionText: string,
  answers: string[]
}

enum State {
  Waiting,
  RemoteQuestion,
  RemoteQuestionGracePeriod,
  LocalQuestion,
}

class API {
  public router: express.Router

  private state: State
  private questions: Questions[]
  private currentQuestionIndex:  number

  constructor() {
    this.router = express.Router()

    this.state = State.Waiting
    this.questions = require('./questions.json')
    this.currentQuestionIndex = 0

    this.setupRoutes()
  }

  private setupRoutes(): void {
    this.router.get('/remote/question', (req, res) => {
      if (this.state === State.RemoteQuestion) {
        const question = {
          id: this.currentQuestionIndex,
          ...this.questions[this.currentQuestionIndex]
        }
        res.status(200).send(question)
      } else {
        res.status(204).send()
      }
    })

    this.router.post('/admin/start', (req, res) => {
      this.state = State.RemoteQuestion
      res.status(200).send()
    })
  }

  private startQuestion(index: number) {
    this.currentQuestionIndex = index
  }
}

export default API
