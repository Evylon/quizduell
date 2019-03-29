import * as express from 'express'
import * as _ from 'lodash'
import * as Timeout from 'await-timeout'

import * as logger from './logger'
import Question from '../shared/Question'

interface QuestionDefinition {
  text: string,
  answers: string[],
  correctAnswer: string,
  category: string,
}

interface QuestionResponses {
  [userid: string]: number
}

enum State {
  Waiting,
  RemoteQuestion,
  RemoteQuestionGracePeriod,
  LocalQuestion,
}

const QUESTION_TIME = 10 * 1000
const QUESTION_GRACE_TIME = 5 * 1000

class API {
  public router: express.Router
  private timer: Timeout

  private questions: QuestionDefinition[]

  private state: State
  private currentQuestionIndex: number
  private currentQuestionStartTimestamp: number
  private currentQuestionResponses: QuestionResponses

  constructor() {
    this.router = express.Router()
    this.timer = new Timeout()

    this.questions = require('./questions.json')

    this.state = State.Waiting

    this.setupRoutes()
  }

  private setupRoutes(): void {
    this.router.get('/remote/question', (req, res) => {
      if (this.state === State.RemoteQuestion) {
        res.status(200).send(this.createQuestion(this.currentQuestionIndex))
      } else {
        res.status(204).send()
      }
    })

    this.router.put('/remote/question/:index/answer/:userid', (req, res) => {
      const index = parseInt(req.params.index, 10)
      if ((this.state === State.RemoteQuestion || this.state === State.RemoteQuestionGracePeriod) && index === this.currentQuestionIndex) {
        if (this.currentQuestionResponses[req.params.userid] !== undefined) {
          res.status(409).send()
          return
        }
        this.currentQuestionResponses[req.params.userid] = req.body.answerIndex
        logger.info(this.currentQuestionResponses, 'Received response')
        res.status(200).send()
      } else {
        res.status(403).send()
      }
    })

    this.router.post('/admin/start', (req, res) => {
      this.startQuestion(0)
      res.status(200).send()
    })
  }

  private async startQuestion(index: number) {
    this.timer.clear()

    logger.info(`Starting question ${index} RemoteQuestion`)
    this.state = State.RemoteQuestion
    this.currentQuestionIndex = index
    this.currentQuestionStartTimestamp = (new Date()).getTime()
    this.currentQuestionResponses = {}
    await this.timer.set(QUESTION_TIME)

    logger.info(`Starting question ${index} RemoteQuestionGracePeriod`)
    this.state = State.RemoteQuestionGracePeriod
    await this.timer.set(QUESTION_GRACE_TIME)
    // TODO evaluate results

    logger.info(`Starting question ${index} LocalQuestion`)
    this.state = State.LocalQuestion
  }

  private createQuestion(index: number): Question {
    const elapsedTime = ((new Date()).getTime() - this.currentQuestionStartTimestamp)
    return {
      index,
      remainingTime: (QUESTION_TIME - elapsedTime) / 1000,
      ..._.omit(this.questions[index], 'correctAnswer')
    }
  }
}

export default API
