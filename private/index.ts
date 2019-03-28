import * as logger from './logger'
import { Server } from './Server'

const server = new Server()

logger.info('Starting server...')
server.start()
  .then(port => logger.info({ port }, 'Listening'))
  .catch(error => logger.error({ error }, 'An unexpected error occured!'))
