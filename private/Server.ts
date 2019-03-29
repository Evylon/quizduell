import * as express from 'express'
import * as compression from 'compression'
import * as bodyParser from 'body-parser'

import * as _ from 'lodash'
import * as util from 'util'
import * as path from 'path'

import * as webpack from 'webpack'
import * as WebpackDevMiddleware from 'webpack-dev-middleware'
import * as webpackConfig from '../webpack.config.js'

class Server {

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

    const middlewareOptions: WebpackDevMiddleware.Options = {
      logLevel: 'info',
      publicPath: path.resolve(__dirname, '..', 'dist')
    }
    const webpackCompiler = webpack(webpackConfig)
    const middleware = WebpackDevMiddleware(webpackCompiler, middlewareOptions)
    this.app.use(middleware)
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
