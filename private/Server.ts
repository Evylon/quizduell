import * as express from 'express'
import * as compression from 'compression'
import * as bodyParser from 'body-parser'

import * as _ from 'lodash'
import * as util from 'util'
import * as path from 'path'

import * as Logger from './logger'

class Server {

  private logger = Logger

  private enableGzip = true
  private port = 10000

  private app: express.Express

  public async start(): Promise<number> {
    const listenAsync = util.promisify(callback => (this.app.listen(this.port, callback)))
    await listenAsync()
    return this.port
  }

  constructor() {
    this.setupApp()
    this.setupRoutes()
  }

  private async setupApp(): Promise<void> {

    this.app = express()
    this.app.use(bodyParser.json())

    if (this.enableGzip) this.app.use(compression())

    await this.useWebpackMiddleware()
    this.app.use('/root/dist', express.static(path.join(__dirname, '..', 'dist')))
  }

  private async useWebpackMiddleware(): Promise<void> {
    // Only required in development
    // Importing at the top means the live container installs
    // the modules and copies the webpack config unnecessarily
    const webpack = await import('webpack')
    const webpackDevMiddleware = await import('webpack-dev-middleware')
    const webpackConfig = await import('../webpack.config.js')

    const middlewareOptions: any = {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }
    this.app.use(webpackDevMiddleware(webpack(webpackConfig), middlewareOptions))
  }

  private setupRoutes(): void {

    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
    })

    this.app.get('/health', (req, res) => {
      res.sendStatus(200)
    })
  }
}

export { Server }
